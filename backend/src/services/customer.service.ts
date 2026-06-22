import { Prisma } from "@prisma/client";
import { BadRequestError, InternalServerError } from "../lib/error";
import { prisma } from "../lib/prisma";
import { addDays, subtractDays } from "../lib/utils";
import { Metadata } from "../types/metadata.type";
import bcrypt from "bcrypt";
import { getContextLogger } from "../lib/request-context";
import { SettingService } from "./setting.service";

const customerLogger = () => getContextLogger({ component: "customer" });

export class CustomerService {
  constructor(private readonly settingService: SettingService) {}

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
            createdAt: true,
            currentStreak: true
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
            createdAt: true,
            currentStreak: true
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
      const expiryDays = await this.settingService.getPasswordExpiryDays();
      const now = new Date();

      const user = await prisma.customer.update({
        where: { id },
        data: {
          password: hashedPassword,
          isActive: activeStatus,
          passwordExpireAt: addDays(now, expiryDays)
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
      const expiryDays = await this.settingService.getPasswordExpiryDays();
      const now = new Date();

      const user = await prisma.customer.create({
        data: {
          username,
          password: hashedPassword,
          isActive: true,
          passwordExpireAt: addDays(now, expiryDays)
        }
      });

      return user;
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw error;
      }

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

  getMyStreak = async (id: number) => {
    try {
      const customer = await prisma.customer.findUnique({
        where: { id },
        select: { currentStreak: true, lastEligibleRent: true }
      });

      if (!customer) {
        throw new Error("Customer not found");
      }

      const now = new Date();
      const expired =
        customer.lastEligibleRent && now > customer.lastEligibleRent;

      if (expired && customer.currentStreak !== 0) {
        await prisma.customer.update({
          where: { id },
          data: { currentStreak: 0 }
        });

        return {
          currentStreak: 0,
          lastEligibleRent: customer.lastEligibleRent
        };
      }

      return {
        currentStreak: customer.currentStreak,
        lastEligibleRent: customer.lastEligibleRent
      };
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  checkPasswordExpiration = async () => {
    try {
      const today = new Date();

      // Find all active customers whose password has expired
      const expiredCustomers = await prisma.customer.findMany({
        where: {
          isActive: true,
          passwordExpireAt: {
            lt: today
          }
        }
      });

      customerLogger().info(
        {
          event: "password_expiration_check_completed",
          expiredCount: expiredCustomers.length
        },
        "Password expiration check completed"
      );

      const updatePromises = expiredCustomers.map((customer) => {
        customerLogger().debug(
          {
            event: "customer_deactivated_password_expired",
            customerId: customer.id
          },
          "Deactivating expired customer"
        );
        return this.toggleCustomerActiveStatus(customer.id, false);
      });

      await Promise.all(updatePromises);

      return { count: expiredCustomers.length };
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  recalculatePasswordExpiry = async (
    previousExpiryDays: number,
    newExpiryDays: number
  ) => {
    try {
      const now = new Date();
      const customers = await prisma.customer.findMany({
        select: {
          id: true,
          passwordExpireAt: true,
          createdAt: true
        }
      });

      let deactivatedCount = 0;

      await prisma.$transaction(
        customers.map((customer) => {
          const passwordSetAt = customer.passwordExpireAt
            ? subtractDays(customer.passwordExpireAt, previousExpiryDays)
            : customer.createdAt;
          const newExpireAt = addDays(passwordSetAt, newExpiryDays);
          const expired = newExpireAt <= now;

          if (expired) {
            deactivatedCount += 1;
          }

          return prisma.customer.update({
            where: { id: customer.id },
            data: {
              passwordExpireAt: newExpireAt,
              ...(expired ? { isActive: false } : {})
            }
          });
        })
      );

      customerLogger().info(
        {
          event: "password_expiry_recalculated",
          previousExpiryDays,
          newExpiryDays,
          customerCount: customers.length,
          deactivatedCount
        },
        "Recalculated customer password expiry"
      );

      return { customerCount: customers.length, deactivatedCount };
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };
}
