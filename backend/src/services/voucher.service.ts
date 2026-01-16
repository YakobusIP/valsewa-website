import { Prisma, Type } from "@prisma/client";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError
} from "../lib/error";
import { prisma } from "../lib/prisma";
import { Metadata } from "../types/metadata.type";

export class VoucherService {
  getAll = async (
    page?: number,
    limit?: number,
    query?: string
  ): Promise<[any[], Metadata]> => {
    try {
      const whereCriteria: Prisma.VoucherWhereInput = query
        ? {
            voucherName: {
              contains: query,
              mode: "insensitive"
            }
          }
        : {};

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

  getActiveVoucherByVoucherName = async (voucherName: string) => {
    try {
      const voucher = await prisma.voucher.findUnique({
        where: { voucherName, isValid: true }
      });

      if (!voucher) throw new NotFoundError("Voucher not found");

      return voucher;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  create = async (data: {
    voucherName: string;
    type: Type;
    percentage?: number;
    nominal?: number;
    maxDiscount?: number;
    dateStart: Date;
    dateEnd: Date;
  }) => {
    try {
      const exists = await prisma.voucher.findUnique({
        where: { voucherName: data.voucherName }
      });

      if (exists) throw new BadRequestError("Voucher already exists");

      if (data.type === "PERSENTASE" && !data.percentage) {
        throw new BadRequestError("Percentage is required");
      }

      if (data.type === "NOMINAL" && !data.nominal) {
        throw new BadRequestError("Nominal is required");
      }

      return await prisma.voucher.create({
        data: {
          voucherName: data.voucherName,
          type: data.type,
          percentage: data.type === "PERSENTASE" ? data.percentage : null,
          nominal: data.type === "NOMINAL" ? data.nominal : null,
          maxDiscount: data.type === "PERSENTASE" ? data.maxDiscount : null,
          dateStart: data.dateStart,
          dateEnd: data.dateEnd,
          isValid: true
        }
      });
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  toggleStatus = async (id: number) => {
    try {
      const voucher = await prisma.voucher.findUnique({
        where: { id }
      });

      if (!voucher) throw new BadRequestError("Voucher not found");

      return await prisma.voucher.update({
        where: { id },
        data: { isValid: !voucher.isValid }
      });
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  toggleVisibility = async (id: number) => {
    try {
      const voucher = await prisma.voucher.findUnique({
        where: { id }
      });

      if (!voucher) throw new BadRequestError("Voucher not found");

      return await prisma.voucher.update({
        where: { id },
        data: { isVisible: !voucher.isVisible }
      });
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  remove = async (id: number) => {
    try {
      await prisma.voucher.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  toggleVoucherValidity = async (id: number, isValid: boolean) => {
    try {
      return await prisma.voucher.update({
        where: { id },
        data: { isValid }
      });
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  checkVoucherExpiration = async () => {
    try {
      const today = new Date();

      const expiredVouchers = await prisma.voucher.findMany({
        where: {
          isValid: true,
          dateEnd: {
            lt: today
          }
        }
      });

      console.log(`Found ${expiredVouchers.length} expired vouchers.`);

      const updatePromises = expiredVouchers.map((voucher) => {
        console.log(`Deactivating voucher: ${voucher.voucherName}`);
        return this.toggleVoucherValidity(voucher.id, false);
      });

      await Promise.all(updatePromises);

      return { count: expiredVouchers.length };
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };
}
