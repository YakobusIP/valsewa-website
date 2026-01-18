import {
  Account,
  Booking,
  BookingStatus,
  ImageUpload,
  Payment,
  PaymentMethodType,
  PaymentStatus,
  PriceTier,
  Prisma,
  Status,
  Type,
  Voucher
} from "@prisma/client";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  PrismaUniqueError
} from "../lib/error";
import { addHours, addMinutes } from "../lib/utils";
import { prisma } from "../lib/prisma";
import {
  BankCodes,
  BookingResponse,
  CallbackNotificationRequest,
  CreateBookingRequest,
  CreateManualBookingRequest,
  OverrideBookingRequest,
  PayBookingRequest,
  PaymentMethodRequest,
  PaymentResponse,
  VoucherResponse
} from "../types/booking.type";
import { FaspayClient } from "../faspay/faspay.client";
import { Metadata } from "../types/metadata.type";
import { env } from "../lib/env";

export const PAYMENT_TO_BOOKING_STATUS_MAP: Record<
  PaymentStatus,
  BookingStatus
> = {
  [PaymentStatus.SUCCESS]: BookingStatus.RESERVED,
  [PaymentStatus.PENDING]: BookingStatus.HOLD,
  [PaymentStatus.REFUNDED]: BookingStatus.FAILED,
  [PaymentStatus.CANCELLED]: BookingStatus.CANCELLED,
  [PaymentStatus.FAILED]: BookingStatus.FAILED,
  [PaymentStatus.EXPIRED]: BookingStatus.EXPIRED
};

export type PaymentMethodTypeAndCode = {
  paymentMethodType: PaymentMethodType;
  bankCode?: BankCodes;
};

export const PAYMENT_METHODS_MAP: Record<
  PaymentMethodRequest,
  PaymentMethodTypeAndCode
> = {
  [PaymentMethodRequest.QRIS]: { paymentMethodType: PaymentMethodType.QRIS },
  [PaymentMethodRequest.VA_BNI]: {
    paymentMethodType: PaymentMethodType.VIRTUAL_ACCOUNT,
    bankCode: BankCodes.BNI
  },
  [PaymentMethodRequest.VA_PERMATA]: {
    paymentMethodType: PaymentMethodType.VIRTUAL_ACCOUNT,
    bankCode: BankCodes.PERMATA
  },
  [PaymentMethodRequest.VA_BRI]: {
    paymentMethodType: PaymentMethodType.VIRTUAL_ACCOUNT,
    bankCode: BankCodes.BRI
  },
  [PaymentMethodRequest.MANUAL]: { paymentMethodType: PaymentMethodType.MANUAL }
};

export class BookingService {
  constructor(private readonly faspayClient: FaspayClient) {}

  getAllBookings = async (
    page?: number,
    limit?: number,
    query?: string
  ): Promise<[BookingResponse[], Metadata]> => {
    try {
      const trimmed = (query ?? "").trim();
      const whereCriteria: Prisma.BookingWhereInput | undefined = undefined;

      let data: Booking[];
      let metadata: Metadata;

      if (page !== undefined && limit !== undefined) {
        const skip = (page - 1) * limit;

        data = await prisma.booking.findMany({
          where: whereCriteria,
          take: limit,
          skip: skip,
          include: {
            payments: true
          }
        });

        const itemCount = await prisma.booking.count({
          where: whereCriteria
        });
        const pageCount = Math.ceil(itemCount / limit);

        metadata = {
          page: page,
          limit: limit,
          pageCount,
          total: itemCount
        };
      } else {
        data = await prisma.booking.findMany({
          where: whereCriteria,
          include: {
            payments: true
          }
        });
        metadata = {
          page: 0,
          limit: 0,
          pageCount: 0,
          total: 0
        };
      }

      return [
        data.map((datum) => this.mapBookingDataToBookingResponse(datum)),
        metadata
      ];
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  getBookingById = async (bookingId: string): Promise<BookingResponse> => {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          account: {
            include: {
              priceTier: true,
              thumbnail: true
            }
          }
        }
      });

      if (!booking) {
        throw new NotFoundError(`Booking with ID ${bookingId} not found.`);
      }

      const now = new Date();
      const isActive =
        booking.status === BookingStatus.RESERVED &&
        booking.startAt! < now &&
        booking.endAt! > now;

