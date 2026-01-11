import {
  Account,
  Booking,
  BookingStatus,
  Payment,
  PaymentMethodType,
  PaymentStatus,
  PriceList,
  Provider,
  Type,
  Voucher
} from "@prisma/client";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  PrismaUniqueError
} from "../lib/error";
import { addDays, addHours, addMinutes } from "../lib/utils";
import { prisma } from "../lib/prisma";
import { BankCodes, BookingResponse, CallbackNotificationRequest, CreateBookingRequest, PayBookingRequest, PaymentMethodRequest, PaymentResponse, VoucherResponse } from "../types/booking.type";
import { FaspayClient } from "../faspay/faspay.client";

export const PAYMENT_TO_BOOKING_STATUS_MAP: Record<PaymentStatus, BookingStatus> = {
  [PaymentStatus.SUCCESS]: BookingStatus.RESERVED,
  [PaymentStatus.PENDING]: BookingStatus.HOLD,
  [PaymentStatus.REFUNDED]: BookingStatus.FAILED,
  [PaymentStatus.CANCELLED]: BookingStatus.CANCELLED,
  [PaymentStatus.FAILED]: BookingStatus.FAILED,
  [PaymentStatus.EXPIRED]: BookingStatus.EXPIRED,
};

export type PaymentMethodTypeAndCode = {
  paymentMethodType: PaymentMethodType,
  bankCode?: BankCodes,
}

export const PAYMENT_METHODS_MAP: Record<PaymentMethodRequest, PaymentMethodTypeAndCode> = {
  [PaymentMethodRequest.QRIS]: { paymentMethodType: PaymentMethodType.QRIS },
  [PaymentMethodRequest.VA_BNI]: { paymentMethodType: PaymentMethodType.VIRTUAL_ACCOUNT, bankCode: BankCodes.BNI },
  [PaymentMethodRequest.VA_PERMATA]: { paymentMethodType: PaymentMethodType.VIRTUAL_ACCOUNT, bankCode: BankCodes.PERMATA },
  [PaymentMethodRequest.VA_BRI]: { paymentMethodType: PaymentMethodType.VIRTUAL_ACCOUNT, bankCode: BankCodes.BRI },
  [PaymentMethodRequest.MANUAL]: { paymentMethodType: PaymentMethodType.MANUAL },
};

export class BookingService {
  private readonly holdBookingTimeInMinutes: number = 15;
  private readonly gracePeriodInMillis: number = 30000;

  constructor(private readonly faspayClient: FaspayClient) {}

