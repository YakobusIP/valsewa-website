import { Account, Prisma, Status } from "@prisma/client";
import { addHours } from "date-fns";
import Fuse, { IFuseOptions } from "fuse.js";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  PrismaUniqueError
} from "../lib/error";
import { prisma } from "../lib/prisma";
import { AccountEntityRequest } from "../types/account.type";
import { Metadata } from "../types/metadata.type";
import { UploadService } from "./upload.service";

export class AccountService {
  constructor(private readonly uploadService: UploadService) {}

  private valorantRanks = [
    "Iron 1",
    "Iron 2",
    "Iron 3",
    "Bronze 1",
    "Bronze 2",
    "Bronze 3",
    "Silver 1",
    "Silver 2",
    "Silver 3",
    "Gold 1",
    "Gold 2",
    "Gold 3",
    "Platinum 1",
    "Platinum 2",
    "Platinum 3",
    "Diamond 1",
    "Diamond 2",
    "Diamond 3",
    "Ascendant 1",
    "Ascendant 2",
    "Ascendant 3",
    "Immortal 1",
    "Immortal 2",
    "Immortal 3",
    "Radiant"
  ];
  private priceTierOrder = [
    "C",
    "B",
    "A",
    "S",
    "V",
    "SSS",
    "LR-C",
    "LR-B",
    "LR-A",
    "LR-S",
    "LR-V",
    "LR-SSS"
  ];
  getAllAccounts = async (
    page: number,
    limit: number,
    query?: string,
    sortBy?: string,
    direction?: Prisma.SortOrder
  ): Promise<[Account[], Metadata]> => {
    try {
      const data = await prisma.account.findMany({
        orderBy: {
          availabilityStatus: sortBy === "availability" ? direction : undefined
        },
        include: { priceTier: true, thumbnail: true, otherImages: true }
      });

      if (sortBy === "rank") {
        data.sort((a, b) => {
          const rankA = this.valorantRanks.indexOf(a.accountRank);
          const rankB = this.valorantRanks.indexOf(b.accountRank);
          return direction === "asc" ? rankA - rankB : rankB - rankA;
        });
      }

      if (sortBy === "price_tier") {
        data.sort((a, b) => {
          const tierA = this.priceTierOrder.indexOf(a.priceTier?.code);
          const tierB = this.priceTierOrder.indexOf(b.priceTier?.code);

          // Handle cases where priceTier.code is missing
          if (tierA === -1) return 1;
          if (tierB === -1) return -1;

          return direction === "asc" ? tierA - tierB : tierB - tierA;
        });
      }

      let filteredData: Account[] = data;
      if (query && query.trim().length > 0) {
        const fuseOptions: IFuseOptions<Account> = {
          keys: ["username", "accountCode", "accountRank", "skinList"],
          threshold: 0.3
        };

        const fuse = new Fuse(data, fuseOptions);
        const fuseResults = fuse.search(query);
        filteredData = fuseResults.map((result) => result.item);
      }

      const itemCount = filteredData.length;
      const pageCount = Math.ceil(itemCount / limit);

      const metadata = {
        page,
        limit,
        pageCount,
        total: itemCount
      };

      const paginatedData = filteredData.slice(
        (page - 1) * limit,
        page * limit
      );

      const mappedData = paginatedData.map((item) => {
        let stale_password = false;
        if (item.nextBooking && item.nextBookingDuration) {
          if (
            item.passwordUpdatedAt <
            addHours(item.nextBooking, item.nextBookingDuration)
          ) {
            stale_password = true;
          }
        }

        return { ...item, stale_password };
      });

      return [mappedData, metadata];
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  getAllDatabaseAccounts = async (filter?: Prisma.AccountWhereInput) => {
    try {
      return await prisma.account.findMany({ where: filter });
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

  createAccount = async (data: AccountEntityRequest) => {
    try {
      return await prisma.account.create({
        data: {
          ...data,
          thumbnail: { connect: { id: data.thumbnail } },
          availabilityStatus: data.availabilityStatus as Status,
          otherImages: { connect: data.otherImages?.map((id) => ({ id })) },
          priceTier: { connect: { id: data.priceTier } }
        }
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new PrismaUniqueError("Account code is already in use!");
      }

      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestError("Invalid request body!");
      }

      throw new InternalServerError((error as Error).message);
    }
  };

  updateAccount = async (id: number, data: Partial<AccountEntityRequest>) => {
    try {
      const currentAccount = await prisma.account.findUnique({
        where: { id },
        include: { thumbnail: true, otherImages: true }
      });

      if (!currentAccount) throw new NotFoundError("Account not found!");

      const {
        thumbnail,
        otherImages,
        priceTier,
        nextBooking,
        nextBookingDuration,
        expireAt,
        forceUpdateExpiry,
        forceUpdateTotalRentHour,
        ...scalars
      } = data;

      const updateData: Prisma.AccountUpdateInput = { ...scalars };

      if (forceUpdateTotalRentHour) {
        updateData.totalRentHour = {
          increment: currentAccount.nextBookingDuration ?? undefined
        };
      }

      if (nextBooking !== undefined && nextBookingDuration !== undefined) {
        if (forceUpdateExpiry) {
          updateData.expireAt = expireAt;
        } else {
          if (currentAccount.expireAt) {
            updateData.expireAt = undefined;
          } else {
            updateData.expireAt = expireAt;
          }
        }

        updateData.nextBooking = nextBooking;
        updateData.nextBookingDuration = nextBookingDuration;
      }

      if (thumbnail !== undefined) {
        if (
          currentAccount.thumbnail &&
          currentAccount.thumbnail.id !== thumbnail
        ) {
          await this.uploadService.deleteImage(currentAccount.thumbnail.id);
        }

        updateData.thumbnail = { connect: { id: thumbnail } };
      }

      if (otherImages !== undefined) {
        const oldOtherImageIds = currentAccount.otherImages.map(
          (img) => img.id
        );
        const newOtherImageIds = otherImages || [];

        const imagesToDelete = oldOtherImageIds.filter(
          (id) => !newOtherImageIds.includes(id)
        );

        const deletePromises = imagesToDelete.map((id) =>
          this.uploadService.deleteImage(id)
        );

        await Promise.all(deletePromises);

        updateData.otherImages = {
          set: newOtherImageIds.map((id) => ({ id }))
        };
      }

      if (priceTier !== undefined) {
        updateData.priceTier = { connect: { id: priceTier } };
      }

      return await prisma.account.update({
        where: { id },
        data: updateData
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new PrismaUniqueError("Account code is already in use!");
      }

      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestError("Invalid request body!");
      }

      throw new InternalServerError((error as Error).message);
    }
  };

  deleteManyAccounts = async (ids: number[]) => {
    try {
      const accounts = await prisma.account.findMany({
        where: { id: { in: ids } },
        select: { thumbnailId: true, otherImages: { select: { id: true } } }
      });

      const thumbnailIds = accounts
        .map((acc) => acc.thumbnailId)
        .filter((id) => id !== null && id !== undefined);

      const otherImageIds = accounts.flatMap((acc) =>
        acc.otherImages.map((img) => img.id)
      );

      const result = await prisma.account.deleteMany({
        where: { id: { in: ids } }
      });

      if (thumbnailIds.length > 0) {
        const thumbnailDeletionPromises = thumbnailIds.map((id) =>
          this.uploadService.deleteImage(id)
        );
        await Promise.all(thumbnailDeletionPromises);
      }

      if (otherImageIds.length > 0) {
        const otherImageDeletionPromises = otherImageIds.map((id) =>
          this.uploadService.deleteImage(id)
        );
        await Promise.all(otherImageDeletionPromises);
      }

      return result;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };
}
