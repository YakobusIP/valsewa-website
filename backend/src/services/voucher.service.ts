import {
  Booking,
  BookingStatus,
  PaymentStatus,
  Prisma,
  Type,
  Voucher
} from "@prisma/client";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError
} from "../lib/error";
import { prisma } from "../lib/prisma";
import { Metadata } from "../types/metadata.type";
import { getContextLogger } from "../lib/request-context";

export const VOUCHER_ERROR = {
  NOT_FOUND: "Voucher not found",
  INACTIVE: "This voucher is currently inactive",
  NOT_STARTED: "This voucher is not active yet",
  EXPIRED: "This voucher has expired",
  DELETED: "This voucher is no longer available",
  MIN_ORDER_NOT_MET: "Minimum order value not met for this voucher",
  GLOBAL_QUOTA_EXCEEDED: "This voucher has reached its usage limit",
  USER_QUOTA_EXCEEDED: "You have already used this voucher",
  VOUCHER_LOCKED: "Voucher cannot be changed for this booking"
} as const;

const voucherLogger = () => getContextLogger({ component: "voucher" });

const quotaReleaseStatuses: BookingStatus[] = [
  BookingStatus.EXPIRED,
  BookingStatus.CANCELLED,
  BookingStatus.FAILED
];

const notDeletedWhere: Prisma.VoucherWhereInput = {
  deletedAt: null
};

const activeConsumingStatuses: BookingStatus[] = [
  BookingStatus.HOLD,
  BookingStatus.RESERVED,
  BookingStatus.COMPLETED
];

const paidUsageStatuses: BookingStatus[] = [
  BookingStatus.RESERVED,
  BookingStatus.COMPLETED
];

export type VoucherUsageSummary = {
  totalUsage: number;
  totalGmv: number;
  totalDiscountGiven: number;
  maxGlobalUsage: number | null;
};

export type VoucherUsageBookingRow = {
  id: string;
  readableNumber: string;
  status: BookingStatus;
  customerUsername: string | null;
  orderValue: number;
  discount: number;
  totalPaid: number;
  createdAt: Date;
};

export class VoucherService {
  private async getVoucherOrThrow(id: number) {
    const voucher = await prisma.voucher.findFirst({
      where: { id, ...notDeletedWhere }
    });

    if (!voucher) throw new NotFoundError("Voucher not found");
    return voucher;
  }