      return this.mapBookingWithAccountDataToBookingWithAccountResponse(
        booking,
        isActive
      );
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  updateBooking = async (bookingId: string, totalValue: number) => {
    try {
      const booking = await prisma.booking.update({
        where: { id: bookingId },
        data: { totalValue }
      });
      return this.mapBookingDataToBookingResponse(booking);
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  getAccountRented = async (startDate?: Date, endDate?: Date) => {
    try {
      const stats = await prisma.booking.aggregate({
        where: {
          status: "COMPLETED",
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        },
        _count: {
          id: true
        },
        _sum: {
          totalValue: true
        }
      });

      return {
        completedBookingCount: stats._count.id,
        totalIncome: stats._sum.totalValue ?? 0
      };
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };
  getBookingsByCustomerId = async (
    customerId: number
  ): Promise<BookingResponse[]> => {
    try {
      const bookings = await prisma.booking.findMany({
        where: { customerId: customerId },
        orderBy: { startAt: "desc" }
      });
      return bookings.map(this.mapBookingDataToBookingResponse);
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  getHoldBookingsByCustomerId = async (
    customerId: number
  ): Promise<BookingResponse[]> => {
    try {
      const bookings = await prisma.booking.findMany({
        where: { customerId: customerId, status: BookingStatus.HOLD },
        orderBy: { startAt: "desc" }
      });
      return bookings.map(this.mapBookingDataToBookingResponse);
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  getPaymentById = async (paymentId: string): Promise<PaymentResponse> => {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: {
          booking: true
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
  };

  getActivePaymentByBookingId = async (
    bookingId: string
  ): Promise<PaymentResponse> => {
    try {
      const payment = await prisma.payment.findFirst({
        where: { bookingId: bookingId, status: PaymentStatus.PENDING }
      });

      if (!payment) {
        throw new NotFoundError(
          `Active payment with booking ID ${bookingId} not found.`
        );
      }
      return this.mapPaymentDataToPaymentResponse(payment);
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  private parseDurationToHours = (duration: string): number => {
    const lower = duration.toLowerCase().trim();

    if (lower.endsWith("h")) {
      return Number(lower.replace("h", ""));
    }

    if (lower.endsWith("d")) {
      return Number(lower.replace("d", "")) * 24;
    }

    return 0;
  };

  private calculateValues = (
    normalPrice: number,
    lowPrice: number,
    isLowRank: boolean,
    duration: string,
    voucher: VoucherResponse | null,
    paymentMethod: PaymentMethodType | null,
    quantity: number
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

    const subtotalValue = mainValue + othersValue - discount;
    let adminFee = 0;
    switch (paymentMethod) {
      case PaymentMethodType.QRIS:
        adminFee = 0.007 * subtotalValue;
        break;

      case PaymentMethodType.VIRTUAL_ACCOUNT:
        adminFee = 4000;
        break;

      default:
        adminFee = 0;
    }

    const totalValue = subtotalValue + adminFee;

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
      adminFee,
      totalValue
    };
  };

  createBooking = async (
    data: CreateBookingRequest
  ): Promise<BookingResponse> => {
    try {
      const {
        customerId,
        accountId,
        priceListId,
        quantity,
        voucherId,
        startAt
      } = data;

      if (customerId) {
        const customer = await prisma.customer.findUnique({
          where: { id: customerId }
        });
        if (!customer) throw new NotFoundError("Customer not found");

        const ongoingHoldBooking = prisma.booking.findFirst({
          where: {
            customerId,
            status: BookingStatus.HOLD
          }
        });
        if (!ongoingHoldBooking)
          throw new PrismaUniqueError("Customer has ongoing hold booking.");
      }

      const account = await prisma.account.findUnique({
        where: {
          id: accountId,
          availabilityStatus: { not: Status.NOT_AVAILABLE }
        }
      });
      if (!account)
        throw new NotFoundError("Account not found or not available!");

      const priceList = await prisma.priceList.findUnique({
        where: { id: priceListId }
      });
      if (!priceList) throw new NotFoundError("Price list not found!");

      const voucher = voucherId
        ? await this.getValidVoucherById(voucherId)
        : null;

      const {
        voucherType,
        voucherAmount,
        voucherMaxDiscount,
        mainValue,
        othersValue,
        duration,
        durationInHours,
        discount,
        totalValue
      } = this.calculateValues(
        priceList.normalPrice,
        priceList.lowPrice,
        account.isLowRank,
        priceList.duration,
        voucher,
        null,
        quantity
      );

      const immediate = !startAt;

      const now = new Date();
      const bookingExpiredAt = addMinutes(now, env.BOOKING_HOLD_TIME_MINUTES);
      const bookingStartAt = immediate ? bookingExpiredAt : startAt;
      const bookingEndAt = addHours(bookingStartAt, durationInHours * quantity);

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
            customerId,
            accountId,
            status: BookingStatus.HOLD,
            duration,
            quantity,
            immediate,
            startAt: bookingStartAt,
            endAt: bookingEndAt,
            expiredAt: bookingExpiredAt,
            mainValuePerUnit: priceList.normalPrice,
            othersValuePerUnit: account.isLowRank ? priceList.lowPrice : 0,
            voucherName: voucher?.voucherName,
            voucherType,
            voucherAmount,
            voucherMaxDiscount,
            mainValue,
            othersValue,
            discount,
            totalValue,
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

  createManualBooking = async (
    data: CreateManualBookingRequest
  ): Promise<BookingResponse> => {
    try {
      const { accountCode, totalValue, startAt } = data;

      const account = await prisma.account.findUnique({
        where: { accountCode: accountCode }
      });
      if (!account) throw new NotFoundError("Account not found!");

      const immediate = !startAt;

      const now = new Date();
      const bookingExpiredAt = addMinutes(now, env.BOOKING_HOLD_TIME_MINUTES);
      const bookingStartAt = immediate ? bookingExpiredAt : startAt;
      const bookingEndAt = new Date();

      const booking = await prisma.booking.create({
        data: {
          accountId: account.id,
          status: BookingStatus.COMPLETED,
          duration: "-",
          quantity: 1,
          immediate,
          startAt: bookingStartAt,
          endAt: bookingEndAt,
          expiredAt: bookingExpiredAt,
          mainValuePerUnit: totalValue,
          othersValuePerUnit: 0,
          mainValue: totalValue,
          totalValue: totalValue,
          version: 1
        }
      });

      return this.mapBookingDataToBookingResponse(booking);
    } catch (error) {
      if (error instanceof PrismaUniqueError) throw error;
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  overrideBooking = async (
    data: OverrideBookingRequest
  ): Promise<BookingResponse> => {
    try {
      const { bookingId, accountId } = data;

      const booking = await prisma.booking.findUnique({
        where: { id: bookingId, status: BookingStatus.RESERVED }
      });
      if (!booking) throw new NotFoundError("Booking not found");

      const account = await prisma.account.findUnique({
        where: {
          id: accountId,
          availabilityStatus: { not: Status.NOT_AVAILABLE }
        }
      });
      if (!account)
        throw new NotFoundError("Account not found or not available!");

      const updatedBooking = await prisma.booking.update({
        where: { id: booking.id },
        data: {
          accountId,
          version: { increment: 1 }
        }
      });

      return this.mapBookingDataToBookingResponse(updatedBooking);
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  payBooking = async (data: PayBookingRequest): Promise<PaymentResponse> => {
    try {
      const { bookingId, voucherId, provider, paymentMethod } = data;

      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          customer: true
        }
      });

      if (!booking) throw new NotFoundError("Booking not found!");
      if (booking.status !== BookingStatus.HOLD) {
        throw new PrismaUniqueError(
          `Booking is in ${booking.status} status, expected HOLD.`
        );
      }

      if (!booking.expiredAt) {
        throw new BadRequestError("Booking expiredAt is missing!");
      }

      if (
        booking.expiredAt < new Date(Date.now() - env.BOOKING_GRACE_TIME_MILLIS)
      ) {
        await prisma.booking.update({
          where: { id: booking.id },
          data: { status: BookingStatus.EXPIRED }
        });
        throw new BadRequestError("Booking is expired!");
      }

      const account = await prisma.account.findUnique({
        where: { id: booking.accountId }
      });
      if (!account) throw new NotFoundError("Account not found!");

      const voucher = voucherId
        ? await this.getValidVoucherById(voucherId)
        : null;

      const { paymentMethodType, bankCode } =
        PAYMENT_METHODS_MAP[paymentMethod];

      const {
        voucherType,
        voucherAmount,
        voucherMaxDiscount,
        mainValue,
        othersValue,
        discount,
        adminFee,
        totalValue
      } = this.calculateValues(
        booking.mainValuePerUnit,
        booking.othersValuePerUnit ?? 0,
        account.isLowRank,
        booking.duration,
        voucher,
        paymentMethodType,
        booking.quantity
      );

      const { payment, isPaymentNew } = await prisma.$transaction(
        async (tx) => {
          await tx.$executeRaw`
          SELECT id FROM "Booking" WHERE id = ${bookingId} FOR UPDATE
        `;

          const updatedBooking = await tx.booking.update({
            where: { id: booking.id },
            data: {
              voucherName: voucher?.voucherName,
              voucherType,
              voucherAmount,
              voucherMaxDiscount,
              mainValue,
              othersValue,
              discount,
              adminFee,
              totalValue,
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
            return { payment, isPaymentNew: false };
          }

          payment = await tx.payment.create({
            data: {
              bookingId: booking.id,
              status: PaymentStatus.PENDING,
              value: updatedBooking.totalValue,
              currency: "IDR",
              provider: provider,
              paymentMethod: paymentMethodType,
              bankCode: bankCode?.toString()
            }
          });

          return { payment, isPaymentNew: true };
        }
      );

      if (!isPaymentNew) {
        return this.mapPaymentDataToPaymentResponse(payment);
      }

      const bankAccountName =
        paymentMethodType === PaymentMethodType.VIRTUAL_ACCOUNT
          ? (booking.customer?.username ?? undefined)
          : undefined;

      const updatedPayment = await this.processPaymentProvider(
        booking,
        payment,
        paymentMethodType,
        bankCode,
        bankAccountName
      );
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
          data: { status: BookingStatus.CANCELLED }
        });
      }

      return this.mapBookingDataToBookingResponse(booking);
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  verifyPayment = async (paymentId: string): Promise<PaymentResponse> => {
    try {
      let payment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: { booking: true }
      });

      if (!payment || !payment.booking)
        throw new NotFoundError("Record not found!");

      if (this.isPaymentFinal(payment.status)) {
        return this.mapPaymentWithBookingDataToPaymentResponse(payment);
      }

      const providerResponse =
        await this.faspayClient.getPaymentStatus(payment);

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
  };

  forcePay = async (paymentId: string): Promise<PaymentResponse> => {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: { booking: true }
      });

      if (!payment || !payment.booking)
        throw new NotFoundError("Record not found!");

      if (payment.status === PaymentStatus.SUCCESS) {
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
  };

  syncExpiredBookings = async () => {
    try {
      const nowWithGrace = new Date(Date.now() - env.BOOKING_GRACE_TIME_MILLIS);

      const count = await prisma.$transaction(async (tx) => {
        const expiredBookings = await tx.booking.findMany({
          where: {
            status: BookingStatus.HOLD,
            expiredAt: {
              lte: nowWithGrace
            }
          },
          select: {
            id: true
          }
        });

        if (expiredBookings.length === 0) return 0;

        const bookingIds = expiredBookings.map((b) => b.id);

        await tx.booking.updateMany({
          where: {
            id: { in: bookingIds },
            status: BookingStatus.HOLD
          },
          data: {
            status: BookingStatus.EXPIRED
          }
        });

        await tx.payment.updateMany({
          where: {
            bookingId: { in: bookingIds },
            status: PaymentStatus.PENDING
          },
          data: {
            status: PaymentStatus.EXPIRED
          }
        });

        return bookingIds.length;
      });

      return { count };
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  syncCompletedBookings = async () => {
    try {
      const count = await prisma.$transaction(async (tx) => {
        const completedBookings = await tx.booking.findMany({
          where: {
            status: BookingStatus.RESERVED,
            endAt: { lte: new Date() }
          },
          select: {
            id: true
          }
        });

        if (completedBookings.length === 0) return 0;

        const bookingIds = completedBookings.map((b) => b.id);

        await tx.booking.updateMany({
          where: {
            id: { in: bookingIds }
          },
          data: {
            status: BookingStatus.COMPLETED
          }
        });

        return bookingIds.length;
      });

      return { count };
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  syncAccountAvailability = async () => {
    try {
      const now = new Date();

      const reservedAccountIds = await prisma.booking.findMany({
        where: {
          status: BookingStatus.RESERVED,
          startAt: { lt: now },
          endAt: { gt: now }
        },
        distinct: ["accountId"],
        select: { accountId: true }
      });

      const activeAccountIds = reservedAccountIds.map((v) => v.accountId);

      // Mark reserved accounts as IN_USE (only if not already)
      const markedInUse =
        activeAccountIds.length > 0
          ? (
              await prisma.account.updateMany({
                where: {
                  id: { in: activeAccountIds },
                  availabilityStatus: { not: Status.IN_USE }
                },
                data: {
                  availabilityStatus: Status.IN_USE
                }
              })
            ).count
          : 0;

      // Mark accounts as AVAILABLE if they are IN_USE but no longer reserved
      const markedAvailable = (
        await prisma.account.updateMany({
          where: {
            availabilityStatus: Status.IN_USE,
            ...(activeAccountIds.length > 0 && {
              id: { notIn: activeAccountIds }
            })
          },
          data: {
            availabilityStatus: Status.AVAILABLE
          }
        })
      ).count;

      return { markedInUse, markedAvailable };
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  callbackFaspayPayment = async (data: CallbackNotificationRequest) => {
    try {
      let payment = await prisma.payment.findFirst({
        where: { providerPaymentId: data.providerPaymentId },
        include: { booking: true }
      });

      if (!payment || !payment.booking)
        throw new NotFoundError("Record not found!");

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
  };

  private getValidVoucherById = async (
    voucherId: number
  ): Promise<VoucherResponse> => {
    const voucher = await prisma.voucher.findFirst({
      where: { id: voucherId }
    });

    if (!voucher) throw new BadRequestError("Voucher not found!");

    if (!voucher.isValid) throw new BadRequestError("Voucher not valid!");

    return this.mapVoucherDataToVoucherResponse(voucher);
  };

  isPaymentFinal = (status: PaymentStatus): boolean => {
    return status !== PaymentStatus.PENDING;
  };

  private processPaymentProvider = async (
    booking: Booking,
    payment: Payment,
    paymentMethod: PaymentMethodType,
    bankCode?: BankCodes,
    bankAccountName?: string
  ): Promise<Payment> => {
    try {
      if (!booking.expiredAt) {
        throw new BadRequestError("Booking expiredAt is missing!");
      }

      if (paymentMethod === PaymentMethodType.QRIS) {
        const providerResponse = await this.faspayClient.createQrisPayment({
          bookingId: booking.id,
          paymentId: payment.id,
          amount: payment.value,
          expiredAt: booking.expiredAt
        });

        return await prisma.payment.update({
          where: { id: payment.id },
          data: {
            providerPaymentId: providerResponse.providerPaymentId,
            qrUrl: providerResponse.qrUrl
          }
        });
      }

      if (paymentMethod === PaymentMethodType.VIRTUAL_ACCOUNT) {
        if (!booking.customerId) {
          throw new BadRequestError(
            "Customer ID is required for Virtual Account payment!"
          );
        }
        if (!bankCode) {
          throw new BadRequestError(
            "Bank code is required for Virtual Account payment!"
          );
        }
        if (!bankAccountName) {
          throw new BadRequestError(
            "Bank account name is required for Virtual Account payment!"
          );
        }

        const providerResponse = await this.faspayClient.createVaPayment({
          bookingId: booking.id,
          paymentId: payment.id,
          customerId: booking.customerId,
          amount: payment.value,
          bankCode,
          bankAccountName,
          expiredAt: booking.expiredAt
        });

        return await prisma.payment.update({
          where: { id: payment.id },
          data: {
            providerPaymentId: providerResponse.providerPaymentId,
            bankCode,
            bankAccountNo: providerResponse.bankAccountNo,
            bankAccountName: providerResponse.bankAccountName
          }
        });
      }

      if (paymentMethod === PaymentMethodType.MANUAL) {
        return await prisma.payment.update({
          where: { id: payment.id },
          data: { status: PaymentStatus.SUCCESS }
        });
      }

      throw new BadRequestError("Payment method is not supported!");
    } catch (error) {
      console.error("Process payment to provider failed:", error);
      await prisma.booking.update({
        where: { id: payment.bookingId },
        data: {
          status: PaymentStatus.FAILED
        }
      });
      return await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.FAILED
        }
      });
    }
  };

  finalizeStatus = async (
    tx: Prisma.TransactionClient,
    payment: Payment,
    booking: Booking,
    paymentStatus: PaymentStatus,
    paidAt: Date | null,
    providerPaymentId?: string
  ): Promise<PaymentResponse> => {
    const paymentUpdate: Prisma.PaymentUpdateInput = {
      status: paymentStatus,
      paidAt: paidAt,
      ...(providerPaymentId && { providerPaymentId })
    };

    const bookingStatus = PAYMENT_TO_BOOKING_STATUS_MAP[paymentStatus];
    const actualStart =
      paymentStatus === PaymentStatus.SUCCESS && booking.immediate
        ? new Date()
        : undefined;
    const bookingUpdate: Prisma.BookingUpdateInput = {
      status: bookingStatus,
      expiredAt: null,
      version: { increment: 1 },
      ...(actualStart && {
        startAt: actualStart,
        endAt: addHours(
          actualStart,
          this.parseDurationToHours(booking.duration) * booking.quantity
        )
      })
    };

    const updatedPayment = await tx.payment.update({
      where: { id: payment.id },
      data: paymentUpdate
    });
    await tx.booking.update({ where: { id: booking.id }, data: bookingUpdate });

    if (paymentStatus === PaymentStatus.SUCCESS) {
      await tx.account.update({
        where: {
          id: booking.accountId
        },
        data: {
          totalRentHour: {
            increment:
              this.parseDurationToHours(booking.duration) * booking.quantity
          },
          rentHourUpdated: true
        }
      });
    }

    return this.mapPaymentDataToPaymentResponse(updatedPayment);
  };

  private mapBookingDataToBookingResponse = (
    booking: Booking & { payments?: Payment[] }
  ): BookingResponse => {
    return {
      id: booking.id,
      customerId: booking.customerId,
      accountId: booking.accountId,
      status: booking.status,
      duration: booking.duration,
      quantity: booking.quantity,
      startAt: booking.startAt,
      endAt: booking.endAt,
      expiredAt: booking.expiredAt,
      createdAt: booking.createdAt,
      mainValuePerUnit: booking.mainValuePerUnit,
      othersValuePerUnit: booking.othersValuePerUnit,
      voucherName: booking.voucherName,
      voucherType: booking.voucherType,
      voucherAmount: booking.voucherAmount,
      voucherMaxDiscount: booking.voucherMaxDiscount,
      mainValue: booking.mainValue,
      othersValue: booking.othersValue,
      discount: booking.discount,
      totalValue: booking.totalValue,
      active: null,
      payments: booking.payments
    };
  };

  private mapBookingWithAccountDataToBookingWithAccountResponse = (
    booking: Booking & {
      account: Account & {
        priceTier: PriceTier;
        thumbnail: ImageUpload | null;
      };
    },
    active?: boolean
  ): BookingResponse => {
    return {
      id: booking.id,
      customerId: booking.customerId,
      accountId: booking.accountId,
      status: booking.status,
      duration: booking.duration,
      quantity: booking.quantity,
      startAt: booking.startAt,
      endAt: booking.endAt,
      createdAt: booking.createdAt,
      expiredAt: booking.expiredAt,
      mainValuePerUnit: booking.mainValuePerUnit,
      othersValuePerUnit: booking.othersValuePerUnit,
      voucherName: booking.voucherName,
      voucherType: booking.voucherType,
      voucherAmount: booking.voucherAmount,
      voucherMaxDiscount: booking.voucherMaxDiscount,
      mainValue: booking.mainValue,
      othersValue: booking.othersValue,
      discount: booking.discount,
      totalValue: booking.totalValue,
      active: active ?? false,
      account: {
        accountRank: booking.account.accountRank,
        accountCode: booking.account.accountCode,
        priceTierCode: booking.account.priceTier.code,
        thumbnailImageUrl: booking.account.thumbnail?.imageUrl ?? "",
        username: active ? booking.account.username : undefined,
        password: active ? booking.account.password : undefined
      }
    };
  };

  private mapPaymentDataToPaymentResponse = (
    payment: Payment
  ): PaymentResponse => {
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
      bankCode: payment.bankCode,
      bankAccountNo: payment.bankAccountNo,
      bankAccountName: payment.bankAccountName,
      paidAt: payment.paidAt,
      refundedAt: payment.refundedAt
    };
  };

  private mapPaymentWithBookingDataToPaymentResponse = (
    payment: Payment & { booking: Booking | null }
  ): PaymentResponse => {
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
      bankCode: payment.bankCode,
      bankAccountNo: payment.bankAccountNo,
      bankAccountName: payment.bankAccountName,
      paidAt: payment.paidAt,
      refundedAt: payment.refundedAt,
      booking: payment.booking
    };
  };

  private mapVoucherDataToVoucherResponse = (
    voucher: Voucher
  ): VoucherResponse => {
    return {
      id: voucher.id,
      voucherName: voucher.voucherName,
      isValid: voucher.isValid,
      type: voucher.type,
      percentage: voucher.percentage,
      nominal: voucher.nominal,
      maxDiscount: voucher.maxDiscount
    };
  };
}
