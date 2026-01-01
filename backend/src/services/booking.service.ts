import {
  Booking,
  BookingStatus,
  DurationType,
  Payment,
  PaymentMethodType,
  PaymentStatus,
  Provider
} from "@prisma/client";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  PrismaUniqueError
} from "../lib/error";
import { addDays, addHours, addMinutes } from "../lib/utils";
import { prisma } from "../lib/prisma";
import { BookingResponse, CallbackNotificationRequest, CreateBookingRequest, PaymentResponse } from "../types/booking.type";
import { FaspayClient } from "../faspay/faspay.client";

export const PAYMENT_TO_BOOKING_STATUS_MAP: Record<PaymentStatus, BookingStatus> = {
  [PaymentStatus.SUCCESS]: BookingStatus.RESERVED,
  [PaymentStatus.PENDING]: BookingStatus.HOLD,
  [PaymentStatus.REFUNDED]: BookingStatus.FAILED,
  [PaymentStatus.CANCELLED]: BookingStatus.CANCELLED,
  [PaymentStatus.FAILED]: BookingStatus.FAILED,
  [PaymentStatus.EXPIRED]: BookingStatus.EXPIRED,
};

export class BookingService {
  private readonly holdBookingTimeInMinutes: number = 15;

  constructor(private readonly faspayClient: FaspayClient) {}

