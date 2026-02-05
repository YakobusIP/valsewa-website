import {
  Account,
  AccountResetLog,
  BookingStatus,
  Prisma,
  Skin,
  Status
} from "@prisma/client";
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
  AccountSearchFilters,
  AccountWithSkins,
  DeleteResetLogRequest,
  GetAvailableAccountsRequest,
  PublicAccount,
  UpdateResetLogRequest
} from "../types/account.type";
import { Metadata } from "../types/metadata.type";
import { UploadService } from "./upload.service";
import { parseDurationToHours } from "../lib/utils";

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

  private bucketToRange(bucket?: string) {
    if (!bucket) return undefined;
    const [min, max] = bucket.split("-").map(Number);
    return { min, max };
  }

  private buildPublicAccountsWhere(
    filters: AccountSearchFilters
  ): Prisma.AccountWhereInput {
    const { lowTierOnly, tiers, skinCounts, ranks, minPrice, maxPrice } =
      filters;

    const where: Prisma.AccountWhereInput = {
      availabilityStatus: { in: ["AVAILABLE", "IN_USE"] }
    };

    const LR_LABEL = "-LRTIER";

    const normalizeCode = (s: string) => s.trim().toUpperCase();
    const normalTierCodes =
      tiers?.filter((t) => !t.endsWith(LR_LABEL)).map(normalizeCode) ?? [];

    const lowTierCodes =
      tiers
        ?.filter((t) => t.endsWith(LR_LABEL))
        .map((t) => normalizeCode(t.replace(LR_LABEL, ""))) ?? [];

    if (typeof lowTierOnly === "boolean") {
      where.isLowRank = lowTierOnly;
    }

    const andConditions: Prisma.AccountWhereInput[] = [];

    const minPrices = Number.isFinite(minPrice) ? minPrice : undefined;
    const maxPrices = Number.isFinite(maxPrice) ? maxPrice : undefined;
    const hasPrice = minPrices != undefined || maxPrices != undefined;

    if (hasPrice) {
      const min = minPrice ?? 0;
      const max = maxPrice ?? 99999999999;

      if (lowTierOnly === true) {
        where.priceTier = {
          ...(where.priceTier || {}),
          priceList: { some: { lowPrice: { gte: min, lte: max } } }
        } as any;
      } else if (lowTierOnly === false) {
        where.priceTier = {
          ...(where.priceTier || {}),
          priceList: { some: { normalPrice: { gte: min, lte: max } } }
        } as any;
      } else {
        andConditions.push({
          OR: [
            {
              isLowRank: false,
              priceTier: {
                ...(tiers?.length ? { code: { in: normalTierCodes } } : {}),
                priceList: { some: { normalPrice: { gte: min, lte: max } } }
              }
            },
            {
              isLowRank: true,
              priceTier: {
                ...(tiers?.length ? { code: { in: lowTierCodes } } : {}),
                priceList: { some: { lowPrice: { gte: min, lte: max } } }
              }
            }
          ]
        });
      }
    }

    if (tiers?.length) {
      const or: Prisma.AccountWhereInput[] = [];

      if (normalTierCodes.length) {
        or.push({
          priceTier: { code: { in: normalTierCodes } },
          isLowRank: false
        });
      }

      if (lowTierCodes.length) {
        or.push({
          priceTier: { code: { in: lowTierCodes } },
          isLowRank: true
        });
      }

      if (or.length) {
        andConditions.push({ OR: or });
      }
    }

    if (ranks?.length) {
      const rankConditions: Prisma.AccountWhereInput[] = [];
      for (const rank of ranks) {
        if (rank === "Radiant" || rank === "Unranked") {
          rankConditions.push({ accountRank: rank });
        } else {
          rankConditions.push({ accountRank: { startsWith: rank } });
        }
      }
      if (rankConditions.length > 0) {
        andConditions.push({ OR: rankConditions });
      }
    }

    if (skinCounts?.length) {
      const skinCountConditions: Prisma.AccountWhereInput[] = [];
      for (const bucket of skinCounts) {
        const range = this.bucketToRange(bucket);
        if (range) {
          skinCountConditions.push({
            skinCount: { gte: range.min, lte: range.max }
          });
        }
      }
      if (skinCountConditions.length > 0) {
        andConditions.push({ OR: skinCountConditions });
      }
    }

    if (andConditions.length > 0) {
      where.AND = andConditions;
    }

    return where;
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

      const accountIds = filteredData.map((a) => a.id);

      const bookings = await prisma.booking.findMany({
        where: {
          accountId: { in: accountIds },
          status: BookingStatus.RESERVED,
          endAt: { gt: new Date() }
        },
        orderBy: {
          startAt: "asc"
        },
        select: {
          accountId: true,
          startAt: true,
          endAt: true,
          duration: true
        }
      });

      const bookingMap = new Map<number, typeof bookings>();

      for (const booking of bookings) {
        if (!bookingMap.has(booking.accountId)) {
          bookingMap.set(booking.accountId, []);
        }

        const list = bookingMap.get(booking.accountId)!;
        if (list.length < 2) {
          list.push(booking);
        }
      }

      const filteredDataWithBookings = filteredData.map((datum) => {
        const b = bookingMap.get(datum.id) ?? [];

        return {
          ...datum,
          // Priority: booking data > account data > null
          currentBookingDate:
            b[0]?.startAt ?? datum.currentBookingDate ?? null,
          currentBookingDuration: b[0]
            ? parseDurationToHours(b[0].duration)
            : (datum.currentBookingDuration ?? null),
          currentExpireAt: b[0]?.endAt ?? datum.currentExpireAt ?? null,

          nextBookingDate:
            b[1]?.startAt ?? datum.nextBookingDate ?? null,
          nextBookingDuration: b[1]
            ? parseDurationToHours(b[1].duration)
            : (datum.nextBookingDuration ?? null),
          nextExpireAt: b[1]?.endAt ?? datum.nextExpireAt ?? null
        };
      });

      const itemCount = filteredDataWithBookings.length;
      const pageCount = Math.ceil(itemCount / limit);

      const metadata = {
        page,
        limit,
        pageCount,
        total: itemCount
      };

      const paginatedData = filteredDataWithBookings.slice(
        (page - 1) * limit,
        page * limit
      );

      return [paginatedData, metadata];
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  getAllPublicAccounts = async (
    filters: AccountSearchFilters,
    page?: number,
    limit?: number
  ): Promise<[PublicAccount[], Metadata | null]> => {
    try {
      const { query, sortBy, direction = "asc" } = filters;

      const where = this.buildPublicAccountsWhere(filters);

      const orderBy: Prisma.AccountOrderByWithRelationInput =
        sortBy === "availability"
          ? { availabilityStatus: direction }
          : { createdAt: "desc" };

      let data = await prisma.account.findMany({
        where,
        orderBy,
        select: {
          id: true,
          nickname: true,
          accountCode: true,
          description: true,
          accountRank: true,
          availabilityStatus: true,
          currentExpireAt: true,
          totalRentHour: true,
          skinCount: true,
          skinList: true,
          priceTier: { include: { priceList: true } },
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

      let filteredData: typeof data = data;
      if (query && query.trim().length > 0) {
        const fuseOptions: IFuseOptions<(typeof data)[0]> = {
          keys: ["accountCode", "skinList.name", "skinList.keyword"],
          threshold: 0.3,
          ignoreLocation: true
        };

        const fuse = new Fuse(data, fuseOptions);
        const fuseResults = fuse.search(query);
        filteredData = fuseResults.map((result) => result.item);
      }

      const total = filteredData.length;

      if (page === undefined || limit === undefined) {
        return [filteredData as PublicAccount[], null];
      }

      const pageCount = Math.ceil(total / limit);
      const paginatedData = filteredData.slice(
        (page - 1) * limit,
        page * limit
      );

      const metadata: Metadata = {
        page,
        limit,
        pageCount,
        total
      };

      return [paginatedData as PublicAccount[], metadata];
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
          skinCount: true,
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

      const bookings = await prisma.booking.findMany({
        where: {
          accountId: account.id,
          status: BookingStatus.RESERVED,
          endAt: { gt: new Date() }
        },
        orderBy: {
          endAt: "asc"
        },
        select: {
          id: true,
          duration: true,
          startAt: true,
          endAt: true
        },
        take: 2
      });

      return {
        ...account,
        // Priority: booking data > account data > null
        currentBookingDate:
          bookings[0]?.startAt ?? account.currentBookingDate ?? null,
        currentBookingDuration: bookings[0]
          ? parseDurationToHours(bookings[0]?.duration)
          : (account.currentBookingDuration ?? null),
        currentExpireAt:
          bookings[0]?.endAt ?? account.currentExpireAt ?? null,
        nextBookingDate:
          bookings[1]?.startAt ?? account.nextBookingDate ?? null,
        nextBookingDuration: bookings[1]
          ? parseDurationToHours(bookings[1]?.duration)
          : (account.nextBookingDuration ?? null),
        nextExpireAt: bookings[1]?.endAt ?? account.nextExpireAt ?? null
      };
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
      });

      const availableAccounts = await prisma.account.findMany({
        where: {
          availabilityStatus: { not: Status.NOT_AVAILABLE },
          id: { notIn: unavailableAccounts.map((v) => v.accountId) }
        }
      });

      return availableAccounts;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  createAccount = async (data: AccountEntityRequest) => {
    try {
      const { skinList, thumbnail, otherImages, priceTier, ...scalars } = data;

      const skinCount = data.skinList.length;
      const skinConnect =
        Array.isArray(skinList) && skinList.length > 0
          ? { connect: skinList.map((id) => ({ id })) }
          : undefined;

      return await prisma.account.create({
        data: {
          ...scalars,
          ...data,
          skinCount,
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
        updateData.skinCount = skinList.length;
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

  deleteResetLogs = async (id: number, data: DeleteResetLogRequest) => {
    try {
      await prisma.account.update({
        where: { id: data.accountId },
        data: {
          passwordResetRequired: false
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
}
