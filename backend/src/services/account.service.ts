import { Account, AccountResetLog, BookingStatus, Prisma, Skin, Status } from "@prisma/client";
import { addHours, subDays } from "date-fns";
import Fuse, { IFuseOptions } from "fuse.js";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  PrismaUniqueError
} from "../lib/error";
import { prisma } from "../lib/prisma";
import {
  AccountEntityRequest,
  AccountWithSkins,
  GetAvailableAccountsRequest,
  PublicAccount,
  UpdateResetLogRequest
} from "../types/account.type";
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
    "LR-SSS⁺",
    "SSS⁺",
    "LR-SSS",
    "SSS",
    "LR-V",
    "V",
    "LR-S",
    "S",
    "LR-A",
    "A",
    "LR-B",
    "B",
    "LR-C",
    "C"
  ];

  private idTierOrder = ["SSS", "V", "S", "A", "B", "C"];

  // private sortAccountsByRank = <T extends { accountRank: string }>(
  //   data: T[],
  //   direction?: Prisma.SortOrder
  // ): T[] => {
  //   return data.sort((a, b) => {
  //     const rankA = this.valorantRanks.indexOf(a.accountRank);
  //     const rankB = this.valorantRanks.indexOf(b.accountRank);
  //     return direction === "asc" ? rankA - rankB : rankB - rankA;
  //   });
  // };
  private sortAccountsByRank = <
    T extends { accountRank: string; availabilityStatus: string }
  >(
    data: T[],
    direction?: Prisma.SortOrder
  ): T[] => {
    return data.sort((a, b) => {
      // Group by availabilityStatus first
      if (
        a.availabilityStatus === "AVAILABLE" &&
        b.availabilityStatus !== "AVAILABLE"
      )
        return -1;
      if (
        a.availabilityStatus !== "AVAILABLE" &&
        b.availabilityStatus === "AVAILABLE"
      )
        return 1;
      if (
        a.availabilityStatus === "IN_USE" &&
        b.availabilityStatus !== "IN_USE"
      )
        return 1;
      if (
        a.availabilityStatus !== "IN_USE" &&
        b.availabilityStatus === "IN_USE"
      )
        return -1;

      // Then sort by rank
      const rankA = this.valorantRanks.indexOf(a.accountRank);
      const rankB = this.valorantRanks.indexOf(b.accountRank);
      return direction === "asc" ? rankA - rankB : rankB - rankA;
    });
  };

  // private sortAccountsByPriceTier = <
  //   T extends { priceTier?: { code?: string } }
  // >(
  //   data: T[],
  //   direction?: Prisma.SortOrder
  // ): T[] => {
  //   return data.sort((a, b) => {
  //     const tierA = this.priceTierOrder.indexOf(a.priceTier?.code ?? "");
  //     const tierB = this.priceTierOrder.indexOf(b.priceTier?.code ?? "");

  //     if (tierA === -1) return 1;
  //     if (tierB === -1) return -1;

  //     return direction === "asc" ? tierA - tierB : tierB - tierA;
  //   });
  // };
  private sortAccountsByPriceTier = <
    T extends { priceTier?: { code?: string }; availabilityStatus: string }
  >(
    data: T[],
    direction?: Prisma.SortOrder
  ): T[] => {
    return data.sort((a, b) => {
      // Group by availabilityStatus first
      if (
        a.availabilityStatus === "AVAILABLE" &&
        b.availabilityStatus !== "AVAILABLE"
      )
        return -1;
      if (
        a.availabilityStatus !== "AVAILABLE" &&
        b.availabilityStatus === "AVAILABLE"
      )
        return 1;
      if (
        a.availabilityStatus === "IN_USE" &&
        b.availabilityStatus !== "IN_USE"
      )
        return 1;
      if (
        a.availabilityStatus !== "IN_USE" &&
        b.availabilityStatus === "IN_USE"
      )
        return -1;

      const tierA = this.priceTierOrder.indexOf(a.priceTier?.code ?? "");
      const tierB = this.priceTierOrder.indexOf(b.priceTier?.code ?? "");

      if (tierA === -1) return 1;
      if (tierB === -1) return -1;

      return direction === "asc" ? tierA - tierB : tierB - tierA;
    });
  };

  private sortAccountsByIdTier = <T extends { accountCode: string }>(
    data: T[]
  ): T[] => {
    return data.sort((a, b) => {
      const [tierA, rawNumA] = a.accountCode.split("-");
      const [tierB, rawNumB] = b.accountCode.split("-");

      // Get the index of the tier in the order list
      const tierIndexA = this.idTierOrder.indexOf(tierA);
      const tierIndexB = this.idTierOrder.indexOf(tierB);

      // Compare tier order
      if (tierIndexA !== tierIndexB) return tierIndexA - tierIndexB;

      // Check if rawNumA and rawNumB are numbers
      const isNumA = /^\d+$/.test(rawNumA);
      const isNumB = /^\d+$/.test(rawNumB);

      if (isNumA && isNumB) {
        // If both are numbers, compare numerically
        return Number(rawNumA) - Number(rawNumB);
      } else if (isNumA) {
        // Numbers should come before letters
        return -1;
      } else if (isNumB) {
        return 1;
      } else {
        // If both are letters, compare alphabetically
        return rawNumA.localeCompare(rawNumB);
      }
    });
  };

  private sortAccountsByIdTierPublic = <
    T extends { accountCode: string; availabilityStatus: string }
  >(
    data: T[]
  ): T[] => {
    return data.sort((a, b) => {
      // Group by availabilityStatus first
      if (
        a.availabilityStatus === "AVAILABLE" &&
        b.availabilityStatus !== "AVAILABLE"
      )
        return -1;
      if (
        a.availabilityStatus !== "AVAILABLE" &&
        b.availabilityStatus === "AVAILABLE"
      )
        return 1;
      if (
        a.availabilityStatus === "IN_USE" &&
        b.availabilityStatus !== "IN_USE"
      )
        return 1;
      if (
        a.availabilityStatus !== "IN_USE" &&
        b.availabilityStatus === "IN_USE"
      )
        return -1;

      const [tierA, rawNumA] = a.accountCode.split("-");
      const [tierB, rawNumB] = b.accountCode.split("-");

      const tierIndexA = this.idTierOrder.indexOf(tierA);
      const tierIndexB = this.idTierOrder.indexOf(tierB);

      if (tierIndexA !== tierIndexB) return tierIndexA - tierIndexB;

      const isNumA = /^\d+$/.test(rawNumA);
      const isNumB = /^\d+$/.test(rawNumB);

      if (isNumA && isNumB) return Number(rawNumA) - Number(rawNumB);
      if (isNumA) return -1;
      if (isNumB) return 1;
      return rawNumA.localeCompare(rawNumB);
    });
  };

  private async ensureSkinsExist(skinIds: number[]): Promise<void> {
    const found = await prisma.skin.findMany({
      where: { id: { in: skinIds } },
      select: { id: true }
    });
    const foundIds = new Set(found.map((s) => s.id));
    const missing = skinIds.filter((id) => !foundIds.has(id));
    if (missing.length) {
      throw new BadRequestError(
        `Some skin IDs do not exist: ${missing.join(", ")}`
      );
    }
  }

  getAllAccounts = async (
    page: number,
    limit: number,
    query?: string,
    sortBy?: string,
    direction?: Prisma.SortOrder
  ): Promise<[AccountWithSkins[], Metadata]> => {
    try {
      let data = await prisma.account.findMany({
        orderBy: {
          availabilityStatus: sortBy === "availability" ? direction : undefined
        },
        include: {
          priceTier: true,
          thumbnail: true,
          otherImages: true,
          skinList: true
        }
      });

      if (sortBy === "rank") {
        data = this.sortAccountsByRank(data, direction);
      } else if (sortBy === "price_tier") {
        data = this.sortAccountsByPriceTier(data, direction);
      } else if (sortBy === "id_tier") {
        data = this.sortAccountsByIdTier(data);
      }

      let filteredData: AccountWithSkins[] = data;
      if (query && query.trim().length > 0) {
        const fuseOptions: IFuseOptions<AccountWithSkins> = {
          keys: [
            "nickname",
            "accountCode",
            "accountRank",
            "skinList.name",
            "skinList.keyword"
          ],
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

      return [paginatedData, metadata];
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  getAllPublicAccounts = async (
    page: number,
    limit: number,
    query?: string,
    sortBy?: string,
    direction?: Prisma.SortOrder
  ): Promise<[PublicAccount[], Metadata]> => {
    try {
      let data = await prisma.account.findMany({
        where: { availabilityStatus: { in: ["AVAILABLE", "IN_USE"] } },
        orderBy: {
          availabilityStatus: sortBy === "availability" ? direction : undefined
        },
        select: {
          id: true,
          nickname: true,
          accountCode: true,
          description: true,
          accountRank: true,
          availabilityStatus: true,
          currentExpireAt: true,
          totalRentHour: true,
          skinList: true,
          priceTier: true,
          thumbnail: true,
          otherImages: true,
          isLowRank: true,
          isRecommended: true
        }
      });

      if (sortBy === "rank") {
        data = this.sortAccountsByRank(data, direction);
      } else if (sortBy === "price_tier") {
        data = this.sortAccountsByPriceTier(data, direction);
      } else if (sortBy === "id_tier") {
        data = this.sortAccountsByIdTierPublic(data);
      }

      let filteredData: PublicAccount[] = data;
      if (query && query.trim().length > 0) {
        const fuseOptions: IFuseOptions<PublicAccount> = {
          keys: ["nickname", "accountCode", "accountRank", "skinList"],
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

      return [paginatedData, metadata];
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

  getRecommendedAccounts = async (): Promise<PublicAccount[]> => {
    try {
      const accounts = await prisma.account.findMany({
        where: {
          isRecommended: true,
          availabilityStatus: { in: ["AVAILABLE", "IN_USE"] }
        },
        orderBy: {
          totalRentHour: "desc"
        },
        take: 3,
        select: {
          id: true,
          nickname: true,
          accountCode: true,
          description: true,
          accountRank: true,
          availabilityStatus: true,
          currentExpireAt: true,
          totalRentHour: true,
          skinList: true,
          priceTier: true,
          thumbnail: true,
          otherImages: true,
          isLowRank: true,
          isRecommended: true
        }
      });

      return accounts;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  getAccountById = async (id: number) => {
    try {
      const account = await prisma.account.findUnique({
        where: { id },
        include: {
          priceTier: {
            include: {
              priceList: true
            }
          },
          skinList: true,
          thumbnail: true,
          otherImages: true
        }
      });

      if (!account) {
        throw new NotFoundError("Account not found!");
      }

      return account;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError((error as Error).message);
    }
  };

  getAccountDuplicate = async (nickname: string, accountCode: string) => {
    try {
      const account = await prisma.account.findFirst({
        where: { OR: [{ nickname }, { accountCode }] }
      });

      return !!account;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  getAccountResetLogs = async () => {
    try {
      return await prisma.accountResetLog.findMany({
        include: {
          account: {
            select: { username: true, accountCode: true }
          }
        }
      });
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  getAvailableAccounts = async (data: GetAvailableAccountsRequest) => {
    try {
      const unavailableAccounts = await prisma.booking.findMany({
        where: {
          status: { in: [BookingStatus.HOLD, BookingStatus.RESERVED] },
          startAt: { lt: data.endAt ?? new Date() },
          endAt: { gt: data.startAt ?? new Date() }
        },
        distinct: ["accountId"],
        select: { accountId: true }
      })

      const availableAccounts = await prisma.account.findMany({
        where: {
          availabilityStatus: { not: Status.NOT_AVAILABLE },
          id: { notIn: unavailableAccounts.map(v => v.accountId) }
        }
      });

      return availableAccounts;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  }

  createAccount = async (data: AccountEntityRequest) => {
    try {
      const { skinList, thumbnail, otherImages, priceTier, ...scalars } = data;

      const skinConnect =
        Array.isArray(skinList) && skinList.length > 0
          ? { connect: skinList.map((id) => ({ id })) }
          : undefined;

      return await prisma.account.create({
        data: {
          ...scalars,
          skinList: skinConnect,
          thumbnail: { connect: { id: thumbnail } },
          availabilityStatus: scalars.availabilityStatus as Status,
          otherImages: { connect: otherImages?.map((id) => ({ id })) },
          priceTier: { connect: { id: priceTier } }
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

  finishBooking = async (id: number) => {
    try {
      const account = await prisma.account.findFirst({ where: { id } });

      if (!account) throw new NotFoundError("Account not found!");

      return await prisma.$transaction(async (tx) => {
        await tx.account.update({
          where: { id },
          data: {
            availabilityStatus: "AVAILABLE",
            currentBookingDate: null,
            currentBookingDuration: null,
            currentExpireAt: null,
            passwordResetRequired: true,
            totalRentHour: {
              increment: account.currentBookingDuration || 0
            }
          }
        });

        return await tx.accountResetLog.create({
          data: { accountId: id, previousExpireAt: account.currentExpireAt }
        });
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError((error as Error).message);
    }
  };

  updateAccount = async (
    id: number,
    data: Partial<AccountEntityRequest>,
    deleteResetLogs = false
  ) => {
    try {
      const currentAccount = await prisma.account.findUnique({
        where: { id },
        include: { thumbnail: true, otherImages: true }
      });

      if (!currentAccount) throw new NotFoundError("Account not found!");

      const { thumbnail, otherImages, priceTier, skinList, ...scalars } = data;

      const updateData: Prisma.AccountUpdateInput = { ...scalars };

      if (deleteResetLogs) {
        await prisma.accountResetLog.deleteMany({ where: { accountId: id } });
      }

      if (thumbnail !== undefined) {
        if (
          currentAccount.thumbnail &&
          currentAccount.thumbnail.id !== thumbnail
        ) {
          await this.uploadService.deleteImage(
            currentAccount.thumbnail.id,
            "account-images"
          );
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
          this.uploadService.deleteImage(id, "account-images")
        );

        await Promise.all(deletePromises);

        updateData.otherImages = {
          set: newOtherImageIds.map((id) => ({ id }))
        };
      }

      if (priceTier !== undefined) {
        updateData.priceTier = { connect: { id: priceTier } };
      }

      if (skinList !== undefined) {
        updateData.skinList = {
          set: skinList.map((id) => ({ id }))
        };
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

  updateExpireAt = async () => {
    try {
      const expiredAccounts = await prisma.account.findMany({
        where: { currentExpireAt: { lt: new Date() } }
      });

      await prisma.$transaction(async (tx) => {
        for (const account of expiredAccounts) {
          await tx.account.update({
            where: { id: account.id },
            data: {
              currentBookingDate: null,
              currentExpireAt: null,
              currentBookingDuration: null,
              passwordResetRequired: true,
              availabilityStatus: "AVAILABLE",
              totalRentHour: {
                increment: account.currentBookingDuration || 0
              }
            }
          });

          await tx.accountResetLog.create({
            data: {
              accountId: account.id,
              previousExpireAt: account.currentExpireAt
            }
          });
        }

        await tx.accountResetLog.deleteMany({
          where: { resetAt: { lt: subDays(new Date(), 2) } }
        });
      });
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  updateResetLogs = async (id: number, data: UpdateResetLogRequest) => {
    try {
      await prisma.account.update({
        where: { id: data.accountId },
        data: {
          password: data.password,
          passwordResetRequired: data.passwordResetRequired
        }
      });

      return await prisma.accountResetLog.delete({ where: { id } });
    } catch (error) {
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
          this.uploadService.deleteImage(id, "account-images")
        );
        await Promise.all(thumbnailDeletionPromises);
      }

      if (otherImageIds.length > 0) {
        const otherImageDeletionPromises = otherImageIds.map((id) =>
          this.uploadService.deleteImage(id, "account-images")
        );
        await Promise.all(otherImageDeletionPromises);
      }

      return result;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  async addSkinsToAccount(
    accountId: number,
    skinIds: number[]
  ): Promise<Account & { skinList: Skin[] }> {
    try {
      if (!Array.isArray(skinIds) || skinIds.length === 0) {
        throw new BadRequestError(
          'Provide "skinIds" as a non-empty array of integers.'
        );
      }

      await this.getAccountById(accountId);

      await this.ensureSkinsExist(skinIds);

      const updated = await prisma.account.update({
        where: { id: accountId },
        data: {
          skinList: {
            connect: skinIds.map((id) => ({ id }))
          }
        },
        include: { skinList: true }
      });

      return updated;
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof BadRequestError)
        throw error;

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundError(`Account ${accountId} not found.`);
      }

      throw new InternalServerError((error as Error).message);
    }
  }

  async removeSkinsFromAccount(
    accountId: number,
    skinIds: number[]
  ): Promise<Account & { skinList: Skin[] }> {
    try {
      if (!Array.isArray(skinIds) || skinIds.length === 0) {
        throw new BadRequestError(
          'Provide "skinIds" as a non-empty array of integers.'
        );
      }

      await this.getAccountById(accountId);

      const updated = await prisma.account.update({
        where: { id: accountId },
        data: {
          skinList: {
            disconnect: skinIds.map((id) => ({ id }))
          }
        },
        include: { skinList: true }
      });

      return updated;
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof BadRequestError)
        throw error;

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundError(`Account ${accountId} not found.`);
      }

      throw new InternalServerError((error as Error).message);
    }
  }
}