  getBookingById = async (bookingId: string): Promise<BookingResponse> => {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
      });

      if (!booking) {
        throw new NotFoundError(`Booking with ID ${bookingId} not found.`);
      }
      return this.mapBookingDataToBookingResponse(booking);
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  getBookingsByUserId = async (userId: number): Promise<BookingResponse[]> => {
    try {
      const bookings = await prisma.booking.findMany({
        where: { userId: userId },
        orderBy: { startAt: "desc" },
      });
      return bookings.map(this.mapBookingDataToBookingResponse);
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  getHoldBookingsByUserId = async (userId: number): Promise<BookingResponse[]> => {
    try {
      const bookings = await prisma.booking.findMany({
        where: { userId: userId, status: BookingStatus.HOLD },
        orderBy: { startAt: "desc" },
      });
      return bookings.map(this.mapBookingDataToBookingResponse);
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }

  getPaymentById = async (paymentId: string): Promise<PaymentResponse> => {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
      });

      if (!payment) {
        throw new NotFoundError(`Payment with ID ${paymentId} not found.`);
      }
      return this.mapPaymentDataToPaymentResponse(payment);
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  }

  getActivePaymentByBookingId = async (bookingId: string): Promise<PaymentResponse> => {
    try {
      const payment = await prisma.payment.findFirst({
        where: { bookingId: bookingId, status: PaymentStatus.PENDING },
      });
      
      if (!payment) {
        throw new NotFoundError(`Active payment with booking ID ${bookingId} not found.`);
      }
      return this.mapPaymentDataToPaymentResponse(payment);
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }

  private calculateValues = (
    mainValuePerUnit: number,
    othersValuePerUnit: number,
    voucherPercentage: number,
    quantity: number
  ) => {
    const mainValue = mainValuePerUnit * quantity;
    const othersValue = othersValuePerUnit * quantity;
    const discount = mainValue * voucherPercentage;
    const totalValue = mainValue + othersValue - discount;

    return {
      mainValue,
      othersValue,
      discount,
      totalValue,
    }
  }

  createBooking = async (data: CreateBookingRequest): Promise<BookingResponse> => {
    try {
      const {
        userId,
        accountId,
        baseDurationUnit,
        baseDurationType,
        mainValuePerUnit,
        othersValuePerUnit,
        quantity,
        voucherCode,
        startAt,
      } = data;

      // TODO: instead of passing baseDurationUnit, baseDurationType, mainValuePerUnit, and othersValuePerUnit, need to only pass price tier ID and get the corresponding data from table price tier
      //    - If not found, throw error
      //    - If found, get baseDurationUnit, baseDurationType, mainValuePerUnit, and othersValuePerUnit here

      // TODO: Get voucher
      //    - If invalid, throw error
      //    - If valid calculate, get voucher percentage
      const voucherPercentage = voucherCode ? 100 : 0;

      const bookingPriceValues = this.calculateValues(
        mainValuePerUnit,
        othersValuePerUnit ?? 0,
        voucherPercentage,
        quantity,
      );

      const immediate = !startAt;

      const now = new Date();
      const bookingExpiredAt = addMinutes(now, this.holdBookingTimeInMinutes);
      const bookingStartAt = immediate ? bookingExpiredAt : startAt;

      let bookingEndAt: Date;
      switch (baseDurationType) {
        case DurationType.HOURLY:
          bookingEndAt = addHours(bookingStartAt, baseDurationUnit * quantity);
          break;
        case DurationType.DAILY:
          bookingEndAt = addDays(bookingStartAt, baseDurationUnit * quantity);
          break;
        default:
          throw new BadRequestError(`Unsupported duration type: ${baseDurationType}`);
      }

      const booking = await prisma.$transaction(async (tx) => {
        // Prevent race condition
        await tx.$executeRaw`SELECT id FROM "Account" WHERE id = ${accountId} FOR UPDATE`;

        const overlapping = await tx.booking.findFirst({
          where: {
            accountId,
            AND: [
              { status: { in: [BookingStatus.HOLD, BookingStatus.RESERVED] } },
              { startAt: { lt: bookingEndAt } },
              { endAt: { gt: bookingStartAt } }
            ]
          }
        });

        if (overlapping) {
          throw new PrismaUniqueError(
            "Account not available for the requested time."
          );
        }

        return await tx.booking.create({
          data: {
            userId,
            accountId,
            status: BookingStatus.HOLD,
            baseDurationUnit,
            baseDurationType,
            quantity,
            immediate,
            startAt: bookingStartAt,
            endAt: bookingEndAt,
            expiredAt: bookingExpiredAt,
            mainValuePerUnit,
            othersValuePerUnit,
            voucherCode,
            voucherPercentage,
            mainValue: bookingPriceValues.mainValue,
            othersValue: bookingPriceValues.othersValue,
            discount: bookingPriceValues.discount,
            totalValue: bookingPriceValues.totalValue,
            version: 1
          }
        });
      });

      return this.mapBookingDataToBookingResponse(booking);
    } catch (error) {
      if (error instanceof PrismaUniqueError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  payBooking = async (
    bookingId: string,
    provider: Provider,
    paymentMethod: PaymentMethodType
  ): Promise<PaymentResponse> => {
    try {
      if (provider !== Provider.FASPAY) throw new BadRequestError("Invalid provider provided.");
      if (paymentMethod !== PaymentMethodType.QRIS) throw new BadRequestError("Invalid paymentMethod provided.");

      const booking = await prisma.booking.findUnique({
        where: { id: bookingId }
      });

      if (!booking) throw new NotFoundError("Booking not found!");

      if (booking.status !== BookingStatus.HOLD) {
        throw new PrismaUniqueError(
          `Booking is in ${booking.status} status, expected HOLD.`
        );
      }

      const existingOngoingOrSuccessPayment = await prisma.payment.findFirst({
        where: {
          bookingId: booking.id,
          status: { in: [PaymentStatus.PENDING, PaymentStatus.SUCCESS] }
        }
      });

      if (existingOngoingOrSuccessPayment) {
        return this.mapPaymentDataToPaymentResponse(existingOngoingOrSuccessPayment);
      }

      const payment = await prisma.payment.create({
        data: {
          bookingId: booking.id,
          status: PaymentStatus.PENDING,
          value: booking.totalValue,
          currency: "IDR",
          provider: Provider.FASPAY,
          paymentMethod: PaymentMethodType.QRIS,
        }
      })

      try {
        const providerResponse = await this.faspayClient.generateQris({
          bookingId: booking.id,
          paymentId: payment.id,
          amount: payment.value,
          qrisValidTo: booking.expiredAt!,
        })
  
        const updatedPayment = await prisma.payment.update({
          where: { id: payment.id },
          data: {
            qrUrl: providerResponse.qrUrl,
            version: { increment: 1 }
          }
        })
  
        return this.mapPaymentDataToPaymentResponse(updatedPayment);
      } catch (error) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: PaymentStatus.FAILED,
            version: { increment: 1 }
          }
        })
        console.error("Faspay QRIS Generation Failed:", error);
        throw error;
      }
    } catch (error) {
      if (error instanceof PrismaUniqueError) throw error;
      if (error instanceof NotFoundError) throw error;
      if (error instanceof BadRequestError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  verifyPayment = async (paymentId: string): Promise<PaymentResponse> => {
    try {
      let payment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: { booking: true }
      });

      if (!payment || !payment.booking) throw new NotFoundError("Record not found!");

      if (this.isPaymentFinal(payment.status)) {
        return this.mapPaymentDataToPaymentResponse(payment);
      }

      const providerResponse = await this.faspayClient.getPaymentStatus({
        paymentId: payment.id,
        providerPaymentId: payment.providerPaymentId!,
      })

      if (this.isPaymentFinal(providerResponse.paymentStatus)) {
        return await prisma.$transaction(async (tx) => {
          return await this.finalizeStatus(
            tx, 
            payment, 
            payment.booking!, 
            providerResponse.paymentStatus, 
            providerResponse.paidAt
          );
        });
      }

      return this.mapPaymentDataToPaymentResponse(payment);
    } catch (error) {
      if (error instanceof PrismaUniqueError) throw error;
      if (error instanceof NotFoundError) throw error;
      if (error instanceof BadRequestError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  }
  
  callbackFaspayPayment = async (data: CallbackNotificationRequest) => {
    try {
      let payment = await prisma.payment.findFirst({
        where: { providerPaymentId: data.providerPaymentId },
        include: { booking: true }
      });

      if (!payment || !payment.booking) throw new NotFoundError("Record not found!");

      if (this.isPaymentFinal(payment.status)) {
        return this.mapPaymentDataToPaymentResponse(payment);
      }

      if (this.isPaymentFinal(data.paymentStatus)) {
        return await prisma.$transaction(async (tx) => {
          return await this.finalizeStatus(
            tx, 
            payment, 
            payment.booking!, 
            data.paymentStatus, 
            data.paidAt
          );
        });
      }

      return this.mapPaymentDataToPaymentResponse(payment);
    } catch (error) {
      if (error instanceof PrismaUniqueError) throw error;
      if (error instanceof NotFoundError) throw error;
      if (error instanceof BadRequestError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  }

  private isPaymentFinal = (status: PaymentStatus): boolean => {    
    return status !== PaymentStatus.PENDING;
  }

  private finalizeStatus = async (
    tx: any,
    payment: Payment,
    booking: Booking,
    paymentStatus: PaymentStatus,
    paidAt: Date | null
  ): Promise<PaymentResponse> => {
    const paymentUpdate = {
      status: paymentStatus,
      paidAt: paidAt,
      version: { increment: 1 }
    };
    
    const bookingStatus = PAYMENT_TO_BOOKING_STATUS_MAP[paymentStatus];
    let bookingUpdate: any = {
      status: bookingStatus,
      expiredAt: null,
      version: { increment: 1 }
    };

    if (paymentStatus === PaymentStatus.SUCCESS && booking.immediate) {
      const actualStart = new Date();
      let actualEnd: Date;

      switch (booking.baseDurationType) {
        case DurationType.HOURLY:
          actualEnd = addHours(actualStart, booking.baseDurationUnit * booking.quantity);
          break;
        case DurationType.DAILY:
          actualEnd = addDays(actualStart, booking.baseDurationUnit * booking.quantity);
          break;
        default:
          throw new BadRequestError(`Unsupported duration type: ${booking.baseDurationType}`);
      }

      bookingUpdate.startAt = actualStart;
      bookingUpdate.endAt = actualEnd;
    }

    const updatedPayment = await tx.payment.update({ where: { id: payment.id }, data: paymentUpdate });
    await tx.booking.update({ where: { id: booking.id }, data: bookingUpdate });

    return this.mapPaymentDataToPaymentResponse(updatedPayment);
  }

  private mapBookingDataToBookingResponse = (booking: Booking): BookingResponse => {
    return {
      id: booking.id,
      userId: booking.userId,
      accountId: booking.accountId,
      status: booking.status,
      baseDurationUnit: booking.baseDurationUnit,
      baseDurationType: booking.baseDurationType,
      quantity: booking.quantity,
      startAt: booking.startAt,
      endAt: booking.endAt,
      expiredAt: booking.expiredAt,
      mainValuePerUnit: booking.mainValuePerUnit,
      othersValuePerUnit: booking.othersValuePerUnit,
      voucherCode: booking.voucherCode,
      voucherPercent: booking.voucherPercent,
      mainValue: booking.mainValue,
      othersValue: booking.othersValue,
      discount: booking.discount,
      totalValue: booking.totalValue,
    }; 
  }

  private mapPaymentDataToPaymentResponse = (payment: Payment): PaymentResponse => {
    return {
      paymentId: payment.id,
      bookingId: payment.bookingId,
      status: payment.status,
      value: payment.value,
      currency: payment.currency,
      provider: payment.provider,
      providerPaymentId: payment.providerPaymentId,
      paymentMethod: payment.paymentMethod,
      qrUrl: payment.qrUrl,
      paidAt: payment.paidAt,
      refundedAt: payment.refundedAt,
    }; 
  }
}
