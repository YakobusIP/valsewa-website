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
import { addHours, addMinutes, parseDurationToHours } from "../lib/utils";
import { subDays } from "date-fns";
import { prisma } from "../lib/prisma";
import {
  BankCodes,
  BookingResponse,
  CallbackNotificationRequest,
  CreateAdminBookingRequest,
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

  private parseBookingNumber = (input: string): bigint | undefined => {
    const re = new RegExp(`^VS-(\\d{7})$`);
    const match = input.trim().toUpperCase().match(re);

    if (!match) return undefined;

    const numeric = match[1].replace(/^0+/, "") || "0";

    return BigInt(numeric);
  };

  getAllBookings = async (
    page?: number,
    limit?: number,
    query?: string,
    datePreset?: string,
    dateFrom?: Date,
    dateTo?: Date
  ): Promise<[BookingResponse[], Metadata]> => {
    try {
      const trimmed = (query ?? "").trim();
      const parsedId = this.parseBookingNumber(trimmed);

      const whereCriteria: Prisma.BookingWhereInput = {};

      // Add readableNumber filter if query is provided
      if (parsedId !== undefined) {
        whereCriteria.readableNumber = parsedId;
      }

      // Handle date filtering
      if (datePreset) {
        const now = new Date();
        const from = new Date();
        if (datePreset === "1D") from.setDate(now.getDate() - 1);
        if (datePreset === "7D") from.setDate(now.getDate() - 7);
        if (datePreset === "30D") from.setDate(now.getDate() - 30);

        whereCriteria.createdAt = {
          gte: from,
          lte: now
        };
      } else if (dateFrom && dateTo) {
        const to = new Date(dateTo);
        to.setHours(23, 59, 59, 999);

        whereCriteria.createdAt = {
          gte: dateFrom,
          lte: to
        };
      } else if (dateFrom) {
        whereCriteria.createdAt = {
          gte: dateFrom
        };
      } else if (dateTo) {
        const to = new Date(dateTo);
        to.setHours(23, 59, 59, 999);
        whereCriteria.createdAt = {
          lte: to
        };
      }

      let data: Booking[];
      let metadata: Metadata;

      if (page !== undefined && limit !== undefined) {
        const skip = (page - 1) * limit;

        data = await prisma.booking.findMany({
          where: whereCriteria,
          take: limit,
          skip: skip,
          orderBy: {
            createdAt: "desc"
          },
          include: {
            payments: true,
            customer: {
              select: {
                username: true
              }
            },
            account: {
              select: {
                accountCode: true,
                accountRank: true
              }
            }
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
          orderBy: {
            createdAt: "desc"
          },
          include: {
            payments: true,
            customer: {
              select: {
                username: true
              }
            },
            account: {
              select: {
                accountCode: true,
                accountRank: true
              }
            }
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

  getBookingById = async (
    bookingId: string,
    customerId?: number
  ): Promise<BookingResponse> => {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId, customerId },
        include: {
          account: {
            include: {
              priceTier: true,
              thumbnail: true
            }
          },
          payments: true
        }
      });

      if (!booking) {
        throw new NotFoundError(`Booking not found.`);
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
    customerId: number,
    page: number = 1,
    limit: number = 5
  ): Promise<{
    bookings: BookingResponse[];
    total: number;
    page: number;
    totalPages: number;
  }> => {
    try {
      const skip = (page - 1) * limit;

      const total = await prisma.booking.count({
        where: { customerId: customerId }
      });

      const now = new Date();

      const activeBookings = await prisma.booking.findMany({
        where: {
          customerId,
          status: "RESERVED",
          startAt: { lte: now },
          endAt: { gte: now }
        },
        include: {
          account: true,
          payments: true
        },
        orderBy: { startAt: "desc" }
      });

      const otherBookings = await prisma.booking.findMany({
        where: {
          customerId,
          NOT: {
            status: "RESERVED",
            startAt: { lte: now },
            endAt: { gte: now }
          }
        },
        include: {
          account: true,
          payments: true
        },
        orderBy: { startAt: "desc" }
      });

      const bookings = [...activeBookings, ...otherBookings];

      const paginatedBookings = bookings.slice(skip, skip + limit);

      const totalPages = Math.ceil(total / limit);

      return {
        bookings: paginatedBookings.map(this.mapBookingDataToBookingResponse),
        total,
        page,
        totalPages
      };
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

  getPaymentById = async (
    paymentId: string,
    customerId?: number
  ): Promise<PaymentResponse> => {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: {
          booking: true
        }
      });

      if (!payment || payment.booking?.customerId != customerId) {
        throw new NotFoundError(`Payment not found.`);
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
    const othersValue = isLowRank ? (lowPrice - normalPrice) * quantity : 0;

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
    if (subtotalValue !== 0) {
      switch (paymentMethod) {
        case PaymentMethodType.QRIS:
          adminFee = Math.ceil(0.00705 * subtotalValue);
          break;

        case PaymentMethodType.VIRTUAL_ACCOUNT:
          adminFee = 4000;
          break;

        default:
          adminFee = 0;
      }
    }

    const totalValue = subtotalValue + adminFee;

    const durationInHours = parseDurationToHours(duration);

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

      const [
        customer,
        ongoingHoldBooking,
        reservedBookingCount,
        account,
        priceList,
        voucher
      ] = await Promise.all([
        // customer
        customerId
          ? prisma.customer.findUnique({
              where: { id: customerId },
              select: { id: true }
            })
          : Promise.resolve(null),
        // ongoing hold booking
        customerId
          ? prisma.booking.findFirst({
              where: {
                customerId,
                status: BookingStatus.HOLD
              },
              select: { id: true }
            })
          : Promise.resolve(null),
        // reserved booking
        customerId
          ? prisma.booking.count({
              where: {
                customerId,
                status: BookingStatus.RESERVED
              }
            })
          : Promise.resolve(0),
        // account
        prisma.account.findUnique({
          where: {
            id: accountId,
            availabilityStatus: { not: Status.NOT_AVAILABLE }
          },
          select: {
            id: true,
            isLowRank: true
          }
        }),
        // price list
        prisma.priceList.findUnique({
          where: { id: priceListId },
          select: {
            id: true,
            normalPrice: true,
            lowPrice: true,
            duration: true
          }
        }),
        // voucher
        voucherId ? this.getValidVoucherById(voucherId) : Promise.resolve(null)
      ]);

      if (customerId && !customer) {
        throw new NotFoundError("Customer not found.");
      }

      if (ongoingHoldBooking) {
        throw new PrismaUniqueError("Customer has ongoing hold booking.");
      }

      if (reservedBookingCount >= 2) {
        throw new PrismaUniqueError(
          "Customer already has 2 reserved bookings."
        );
      }

      if (!account) {
        throw new NotFoundError("Account not found or not available.");
      }

      if (!priceList) {
        throw new NotFoundError("Price list not found.");
      }

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
          },
          select: { id: true }
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
            othersValuePerUnit: account.isLowRank
              ? priceList.lowPrice - priceList.normalPrice
              : 0,
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

  createAdminBooking = async (
    data: CreateAdminBookingRequest
  ): Promise<BookingResponse> => {
    try {
      const { accountId, startAt, duration, totalValue } = data;

      const account = await prisma.account.findUnique({
        where: {
          id: accountId,
          availabilityStatus: { not: Status.NOT_AVAILABLE }
        }
      });
      if (!account)
        throw new NotFoundError("Account not found or not available!");

      const durationInHours = parseDurationToHours(duration);

      const endAt = addHours(startAt, durationInHours);

      const booking = await prisma.$transaction(async (tx) => {
        // Prevent race condition
        await tx.$executeRaw`SELECT id FROM "Account" WHERE id = ${accountId} FOR UPDATE`;

        const overlapping = await tx.booking.findFirst({
          where: {
            accountId,
            AND: [
              { status: { in: [BookingStatus.HOLD, BookingStatus.RESERVED] } },
              { startAt: { lt: endAt } },
              { endAt: { gt: startAt } }
            ]
          },
          select: { id: true }
        });

        if (overlapping) {
          throw new PrismaUniqueError(
            "Account not available for the requested time."
          );
        }

        return await tx.booking.create({
          data: {
            accountId: account.id,
            status: BookingStatus.RESERVED,
            duration: duration,
            quantity: 1,
            immediate: false,
            startAt: startAt,
            endAt: endAt,
            mainValuePerUnit: totalValue,
            mainValue: totalValue,
            totalValue: totalValue
          }
        });
      });

      return this.mapBookingDataToBookingResponse(booking);
    } catch (error) {
      if (error instanceof PrismaUniqueError) throw error;
      if (error instanceof NotFoundError) throw error;
      if (error instanceof BadRequestError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  overrideBooking = async (
    data: OverrideBookingRequest
  ): Promise<BookingResponse> => {
    try {
      const { bookingId, accountId } = data;

      return await prisma.$transaction(async (tx) => {
        const booking = await tx.booking.findUnique({
          where: { id: bookingId, status: BookingStatus.RESERVED }
        });
        if (!booking) throw new NotFoundError("Booking not found");

        const originalAccount = await tx.account.findUnique({
          where: {
            id: booking.accountId
          }
        });
        if (!originalAccount)
          throw new NotFoundError("Original account not found!");

        const account = await tx.account.findUnique({
          where: {
            id: accountId,
            availabilityStatus: { not: Status.NOT_AVAILABLE }
          }
        });
        if (!account)
          throw new NotFoundError("Account not found or not available!");

        if (booking.accountId === accountId)
          return this.mapBookingDataToBookingResponse(booking);

        const updatedBooking = await tx.booking.update({
          where: { id: booking.id },
          data: {
            accountId,
            version: { increment: 1 }
          }
        });

        await tx.accountResetLog.create({
          data: {
            accountId: originalAccount.id
          }
        });

        return this.mapBookingDataToBookingResponse(updatedBooking);
      });
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  payBooking = async (data: PayBookingRequest): Promise<PaymentResponse> => {
    try {
      const { bookingId, customerId, voucherId, provider, paymentMethod } =
        data;

      const booking = await prisma.booking.findUnique({
        where: { id: bookingId, customerId },
        include: {
          customer: true,
          account: true
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
        booking.account.isLowRank,
        booking.duration,
        voucher,
        paymentMethodType,
        booking.quantity
      );

      const isBookingFree = totalValue === 0;

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
              version: { increment: 1 },
              ...(isBookingFree && {
                status: BookingStatus.RESERVED,
                expiredAt: null
              })
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

          if (isBookingFree) {
            payment = await tx.payment.create({
              data: {
                bookingId: booking.id,
                status: PaymentStatus.SUCCESS,
                value: updatedBooking.totalValue,
                currency: "IDR",
                provider: provider,
                paymentMethod: paymentMethodType,
                bankCode: bankCode?.toString(),
                paidAt: new Date()
              }
            });
            await this.finalizeStatus(
              tx,
              payment,
              updatedBooking,
              PaymentStatus.SUCCESS,
              new Date()
            );
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

  cancelBooking = async (
    bookingId: string,
    customerId: number
  ): Promise<BookingResponse> => {
    try {
      let booking = await prisma.booking.findUnique({
        where: { id: bookingId, customerId }
      });

      if (!booking) throw new NotFoundError("Booking not found!");

      if (booking.status === BookingStatus.HOLD) {
        booking = await prisma.booking.update({
          where: { id: booking.id },
          data: { status: BookingStatus.CANCELLED }
        });

        await prisma.payment.updateMany({
          where: { bookingId, status: PaymentStatus.PENDING },
          data: { status: PaymentStatus.CANCELLED }
        });
      }

      return this.mapBookingDataToBookingResponse(booking);
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  verifyPayment = async (
    paymentId: string,
    customerId: number
  ): Promise<PaymentResponse> => {
    try {
      let payment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: { booking: true }
      });

      if (
        !payment ||
        !payment.booking ||
        payment.booking.customerId !== customerId
      )
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
        const expired = await tx.booking.updateMany({
          where: {
            status: BookingStatus.HOLD,
            expiredAt: { lte: nowWithGrace }
          },
          data: {
            status: BookingStatus.EXPIRED
          }
        });

        if (expired.count === 0) return 0;

        await tx.payment.updateMany({
          where: {
            status: PaymentStatus.PENDING,
            booking: {
              status: BookingStatus.EXPIRED
            }
          },
          data: {
            status: PaymentStatus.EXPIRED
          }
        });

        return expired.count;
      });

      return { count };
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  syncCompletedBookings = async () => {
    try {
      const count = await prisma.$transaction(async (tx) => {
        const now = new Date();
        const completedBookings = await tx.booking.findMany({
          where: {
            status: BookingStatus.RESERVED,
            endAt: { lte: now }
          },
          select: {
            id: true,
            accountId: true,
            endAt: true,
            duration: true,
            quantity: true
          }
        });

        await tx.accountResetLog.deleteMany({
          where: { resetAt: { lt: subDays(now, 2) } }
        });

        if (completedBookings.length === 0) return 0;

        const bookingIds = completedBookings.map((b) => b.id);
        const accountIds = completedBookings.map((b) => b.accountId);

        await tx.booking.updateMany({
          where: {
            id: { in: bookingIds }
          },
          data: {
            status: BookingStatus.COMPLETED
          }
        });

        await tx.account.updateMany({
          where: {
            id: { in: accountIds }
          },
          data: {
            passwordResetRequired: true
          }
        });

        await tx.accountResetLog.createMany({
          data: completedBookings.map((booking) => ({
            accountId: booking.accountId,
            previousExpireAt: booking.endAt ?? null
          }))
        });

        const rentHourByAccount = new Map<number, number>();
        for (const booking of completedBookings) {
          const durationHours = parseDurationToHours(booking.duration);
          const incrementHours = Math.round(durationHours) * booking.quantity;
          if (incrementHours <= 0) continue;

          rentHourByAccount.set(
            booking.accountId,
            (rentHourByAccount.get(booking.accountId) || 0) + incrementHours
          );
        }

        await Promise.all(
          Array.from(rentHourByAccount.entries()).map(([accountId, hours]) =>
            tx.account.update({
              where: { id: accountId },
              data: {
                totalRentHour: { increment: hours }
              }
            })
          )
        );

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

      return await prisma.$transaction(async (tx) => {
        const reservedAccountIds = await tx.booking.findMany({
          where: {
            status: BookingStatus.RESERVED,
            startAt: { lt: now },
            endAt: { gt: now }
          },
          distinct: ["accountId"],
          select: { accountId: true }
        });

        const activeAccountIds = reservedAccountIds.map((v) => v.accountId);

        // Find accounts that are transitioning to IN_USE (were not IN_USE, now have active booking)
        // These accounts need their existing reset logs deleted since a new booking started
        const accountsTransitioningToInUse =
          activeAccountIds.length > 0
            ? await tx.account.findMany({
                where: {
                  id: { in: activeAccountIds },
                  availabilityStatus: { not: Status.IN_USE },
                  currentBookingDate: null
                },
                select: { id: true }
              })
            : [];

        const transitioningAccountIds = accountsTransitioningToInUse.map(
          (a) => a.id
        );

        // Delete existing reset logs for accounts that are getting a new booking
        // This prevents duplicate reset logs when the new booking ends
        if (transitioningAccountIds.length > 0) {
          await tx.accountResetLog.deleteMany({
            where: {
              accountId: { in: transitioningAccountIds }
            }
          });
        }

        // Mark reserved accounts as IN_USE (only if not already)
        // Skip accounts with currentBookingDate set (they have an active booking)
        const markedInUse =
          activeAccountIds.length > 0
            ? (
                await tx.account.updateMany({
                  where: {
                    id: { in: activeAccountIds },
                    availabilityStatus: { not: Status.IN_USE },
                    currentBookingDate: null
                  },
                  data: {
                    availabilityStatus: Status.IN_USE
                  }
                })
              ).count
            : 0;

        // Mark accounts as AVAILABLE if they are IN_USE but no longer reserved
        // Skip accounts with currentBookingDate set (they have an active booking)
        const markedAvailable = (
          await tx.account.updateMany({
            where: {
              availabilityStatus: Status.IN_USE,
              currentBookingDate: null,
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
      });
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  forceFinishBooking = async (accountId: number) => {
    try {
      const now = new Date();

      // Find the active RESERVED booking for this account
      const activeBooking = await prisma.booking.findFirst({
        where: {
          accountId,
          status: BookingStatus.RESERVED,
          startAt: { lte: now },
          endAt: { gt: now }
        }
      });

      if (!activeBooking) {
        throw new NotFoundError("No active booking found for this account.");
      }

      // Set endAt to now() - the cron jobs will handle the rest:
      // - syncCompletedBookings will mark it COMPLETED and set passwordResetRequired
      // - syncAccountAvailability will mark the account as AVAILABLE
      const updatedBooking = await prisma.booking.update({
        where: { id: activeBooking.id },
        data: {
          endAt: now,
          version: { increment: 1 }
        }
      });

      return this.mapBookingDataToBookingResponse(updatedBooking);
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  callbackFaspayPayment = async (data: CallbackNotificationRequest) => {
    try {
      const { billNo, paymentStatus, paidAt } = data;

      let payment = await prisma.payment.findFirst({
        where: {
          OR: [{ id: billNo }, { bankAccountNo: billNo }],
          status: PaymentStatus.PENDING
        },
        include: { booking: true }
      });

      // If payment is not found/pending, we simply ignore
      if (!payment || !payment.booking) return;

      if (this.isPaymentFinal(paymentStatus)) {
        return await prisma.$transaction(async (tx) => {
          return await this.finalizeStatus(
            tx,
            payment,
            payment.booking!,
            paymentStatus,
            paidAt
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
      ...(paidAt && { paidAt }),
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
          parseDurationToHours(booking.duration) * booking.quantity
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
            increment: parseDurationToHours(booking.duration) * booking.quantity
          },
          rentHourUpdated: true
        }
      });
    }

    return this.mapPaymentDataToPaymentResponse(updatedPayment);
  };

  private mapBookingDataToBookingResponse = (
    booking: Booking & {
      payments?: Payment[];
      customer?: { username: string };
      account?: {
        accountRank: string;
        accountCode: string;
        priceTierId?: number;
        thumbnailId?: number | null;
        nickname?: string;
        username?: string;
        password?: string;
      };
    }
  ): BookingResponse => {
    let status = booking.status;
    if (
      status === BookingStatus.HOLD &&
      booking.expiredAt &&
      booking.expiredAt < new Date()
    ) {
      status = BookingStatus.EXPIRED;
    }

    return {
      id: booking.id,
      readableNumber: booking.readableNumber.toString(),
      customerId: booking.customerId,
      accountId: booking.accountId,
      status,
      adminFee: booking.adminFee,
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
      payments: booking.payments,
      customer: booking.customer,
      account: booking.account
        ? {
            accountRank: booking.account.accountRank,
            accountCode: booking.account.accountCode,
            priceTierCode: booking.account.priceTierId?.toString() ?? "",
            thumbnailImageUrl: booking.account.thumbnailId?.toString() ?? "",
            nickname: booking.account.nickname ?? "",
            username: booking.account.username,
            password: booking.account.password
          }
        : undefined
    };
  };

  private mapBookingWithAccountDataToBookingWithAccountResponse = (
    booking: Booking & {
      account: Account & {
        priceTier: PriceTier;
        thumbnail: ImageUpload | null;
      };
      payments?: Payment[];
    },
    active?: boolean
  ): BookingResponse => {
    let status = booking.status;
    if (
      status === BookingStatus.HOLD &&
      booking.expiredAt &&
      booking.expiredAt < new Date()
    ) {
      status = BookingStatus.EXPIRED;
    }

    return {
      id: booking.id,
      readableNumber: booking.readableNumber.toString(),
      customerId: booking.customerId,
      accountId: booking.accountId,
      status,
      adminFee: booking.adminFee,
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
        nickname: booking.account.nickname ?? "",
        username: active ? booking.account.username : undefined,
        password: active ? booking.account.password : undefined
      },
      payments: booking.payments
    };
  };

  private mapPaymentDataToPaymentResponse = (
    payment: Payment
  ): PaymentResponse => {
    return {
      id: payment.id,
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
    let status = payment.status;
    if (
      status === PaymentStatus.PENDING &&
      payment.booking?.expiredAt &&
      payment.booking?.expiredAt < new Date()
    ) {
      status = PaymentStatus.EXPIRED;
    }

    return {
      id: payment.id,
      bookingId: payment.bookingId,
      status,
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
      booking: {
        ...payment.booking,
        readableNumber: payment.booking?.readableNumber.toString()
      }
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
