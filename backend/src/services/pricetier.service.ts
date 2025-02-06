import { Prisma } from "@prisma/client";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  PrismaUniqueError
} from "../lib/error";
import { prisma } from "../lib/prisma";

export class PriceTierService {
  getAllPriceTiers = async () => {
    try {
      const priceTier = await prisma.priceTier.findMany();

      return priceTier;
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
        throw new PrismaUniqueError("Price tier already exists!");
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