  getAll = async (
    page?: number,
    limit?: number,
    query?: string
  ): Promise<[any[], Metadata]> => {
    try {
      const whereCriteria: Prisma.VoucherWhereInput = {
        ...notDeletedWhere,
        ...(query
          ? {
              OR: [
                {
                  voucherCode: {
                    contains: query,
                    mode: "insensitive"
                  }
                },
                {
                  voucherName: {
                    contains: query,
                    mode: "insensitive"
                  }
                }
              ]
            }
          : {})
      };

      let data;
      let metadata: Metadata;

      if (page && limit) {
        const skip = (page - 1) * limit;

        data = await prisma.voucher.findMany({
          where: whereCriteria,
          take: limit,
          skip,
          orderBy: { createdAt: "desc" }
        });

        const itemCount = await prisma.voucher.count({
          where: whereCriteria
        });

        metadata = {
          page,
          limit,
          pageCount: Math.ceil(itemCount / limit),
          total: itemCount
        };
      } else {
        data = await prisma.voucher.findMany({
          where: whereCriteria,
          orderBy: { createdAt: "desc" }
        });

        metadata = { page: 0, limit: 0, pageCount: 0, total: 0 };
      }

      return [data, metadata];
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  findById = async (id: number) => {
    try {
      return await this.getVoucherOrThrow(id);
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  getActiveVouchers = async () => {
    try {
      const now = new Date();
      const vouchers = await prisma.voucher.findMany({
        where: {
          ...notDeletedWhere,
          isValid: true,
          isVisible: true,
          dateStart: { lte: now },
          dateEnd: { gte: now }
        }
      });

      return vouchers;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  getActiveVoucherByVoucherCode = async (voucherCode: string) => {
    try {
      const now = new Date();
      const voucher = await prisma.voucher.findFirst({
        where: {
          voucherCode,
          ...notDeletedWhere,
          isValid: true,
          isVisible: true,
          dateStart: { lte: now },
          dateEnd: { gte: now }
        }
      });

      if (!voucher) throw new NotFoundError("Voucher not found");

      return voucher;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  create = async (data: {
    voucherCode: string;
    voucherName: string;
    type: Type;
    percentage?: number;
    nominal?: number;
    maxDiscount?: number;
    minOrderValue?: number | null;
    maxGlobalUsage?: number | null;
    maxUsagePerUser?: number | null;
    dateStart: Date;
    dateEnd: Date;
  }) => {
    try {
      if (!data.voucherCode?.trim()) {
        throw new BadRequestError("Voucher code is required");
      }

      if (!data.voucherName?.trim()) {
        throw new BadRequestError("Voucher name is required");
      }

      const exists = await prisma.voucher.findUnique({
        where: { voucherCode: data.voucherCode }
      });

      if (exists) throw new BadRequestError("Voucher code already exists");

      this.validateTypeFields(data.type, data.percentage, data.nominal);
      this.validateBudgetFields(data);
      this.validateDateRange(data.dateStart, data.dateEnd);

      return await prisma.voucher.create({
        data: {
          voucherCode: data.voucherCode,
          voucherName: data.voucherName,
          type: data.type,
          percentage: data.type === "PERSENTASE" ? data.percentage : null,
          nominal: data.type === "NOMINAL" ? data.nominal : null,
          maxDiscount: data.type === "PERSENTASE" ? data.maxDiscount : null,
          minOrderValue: data.minOrderValue ?? null,
          maxGlobalUsage: data.maxGlobalUsage ?? null,
          maxUsagePerUser: data.maxUsagePerUser ?? null,
          dateStart: data.dateStart,
          dateEnd: data.dateEnd,
          isValid: true
        }
      });
    } catch (error) {
      if (error instanceof BadRequestError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  update = async (
    id: number,
    data: {
      minOrderValue?: number | null;
      maxGlobalUsage?: number | null;
      maxUsagePerUser?: number | null;
      dateEnd?: Date;
    }
  ) => {
    try {
      const voucher = await this.getVoucherOrThrow(id);

      if (await VoucherService.hasActiveHoldBookingsForVoucherId(voucher.id)) {
        throw new BadRequestError(
          "Cannot edit voucher while active HOLD bookings are using it"
        );
      }

      if (
        data.maxGlobalUsage != null &&
        data.maxGlobalUsage < voucher.usageCount
      ) {
        throw new BadRequestError(
          "Max global usage cannot be lower than current usage count"
        );
      }

      this.validateBudgetFields({
        minOrderValue: data.minOrderValue ?? voucher.minOrderValue,
        maxGlobalUsage: data.maxGlobalUsage ?? voucher.maxGlobalUsage,
        maxUsagePerUser: data.maxUsagePerUser ?? voucher.maxUsagePerUser
      });

      const dateEnd = data.dateEnd ?? voucher.dateEnd;
      this.validateEditableEndDate(voucher.dateStart, dateEnd);

      return await prisma.voucher.update({
        where: { id },
        data: {
          ...(data.minOrderValue !== undefined && {
            minOrderValue: data.minOrderValue
          }),
          ...(data.maxGlobalUsage !== undefined && {
            maxGlobalUsage: data.maxGlobalUsage
          }),
          ...(data.maxUsagePerUser !== undefined && {
            maxUsagePerUser: data.maxUsagePerUser
          }),
          ...(data.dateEnd !== undefined && { dateEnd: data.dateEnd })
        }
      });
    } catch (error) {
      if (error instanceof BadRequestError) throw error;
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  getUsageSummary = async (id: number): Promise<VoucherUsageSummary> => {
    try {
      const voucher = await this.getVoucherOrThrow(id);

      const paidBookings = await prisma.booking.findMany({
        where: {
          voucherId: voucher.id,
          status: { in: paidUsageStatuses },
          payments: {
            some: { status: PaymentStatus.SUCCESS }
          }
        },
        select: {
          mainValue: true,
          othersValue: true,
          discount: true
        }
      });

      const totalGmv = paidBookings.reduce(
        (sum, booking) =>
          sum + booking.mainValue + (booking.othersValue ?? 0),
        0
      );
      const totalDiscountGiven = paidBookings.reduce(
        (sum, booking) => sum + (booking.discount ?? 0),
        0
      );

      return {
        totalUsage: voucher.usageCount,
        totalGmv,
        totalDiscountGiven,
        maxGlobalUsage: voucher.maxGlobalUsage
      };
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  getUsageBookings = async (
    id: number,
    page = 1,
    limit = 20
  ): Promise<[VoucherUsageBookingRow[], Metadata]> => {
    try {
      const voucher = await this.getVoucherOrThrow(id);
      const skip = (page - 1) * limit;

      const where: Prisma.BookingWhereInput = {
        voucherId: voucher.id,
        status: { in: activeConsumingStatuses }
      };

      const [bookings, total] = await Promise.all([
        prisma.booking.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
          include: {
            customer: {
              select: { username: true }
            }
          }
        }),
        prisma.booking.count({ where })
      ]);

      const data: VoucherUsageBookingRow[] = bookings.map((booking) => ({
        id: booking.id,
        readableNumber: booking.readableNumber.toString(),
        status: booking.status,
        customerUsername: booking.customer?.username ?? null,
        orderValue: booking.mainValue + (booking.othersValue ?? 0),
        discount: booking.discount ?? 0,
        totalPaid: booking.totalValue,
        createdAt: booking.createdAt
      }));

      return [
        data,
        {
          page,
          limit,
          pageCount: Math.ceil(total / limit),
          total
        }
      ];
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  private validateTypeFields(
    type: Type,
    percentage?: number | null,
    nominal?: number | null
  ) {
    if (type === "PERSENTASE") {
      if (percentage == null || !Number.isFinite(percentage) || percentage <= 0) {
        throw new BadRequestError("Percentage is required");
      }
    }

    if (type === "NOMINAL") {
      if (nominal == null || !Number.isFinite(nominal) || nominal <= 0) {
        throw new BadRequestError("Nominal is required");
      }
    }
  }

  private validateDateRange(dateStart: Date, dateEnd: Date) {
    if (
      Number.isNaN(dateStart.getTime()) ||
      Number.isNaN(dateEnd.getTime())
    ) {
      throw new BadRequestError("Invalid date range");
    }

    if (dateStart >= dateEnd) {
      throw new BadRequestError("Start date must be before end date");
    }
  }

  private validateEditableEndDate(
    dateStart: Date,
    dateEnd: Date,
    now: Date = new Date()
  ) {
    if (Number.isNaN(dateEnd.getTime())) {
      throw new BadRequestError("Invalid end date");
    }

    if (dateEnd < now) {
      throw new BadRequestError("End date cannot be in the past");
    }

    if (dateStart >= dateEnd) {
      throw new BadRequestError("End date must be after the start date");
    }
  }

  private validateBudgetFields(data: {
    minOrderValue?: number | null;
    maxGlobalUsage?: number | null;
    maxUsagePerUser?: number | null;
  }) {
    if (data.minOrderValue != null) {
      if (!Number.isFinite(data.minOrderValue)) {
        throw new BadRequestError("Minimum order value must be a valid number");
      }
      if (data.minOrderValue <= 0) {
        throw new BadRequestError("Minimum order value must be greater than 0");
      }
    }

    if (data.maxGlobalUsage != null) {
      if (!Number.isInteger(data.maxGlobalUsage)) {
        throw new BadRequestError("Max global usage must be a whole number");
      }
      if (data.maxGlobalUsage < 1) {
        throw new BadRequestError("Max global usage must be at least 1");
      }
    }

    if (data.maxUsagePerUser != null) {
      if (!Number.isInteger(data.maxUsagePerUser)) {
        throw new BadRequestError("Max usage per user must be a whole number");
      }
      if (data.maxUsagePerUser < 1) {
        throw new BadRequestError("Max usage per user must be at least 1");
      }
    }
  }

  toggleStatus = async (id: number) => {
    try {
      const voucher = await this.getVoucherOrThrow(id);

      return await prisma.voucher.update({
        where: { id },
        data: { isValid: !voucher.isValid }
      });
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  toggleVisibility = async (id: number) => {
    try {
      const voucher = await this.getVoucherOrThrow(id);

      return await prisma.voucher.update({
        where: { id },
        data: { isVisible: !voucher.isVisible }
      });
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  remove = async (id: number) => {
    try {
      const voucher = await this.getVoucherOrThrow(id);

      if (await VoucherService.hasActiveHoldBookingsForVoucherId(voucher.id)) {
        throw new BadRequestError(
          "Cannot delete voucher while active HOLD bookings are using it"
        );
      }

      await prisma.voucher.update({
        where: { id },
        data: {
          deletedAt: new Date(),
          isValid: false,
          isVisible: false
        }
      });
    } catch (error) {
      if (error instanceof BadRequestError) throw error;
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  toggleVoucherValidity = async (id: number, isValid: boolean) => {
    try {
      await this.getVoucherOrThrow(id);

      return await prisma.voucher.update({
        where: { id },
        data: { isValid }
      });
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  checkVoucherExpiration = async () => {
    try {
      const today = new Date();

      const expiredVouchers = await prisma.voucher.findMany({
        where: {
          ...notDeletedWhere,
          isValid: true,
          dateEnd: {
            lt: today
          }
        }
      });

      voucherLogger().info(
        {
          event: "voucher_expiration_check_completed",
          expiredCount: expiredVouchers.length
        },
        "Voucher expiration check completed"
      );

      const updatePromises = expiredVouchers.map((voucher) => {
        voucherLogger().debug(
          {
            event: "voucher_deactivated_expired",
            voucherId: voucher.id
          },
          "Deactivating expired voucher"
        );
        return this.toggleVoucherValidity(voucher.id, false);
      });

      await Promise.all(updatePromises);

      return { count: expiredVouchers.length };
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  static async getPublicVoucherById(voucherId: number): Promise<Voucher> {
    const voucher = await prisma.voucher.findFirst({
      where: { id: voucherId, deletedAt: null }
    });

    const now = new Date();
    if (
      !voucher ||
      !voucher.isValid ||
      !voucher.isVisible ||
      now < voucher.dateStart ||
      now > voucher.dateEnd
    ) {
      throw new BadRequestError(VOUCHER_ERROR.NOT_FOUND);
    }

    return voucher;
  }

  static assertVoucherUsable(
    voucher: Voucher,
    grossOrderValue: number,
    now: Date = new Date()
  ): void {
    if (voucher.deletedAt) {
      throw new BadRequestError(VOUCHER_ERROR.DELETED);
    }

    if (!voucher.isValid) {
      throw new BadRequestError(VOUCHER_ERROR.INACTIVE);
    }

    if (now < voucher.dateStart) {
      throw new BadRequestError(VOUCHER_ERROR.NOT_STARTED);
    }

    if (now > voucher.dateEnd) {
      throw new BadRequestError(VOUCHER_ERROR.EXPIRED);
    }

    if (
      voucher.minOrderValue != null &&
      grossOrderValue < voucher.minOrderValue
    ) {
      throw new BadRequestError(VOUCHER_ERROR.MIN_ORDER_NOT_MET);
    }
  }

  static async reserveVoucherQuota(
    tx: Prisma.TransactionClient,
    voucher: Voucher,
    customerId: number | null | undefined
  ): Promise<void> {
    await tx.$executeRaw`
      SELECT id FROM "Voucher" WHERE id = ${voucher.id} FOR UPDATE
    `;

    const current = await tx.voucher.findUnique({
      where: { id: voucher.id }
    });

    if (!current || current.deletedAt) {
      throw new BadRequestError(VOUCHER_ERROR.DELETED);
    }

    if (
      current.maxGlobalUsage != null &&
      current.usageCount >= current.maxGlobalUsage
    ) {
      throw new BadRequestError(VOUCHER_ERROR.GLOBAL_QUOTA_EXCEEDED);
    }

    if (customerId != null && current.maxUsagePerUser != null) {
      const userUsage = await tx.voucherUserUsage.findUnique({
        where: {
          voucherId_customerId: {
            voucherId: current.id,
            customerId
          }
        }
      });

      if (userUsage && userUsage.usageCount >= current.maxUsagePerUser) {
        throw new BadRequestError(VOUCHER_ERROR.USER_QUOTA_EXCEEDED);
      }
    }

    await tx.voucher.update({
      where: { id: current.id },
      data: { usageCount: { increment: 1 } }
    });

    if (customerId != null) {
      await tx.voucherUserUsage.upsert({
        where: {
          voucherId_customerId: {
            voucherId: current.id,
            customerId
          }
        },
        create: {
          voucherId: current.id,
          customerId,
          usageCount: 1
        },
        update: {
          usageCount: { increment: 1 }
        }
      });
    }
  }

  static async releaseVoucherQuotaIfReserved(
    tx: Prisma.TransactionClient,
    booking: Pick<
      Booking,
      "id" | "voucherId" | "customerId" | "quotaReserved" | "status"
    >,
    previousStatus: BookingStatus,
    newStatus: BookingStatus
  ): Promise<void> {
    if (previousStatus !== BookingStatus.HOLD) return;
    if (!quotaReleaseStatuses.includes(newStatus)) return;

    await tx.$executeRaw`
      SELECT id FROM "Booking" WHERE id = ${booking.id} FOR UPDATE
    `;

    const currentBooking = await tx.booking.findUnique({
      where: { id: booking.id },
      select: {
        id: true,
        voucherId: true,
        customerId: true,
        quotaReserved: true,
        status: true
      }
    });

    if (
      !currentBooking?.quotaReserved ||
      currentBooking.status !== previousStatus
    ) {
      return;
    }

    const flipped = await tx.booking.updateMany({
      where: {
        id: booking.id,
        quotaReserved: true,
        status: previousStatus
      },
      data: { quotaReserved: false }
    });

    if (flipped.count !== 1) return;

    if (!currentBooking.voucherId) return;

    await tx.$executeRaw`
      SELECT id FROM "Voucher" WHERE id = ${currentBooking.voucherId} FOR UPDATE
    `;

    const currentVoucher = await tx.voucher.findUnique({
      where: { id: currentBooking.voucherId }
    });

    if (currentVoucher && currentVoucher.usageCount > 0) {
      await tx.voucher.update({
        where: { id: currentBooking.voucherId },
        data: { usageCount: { decrement: 1 } }
      });
    }

    if (currentBooking.customerId != null) {
      const userUsage = await tx.voucherUserUsage.findUnique({
        where: {
          voucherId_customerId: {
            voucherId: currentBooking.voucherId,
            customerId: currentBooking.customerId
          }
        }
      });

      if (userUsage && userUsage.usageCount > 0) {
        await tx.voucherUserUsage.update({
          where: {
            voucherId_customerId: {
              voucherId: currentBooking.voucherId,
              customerId: currentBooking.customerId
            }
          },
          data: { usageCount: { decrement: 1 } }
        });
      }
    }
  }

  static async hasActiveHoldBookingsForVoucherId(
    voucherId: number
  ): Promise<boolean> {
    const count = await prisma.booking.count({
      where: {
        voucherId,
        status: BookingStatus.HOLD
      }
    });
    return count > 0;
  }
}
