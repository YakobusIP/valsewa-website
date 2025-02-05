import { Prisma } from "@prisma/client";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  PrismaUniqueError
} from "../lib/error";
import { prisma } from "../lib/prisma";

export class AccountService {
  getAllAccounts = async () => {
    try {
      const account = await prisma.account.findMany({
        include: { priceTier: true, otherImages: true }
      });

      return account;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  getAccountById = async (id: number) => {
    try {
      const account = await prisma.account.findFirst({ where: { id } });

      if (!account) throw new NotFoundError("Account not found!");

      return account;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError((error as Error).message);
    }
  };

  createAccount = async (data: Prisma.AccountCreateInput) => {
    try {
      return await prisma.account.create({ data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new PrismaUniqueError("Account already exists!");
      }

      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestError("Invalid request body!");
      }

      throw new InternalServerError((error as Error).message);
    }
  };

  updateAccount = async (id: number, data: Prisma.AccountUpdateInput) => {
    try {
      return await prisma.account.update({ where: { id }, data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundError("Account not found!");
      }

      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestError("Invalid request body!");
      }

      throw new InternalServerError((error as Error).message);
    }
  };

  deleteManyAccounts = async (ids: number[]) => {
    try {
      return await prisma.account.deleteMany({ where: { id: { in: ids } } });
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };
}
