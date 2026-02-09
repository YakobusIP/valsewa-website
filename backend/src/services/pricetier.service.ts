import { PriceTier, Prisma } from "@prisma/client";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  PrismaUniqueError
} from "../lib/error";
import { prisma } from "../lib/prisma";
import { Metadata } from "../types/metadata.type";

export class PriceTierService {
  getAllPriceTiers = async (
    page?: number,
    limit?: number,
    query?: string
  ): Promise<[PriceTier[], Metadata]> => {
    try {
      const whereCriteria: Prisma.PriceTierWhereInput = {
        code: { contains: query, mode: "insensitive" }
      };

      let data: PriceTier[];
      let metadata: Metadata;

      if (page !== undefined && limit !== undefined) {
        const skip = (page - 1) * limit;

        data = await prisma.priceTier.findMany({
          where: whereCriteria,
          take: limit,
          skip: skip
        });

        const itemCount = await prisma.priceTier.count({
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
        data = await prisma.priceTier.findMany({
          where: whereCriteria
        });
        metadata = {
          page: 0,
          limit: 0,
          pageCount: 0,
          total: 0
        };
      }

      return [data, metadata];
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  getPriceTierById = async (id: number) => {
    try {
      const priceTier = await prisma.priceTier.findFirst({ where: { id } });

      if (!priceTier) throw new NotFoundError("Price tier not found!");

      return priceTier;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError((error as Error).message);
    }
  };

  createPriceTier = async (data: Prisma.PriceTierCreateInput) => {
    try {
      return await prisma.priceTier.create({ data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new PrismaUniqueError("Price tier code is already in use!");
      }

      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestError("Invalid request body!");
      }

      throw new InternalServerError((error as Error).message);
    }
  };

  updatePriceTier = async (id: number, data: Prisma.PriceTierUpdateInput) => {
    try {
      return await prisma.priceTier.update({ where: { id }, data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundError("Price tier not found!");
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new PrismaUniqueError("Price tier code is already in use!");
      }

      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestError("Invalid request body!");
      }

      throw new InternalServerError((error as Error).message);
    }
  };

  deleteManyPriceTiers = async (ids: number[]) => {
    try {
      return await prisma.priceTier.deleteMany({ where: { id: { in: ids } } });
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };
}
