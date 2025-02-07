import { Account, Prisma, Status } from "@prisma/client";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  PrismaUniqueError
} from "../lib/error";
import { prisma } from "../lib/prisma";
import { Metadata } from "../types/metadata.type";
import { AccountEntityRequest } from "../types/account.type";
import { UploadService } from "./upload.service";

export class AccountService {
  constructor(private readonly uploadService: UploadService) {}

  getAllAccounts = async (
    page: number,
    limit: number
  ): Promise<[Account[], Metadata]> => {
    try {
      const data = await prisma.account.findMany({
        include: { priceTier: true, thumbnail: true, otherImages: true }
      });
      const itemCount = await prisma.priceTier.count();
      const pageCount = Math.ceil(itemCount / limit);

      const metadata = {
        page,
        limit,
        pageCount,
        total: itemCount
      };

      return [data, metadata];
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

      if (
        currentAccount.thumbnail &&
        data.thumbnail &&
        currentAccount.thumbnail.id !== data.thumbnail
      ) {
        await this.uploadService.deleteImage(currentAccount.thumbnail.id);
      }

      if (currentAccount.otherImages && currentAccount.otherImages.length > 0) {
        const oldOtherImageIds = currentAccount.otherImages.map(
          (img) => img.id
        );
        const newOtherImageIds = data.otherImages ?? [];

        const imagesToDelete = oldOtherImageIds.filter(
          (id) => !newOtherImageIds.includes(id)
        );

        const deletePromises = imagesToDelete.map((id) =>
          this.uploadService.deleteImage(id)
        );

        await Promise.all(deletePromises);
      }

      return await prisma.account.update({
        where: { id },
        data: {
          ...data,
          thumbnail: { connect: { id: data.thumbnail } },
          availabilityStatus: data.availabilityStatus as Status,
          otherImages: {
            set: data.otherImages ? data.otherImages.map((id) => ({ id })) : []
          },
          priceTier: { connect: { id: data.priceTier } }
        }
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