  getBookingById = async (bookingId: string): Promise<BookingResponse> => {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          account: {
            include: {
              priceTier: true,
              thumbnail: true,
              otherImages: true,
              skinList: true,
            },
          },
        },
      });

      if (!booking) {
        throw new NotFoundError(`Booking with ID ${bookingId} not found.`);
      }
      return this.mapBookingWithAccountDataToBookingResponse(booking);
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
        include: {
          booking: true,
        }
      });

      if (!payment) {
        throw new NotFoundError(`Payment with ID ${paymentId} not found.`);
      }
      return this.mapPaymentWithBookingDataToPaymentResponse(payment);
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
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  }

  private parseDurationToHours = (duration: string): number => {
    const lower = duration.toLowerCase().trim();

    if (lower.endsWith("h")) {
      return Number(lower.replace("h", ""));
    }

    if (lower.endsWith("d")) {
      return Number(lower.replace("d", "")) * 24;
    }

    return 0;
  }

  private calculateValues = (
    normalPrice: number,
    lowPrice: number,
    isLowRank: boolean,
    duration: string,
    voucher: VoucherResponse | null,
    quantity: number,
  ) => {
    const mainValue = normalPrice * quantity;
    const othersValue = isLowRank ? lowPrice * quantity : 0;

    let voucherType = null;
    let voucherAmount = null;
    let voucherMaxDiscount = null;
    let discount = 0;
    if (voucher) {
      voucherType = voucher.type;
      if (voucher.type === Type.PERSENTASE) {
        voucherAmount = voucher.percentage ?? 0;
        discount = mainValue * voucherAmount * 0.01;
      } else {
        voucherAmount = voucher.nominal ?? 0;
        discount = voucherAmount;
      }

      if (voucher.maxDiscount) {
        voucherMaxDiscount = voucher.maxDiscount;
        discount = Math.min(discount, voucherMaxDiscount);
      }

      discount = Math.min(discount, mainValue);
    }

    const totalValue = mainValue + othersValue - discount;

    const durationInHours = this.parseDurationToHours(duration);

    return {
      voucherType,
      voucherAmount,
      voucherMaxDiscount,
      mainValue,
      othersValue,
      duration,
      durationInHours,
      discount,
      totalValue,
    }
  }

  createBooking = async (data: CreateBookingRequest): Promise<BookingResponse> => {
    try {
      const {
        userId,
        accountId,
        priceListId,
        quantity,
        voucherId,
        startAt,
      } = data;

      if (userId) {
        const user = await prisma.user.findUnique({
          where: { id: userId }
        });
        if (!user) throw new NotFoundError("User not found!");
      }

      const account = await prisma.account.findUnique({
        where: { id: accountId }
      });
      if (!account) throw new NotFoundError("Account not found!");

      const priceList = await prisma.priceList.findUnique({
        where: { id: priceListId }
      });
      if (!priceList) throw new NotFoundError("Price list not found!");

      const voucher = voucherId ? await this.getValidVoucherById(voucherId) : null;

      const bookingPriceValues = this.calculateValues(
        priceList.normalPrice,
        priceList.lowPrice,
        account.isLowRank,
        priceList.duration,
        voucher,
        quantity,
      );

      const immediate = !startAt;

      const now = new Date();
      const bookingExpiredAt = addMinutes(now, this.holdBookingTimeInMinutes);
      const bookingStartAt = immediate ? bookingExpiredAt : startAt;
      const bookingEndAt = addHours(bookingStartAt, bookingPriceValues.durationInHours * quantity);

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
            duration: bookingPriceValues.duration,
            quantity,
            immediate,
            startAt: bookingStartAt,
            endAt: bookingEndAt,
            expiredAt: bookingExpiredAt,
            mainValuePerUnit: priceList.normalPrice,
            othersValuePerUnit: account.isLowRank ? priceList.lowPrice : 0,
            voucherId,
            voucherType: bookingPriceValues.voucherType, 
            voucherAmount: bookingPriceValues.voucherAmount,
            voucherMaxDiscount: bookingPriceValues.voucherMaxDiscount,
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
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  payBooking = async (data: PayBookingRequest): Promise<PaymentResponse> => {
    try {
      const {
        bookingId,
        voucherId,
        provider,
        paymentMethod,
      } = data;

      const booking = await prisma.booking.findUnique({
        where: { id: bookingId }
      });

      if (!booking) throw new NotFoundError("Booking not found!");
      if (booking.status !== BookingStatus.HOLD) {
        throw new PrismaUniqueError(
          `Booking is in ${booking.status} status, expected HOLD.`
        );
      }

      if (booking.expiredAt! < new Date(Date.now() - this.gracePeriodInMillis)) {
        await prisma.booking.update({
          where: { id: booking.id },
          data: { status: BookingStatus.EXPIRED },
        })
        throw new BadRequestError("Booking is expired!")
      }

      const account = await prisma.account.findUnique({
        where: { id: booking.accountId }
      });
      if (!account) throw new NotFoundError("Account not found!");

      const voucher = voucherId
        ? await this.getValidVoucherById(voucherId)
        : null;

      const bookingPriceValues = this.calculateValues(
        booking.mainValuePerUnit,
        booking.othersValuePerUnit ?? 0,
        account.isLowRank,
        booking.duration,
        voucher,
        booking.quantity,
      );

      const { paymentMethodType, bankCode } = PAYMENT_METHODS_MAP[paymentMethod];

      const { payment, isPaymentNew } = await prisma.$transaction(async (tx) => {
        await tx.$executeRaw`
          SELECT id FROM "Booking" WHERE id = ${bookingId} FOR UPDATE
        `;
  
        const updatedBooking = await tx.booking.update({
          where: { id: booking.id },
          data: {
            voucherId,
            voucherType: bookingPriceValues.voucherType, 
            voucherAmount: bookingPriceValues.voucherAmount,
            voucherMaxDiscount: bookingPriceValues.voucherMaxDiscount,
            mainValue: bookingPriceValues.mainValue,
            othersValue: bookingPriceValues.othersValue,
            discount: bookingPriceValues.discount,
            totalValue: bookingPriceValues.totalValue,
            version: { increment: 1 }
          }
        });

        let payment = await tx.payment.findFirst({
          where: {
            bookingId: booking.id,
            status: { in: [PaymentStatus.PENDING, PaymentStatus.SUCCESS] }
          }
        });

        if (payment) {
          return { payment, isPaymentNew: false }
        }

        payment = await tx.payment.create({
          data: {
            bookingId: booking.id,
            status: PaymentStatus.PENDING,
            value: updatedBooking.totalValue,
            currency: "IDR",
            provider: provider,
            paymentMethod: paymentMethodType,
            bankCode: bankCode?.toString(),
          }
        })

        return { payment, isPaymentNew: true }
      })

      if (!isPaymentNew) {
        return this.mapPaymentDataToPaymentResponse(payment);
      }

      const updatedPayment = await this.processPaymentProvider(
        booking,
        payment,
        paymentMethodType,
        bankCode,
      )
      return this.mapPaymentDataToPaymentResponse(updatedPayment);
    } catch (error) {
      if (error instanceof PrismaUniqueError) throw error;
      if (error instanceof NotFoundError) throw error;
      if (error instanceof BadRequestError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  cancelBooking = async (bookingId: string): Promise<BookingResponse> => {
    try {
      let booking = await prisma.booking.findUnique({
        where: { id: bookingId }
      });

      if (!booking) throw new NotFoundError("Booking not found!");

      if (booking.status === BookingStatus.HOLD) {
        booking = await prisma.booking.update({
          where: { id: booking.id },
          data: { status: BookingStatus.CANCELLED },
        })
      }

      return this.mapBookingDataToBookingResponse(booking);
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  }

  verifyPayment = async (paymentId: string): Promise<PaymentResponse> => {
    try {
      let payment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: { booking: true }
      });

      if (!payment || !payment.booking) throw new NotFoundError("Record not found!");

      if (this.isPaymentFinal(payment.status)) {
        return this.mapPaymentWithBookingDataToPaymentResponse(payment);
      }

      const providerResponse = await this.faspayClient.getPaymentStatus({
        paymentId: payment.id,
        providerPaymentId: payment.providerPaymentId!,
        paymentMethod: payment.paymentMethod!,
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

      return this.mapPaymentWithBookingDataToPaymentResponse(payment);
    } catch (error) {
      if (error instanceof PrismaUniqueError) throw error;
      if (error instanceof NotFoundError) throw error;
      if (error instanceof BadRequestError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  }

  forcePay = async (paymentId: string): Promise<PaymentResponse> => {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: { booking: true }
      });

      if (!payment || !payment.booking) throw new NotFoundError("Record not found!");

      if (this.isPaymentFinal(payment.status)) {
        return this.mapPaymentDataToPaymentResponse(payment);
      }

      const updatedPayment = await prisma.$transaction(async (tx) => {
        return await this.finalizeStatus(
          tx, 
          payment, 
          payment.booking!, 
          PaymentStatus.SUCCESS, 
          new Date()
        );
      });

      return updatedPayment;
    } catch (error) {
      if (error instanceof PrismaUniqueError) throw error;
      if (error instanceof NotFoundError) throw error;
      if (error instanceof BadRequestError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  }

  syncExpiredBookings = async () => {
    try {
      const nowWithGrace = new Date(Date.now() - this.gracePeriodInMillis)

      const count = await prisma.$transaction(async (tx) => {
        const expiredBookings = await tx.booking.findMany({
          where: {
            status: BookingStatus.HOLD,
            expiredAt: {
              lte: nowWithGrace,
            },
          },
          select: {
            id: true,
          },
        })

        if (expiredBookings.length === 0) return 0;

        const bookingIds = expiredBookings.map(b => b.id)

        await tx.booking.updateMany({
          where: {
            id: { in: bookingIds },
            status: BookingStatus.HOLD,
          },
          data: {
            status: BookingStatus.EXPIRED,
          },
        })

        await tx.payment.updateMany({
          where: {
            bookingId: { in: bookingIds },
            status: PaymentStatus.PENDING,
          },
          data: {
            status: PaymentStatus.EXPIRED,
          },
        })

        return bookingIds.length;
      })

      return { count };
    } catch (error) {
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

  private getValidVoucherById = async (voucherId: number): Promise<VoucherResponse> => {
    const voucher = await prisma.voucher.findFirst({
      where: { id: voucherId },
    })

    if (!voucher) throw new BadRequestError("Voucher not found!");

    if (!voucher.isValid) throw new BadRequestError("Voucher not valid!");

    return this.mapVoucherDataToVoucherResponse(voucher);
  }

  private isPaymentFinal = (status: PaymentStatus): boolean => {    
    return status !== PaymentStatus.PENDING;
  }

  private processPaymentProvider = async (
    booking: Booking,
    payment: Payment,
    paymentMethod: PaymentMethodType,
    bankCode?: BankCodes,
  ): Promise<Payment> => {
    try {
      if (paymentMethod === PaymentMethodType.QRIS) {
        const providerResponse = await this.faspayClient.createQrisPayment({
          bookingId: booking.id,
          paymentId: payment.id,
          amount: payment.value,
          expiredAt: booking.expiredAt!,
        })

        return await prisma.payment.update({
          where: { id: payment.id },
          data: {
            providerPaymentId: providerResponse.providerPaymentId,
            qrUrl: providerResponse.qrUrl,
          }
        })
      }
      
      if (paymentMethod === PaymentMethodType.VIRTUAL_ACCOUNT) {
        const providerResponse = await this.faspayClient.createVaPayment({
          bookingId: booking.id,
          paymentId: payment.id,
          amount: payment.value,
          bankCode: bankCode!.toString(),
          expiredAt: booking.expiredAt!,
        })

        return await prisma.payment.update({
          where: { id: payment.id },
          data: {
            providerPaymentId: providerResponse.providerPaymentId,
            bankCode: bankCode!.toString(),
            bankAccountNo: providerResponse.bankAccountNo,
            bankAccountName: providerResponse.bankAccountName,
          }
        })
      }
      
      if (paymentMethod === PaymentMethodType.MANUAL) {
        return await prisma.payment.update({
          where: { id: payment.id },
          data: { status: PaymentStatus.SUCCESS }
        })
      }

      throw new BadRequestError("Payment method is not supported!");
    } catch (error) {
      console.error("Process payment to provider failed:", error);
      return await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.FAILED
        }
      })
    }
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
    };

    const bookingStatus = PAYMENT_TO_BOOKING_STATUS_MAP[paymentStatus];
    let bookingUpdate: any = {
      status: bookingStatus,
      expiredAt: null,
      version: { increment: 1 },
    };

    if (paymentStatus === PaymentStatus.SUCCESS && booking.immediate) {
      const actualStart = new Date();
      const durationInHours = this.parseDurationToHours(booking.duration);
      const actualEnd = addHours(actualStart, durationInHours * booking.quantity);

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
      duration: booking.duration,
      quantity: booking.quantity,
      startAt: booking.startAt,
      endAt: booking.endAt,
      expiredAt: booking.expiredAt,
      mainValuePerUnit: booking.mainValuePerUnit,
      othersValuePerUnit: booking.othersValuePerUnit,
      voucherId: booking.voucherId,
      voucherType: booking.voucherType,
      voucherAmount: booking.voucherAmount,
      voucherMaxDiscount: booking.voucherMaxDiscount,
      mainValue: booking.mainValue,
      othersValue: booking.othersValue,
      discount: booking.discount,
      totalValue: booking.totalValue,
    }; 
  }

  private mapBookingWithAccountDataToBookingResponse = (booking: Booking & { account: Account }): BookingResponse => {
    return {
      id: booking.id,
      userId: booking.userId,
      accountId: booking.accountId,
      status: booking.status,
      duration: booking.duration,
      quantity: booking.quantity,
      startAt: booking.startAt,
      endAt: booking.endAt,
      expiredAt: booking.expiredAt,
      mainValuePerUnit: booking.mainValuePerUnit,
      othersValuePerUnit: booking.othersValuePerUnit,
      voucherId: booking.voucherId,
      voucherType: booking.voucherType,
      voucherAmount: booking.voucherAmount,
      voucherMaxDiscount: booking.voucherMaxDiscount,
      mainValue: booking.mainValue,
      othersValue: booking.othersValue,
      discount: booking.discount,
      totalValue: booking.totalValue,
      account: booking.account,
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

  private mapPaymentWithBookingDataToPaymentResponse = (payment: Payment & { booking: Booking | null }): PaymentResponse => {
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
      booking: payment.booking,
    }; 
  }

  private mapVoucherDataToVoucherResponse = (voucher: Voucher): VoucherResponse => {
    return {
      id: voucher.id,
      voucherName: voucher.voucherName,
      isValid: voucher.isValid,
      type: voucher.type,
      percentage: voucher.percentage,
      nominal: voucher.nominal,
      maxDiscount: voucher.maxDiscount,
    }; 
  }
}
