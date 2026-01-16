import { Prisma } from "@prisma/client";
import { BadRequestError, InternalServerError } from "../lib/error";
import { prisma } from "../lib/prisma";
import { Metadata } from "../types/metadata.type";
import bcrypt from "bcrypt";

export class CustomerService {
  getAllCustomers = async (
    page?: number,
    limit?: number,
    query?: string
  ): Promise<[any[], Metadata]> => {
    try {
      const whereCriteria: Prisma.CustomerWhereInput = query
        ? { username: { contains: query, mode: "insensitive" } }
        : {};

      let data;
      let metadata: Metadata;

      if (page !== undefined && limit !== undefined) {
        const skip = (page - 1) * limit;

        data = await prisma.customer.findMany({
          where: whereCriteria,
          take: limit,
          skip,
          select: {
            id: true,
            username: true,
            isActive: true,
            createdAt: true
          }
        });

        const itemCount = await prisma.customer.count({
          where: whereCriteria
        });

        const pageCount = Math.ceil(itemCount / limit);

        metadata = {
          page,
          limit,
          pageCount,
          total: itemCount
        };
      } else {
        data = await prisma.customer.findMany({
          where: whereCriteria,
          select: {
            id: true,
            username: true,
            isActive: true,
            createdAt: true
          }
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

  updatePassword = async (id: number, newPassword: string) => {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const activeStatus = true;

      const user = await prisma.customer.update({
        where: { id },
        data: {
          password: hashedPassword,
          passwordChangedAt: new Date(),
          isActive: activeStatus,
          passwordExpireAt: addDays(new Date(), 30)
        }
      });

      return user;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  createCustomer = async (username: string, password: string) => {
    try {
      const existing = await prisma.customer.findUnique({
        where: { username }
      });

      if (existing) {
        throw new BadRequestError("Username already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const now = new Date();

      const user = await prisma.customer.create({
        data: {
          username,
          password: hashedPassword,
          isActive: true,
          passwordExpireAt: addDays(now, 30)
        }
      });

      return user;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  toggleCustomerActiveStatus = async (id: number, isActive: boolean) => {
    try {
      const user = await prisma.customer.update({
        where: { id },
        data: { isActive }
      });
      return user;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };
}
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
