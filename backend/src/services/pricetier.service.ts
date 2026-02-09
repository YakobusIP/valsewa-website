import { PriceTier, PriceList, Prisma } from "@prisma/client";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  PrismaUniqueError
} from "../lib/error";
import { prisma } from "../lib/prisma";
import { Metadata } from "../types/metadata.type";
import {
  CreatePriceTierRequest,
  PriceListItem,
  UpdatePriceTierRequest
} from "../types/pricetier.type";

const durationRegex = /^(?:(\d+)d(?:\s+([01]?\d|2[0-3])h)?|([01]?\d|2[0-3])h)$/;

function validateDuration(input: string) {
  if (!durationRegex.test(input)) {
    throw new BadRequestError(
      "Invalid duration format. Use 'Xd Yh' (e.g., '1d 2h')."
    );
  }
}

export class PriceTierService {
  getAllPriceTiers = async (
    page?: number,
    limit?: number,
    query?: string
  ): Promise<[(PriceTier & { priceList: PriceList[] })[], Metadata]> => {
    try {
      const whereCriteria: Prisma.PriceTierWhereInput = {
        code: { contains: query, mode: "insensitive" }
      };

      let data: (PriceTier & { priceList: PriceList[] })[];
      let metadata: Metadata;

      if (page !== undefined && limit !== undefined) {
        const skip = (page - 1) * limit;

        data = await prisma.priceTier.findMany({
          where: whereCriteria,
          take: limit,
          skip: skip,
          include: {
            priceList: {
              orderBy: { createdAt: "desc" }
            }
          }
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
          where: whereCriteria,
          include: {
            priceList: {
              orderBy: { createdAt: "desc" }
            }
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

  getPriceTierById = async (
    id: number
  ): Promise<PriceTier & { priceList: PriceList[] }> => {
    try {
      const priceTier = await prisma.priceTier.findFirst({
        where: { id },
        include: {
          priceList: true
        }
      });

      if (!priceTier) throw new NotFoundError("Price tier not found!");

      return priceTier;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError((error as Error).message);
    }
  };

  createPriceTier = async (payload: CreatePriceTierRequest) => {
    try {
      payload.priceList?.forEach((item) => validateDuration(item.duration));

      return await prisma.priceTier.create({
        data: {
          code: payload.code,
          priceList: payload.priceList
            ? {
                create: payload.priceList.map((item) => ({
                  duration: item.duration,
                  normalPrice: item.normalPrice,
                  lowPrice: item.lowPrice
                }))
              }
            : undefined
        }
      });
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

  updatePriceTier = async (
    id: number,
    payload: UpdatePriceTierRequest
  ): Promise<PriceTier & { priceList: PriceList[] }> => {
    try {
      const replaceList = payload.replacePriceList ?? payload.priceList;

      if (replaceList) {
        replaceList.forEach((item) => validateDuration(item.duration));

        const result = await prisma.$transaction(async (tx) => {
          const existing = await tx.priceTier.findUnique({ where: { id } });
          if (!existing) throw new NotFoundError("Price tier not found!");

          await tx.priceList.deleteMany({ where: { tierId: id } });

          const updated = await tx.priceTier.update({
            where: { id },
            data: {
              code: payload.code ?? existing.code,
              priceList: {
                create: replaceList.map((item) => ({
                  duration: item.duration,
                  normalPrice: item.normalPrice,
                  lowPrice: item.lowPrice
                }))
              }
            },
            include: { priceList: true }
          });

          return updated;
        });

        return result;
      }

      const updated = await prisma.priceTier.update({
        where: { id },
        data: {
          code: payload.code
        },
        include: { priceList: true }
      });

      return updated;
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

  addPriceListItems = async (tierId: number, items: PriceListItem[]) => {
    try {
      items.forEach((item) => validateDuration(item.duration));
      const tier = await prisma.priceTier.findUnique({ where: { id: tierId } });
      if (!tier) throw new NotFoundError("Price Tier not Found!");

      return await prisma.$transaction(
        items.map((item) =>
          prisma.priceList.create({
            data: {
              tierId,
              duration: item.duration,
              normalPrice: item.normalPrice,
              lowPrice: item.lowPrice
            }
          })
        )
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestError("Invalid request body!");
      }
      throw new InternalServerError((error as Error).message);
    }
  };

  updatePriceListItem = async (
    itemId: number,
    data: Partial<PriceListItem>
  ) => {
    try {
      if (data.duration) validateDuration(data.duration);

      return await prisma.priceList.update({
        where: { id: itemId },
        data: {
          duration: data.duration,
          normalPrice:
            data.normalPrice !== undefined ? data.normalPrice : undefined,
          lowPrice: data.lowPrice !== undefined ? data.lowPrice : undefined
        }
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundError("Price list item not found!");
      }
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestError("Invalid request body!");
      }
      throw new InternalServerError((error as Error).message);
    }
  };

  deletePriceListItems = async (ids: number[]) => {
    try {
      return await prisma.priceList.deleteMany({ where: { id: { in: ids } } });
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  getPublicPrices = async () => {
    try {
      const priceTiers = await prisma.priceTier.findMany({
        where: {
          code: {
            not: { startsWith: "LR-" }
          }
        },
        include: {
          priceList: true
        }
      });

      const formatPrice = (price: number): string => {
        const inK = Math.floor(price / 1000);
        return `Rp ${inK}k`;
      };

      const lrTiers: { id: string; price: string }[] = [];
      const normalTiers: { id: string; price: string }[] = [];

      for (const tier of priceTiers) {
        if (tier.priceList.length === 0) continue;

        const minNormalPrice = Math.min(
          ...tier.priceList.map((p) => p.normalPrice)
        );
        const minLowPrice = Math.min(...tier.priceList.map((p) => p.lowPrice));

        normalTiers.push({
          id: tier.code,
          price: formatPrice(minNormalPrice)
        });

        lrTiers.push({
          id: tier.code,
          price: formatPrice(minLowPrice)
        });
      }

      const rankBases = [
        "Iron",
        "Bronze",
        "Silver",
        "Gold",
        "Platinum",
        "Diamond",
        "Ascendant",
        "Immortal",
        "Radiant"
      ];

      const ranks: { id: string; price: string }[] = [];

      for (const rankBase of rankBases) {
        const accounts = await prisma.account.findMany({
          where: {
            OR: [
              { accountRank: { startsWith: `${rankBase} ` } },
              { accountRank: rankBase }
            ],
            availabilityStatus: "AVAILABLE"
          },
          include: {
            priceTier: {
              include: {
                priceList: true
              }
            }
          }
        });

        if (accounts.length === 0) {
          continue;
        }

        let minPrice = Infinity;

        for (const account of accounts) {
          const priceList = account.priceTier.priceList;
          if (priceList.length === 0) continue;

          const prices = priceList.map((p) =>
            account.isLowRank ? p.lowPrice : p.normalPrice
          );
          const accountMinPrice = Math.min(...prices);

          if (accountMinPrice < minPrice) {
            minPrice = accountMinPrice;
          }
        }

        if (minPrice !== Infinity) {
          ranks.push({
            id: rankBase,
            price: formatPrice(minPrice)
          });
        }
      }

      return {
        lrTiers,
        tiers: normalTiers,
        ranks
      };
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };
}
