import { BookingStatus } from "@prisma/client";

import {
  BadRequestError,
  InternalServerError,
  NotFoundError
} from "../lib/error";
import { getOperationalWindow } from "../lib/operational-window";
import { prisma } from "../lib/prisma";
import { addHours, parseDurationToHours } from "../lib/utils";
import { UpsertDailyDropConfigRequest } from "../types/dailydrop.type";

export class DailyDropService {
  getConfig = async () => {
    try {
      return await prisma.dailyDropConfig.findFirst({
        orderBy: { createdAt: "desc" }
      });
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  upsertConfig = async (payload: UpsertDailyDropConfigRequest) => {
    const {
      discountMin,
      discountMax,
      slot1Discount,
      slot2Discount,
      slot3Discount,
      slot1PriceTierIds,
      slot2PriceTierIds,
      slot3PriceTierIds,
      slot1PriceListIds,
      slot2PriceListIds,
      slot3PriceListIds,
      allowedAccountIds
    } = payload;

    if (discountMin < 0 || discountMax > 100 || discountMin > discountMax) {
      throw new BadRequestError(
        "discountMin must be >= 0, discountMax <= 100, and min <= max"
      );
    }

    for (const [label, value] of [
      ["slot1Discount", slot1Discount],
      ["slot2Discount", slot2Discount],
      ["slot3Discount", slot3Discount]
    ] as const) {
      if (value !== null && (isNaN(value) || value < 0 || value > 100)) {
        throw new BadRequestError(`${label} must be between 0 and 100`);
      }
    }

    try {
      await prisma.$transaction([
        prisma.dailyDropConfig.deleteMany(),
        prisma.dailyDropConfig.create({
          data: {
            discountMin,
            discountMax,
            slot1Discount,
            slot2Discount,
            slot3Discount,
            slot1PriceTierIds,
            slot2PriceTierIds,
            slot3PriceTierIds,
            slot1PriceListIds,
            slot2PriceListIds,
            slot3PriceListIds,
            allowedAccountIds
          }
        })
      ]);
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  getTodayDrops = async () => {
    try {
      const { start, end } = await getOperationalWindow();
      const now = new Date();

      const drops = await prisma.dailyDrop.findMany({
        where: {
          date: { gte: start, lte: end }
        },
        orderBy: { slot: "asc" },
        include: {
          account: {
            include: {
              priceTier: true,
              thumbnail: true,
              skinList: true
            }
          },
          priceList: true
        }
      });

      const accountIds = drops.map((d) => d.accountId);

      const activeBookings =
        accountIds.length > 0
          ? await prisma.booking.findMany({
              where: {
                accountId: { in: accountIds },
                createdAt: { gte: start, lte: end },
                OR: [
                  { status: BookingStatus.RESERVED },
                  {
                    status: BookingStatus.HOLD,
                    expiredAt: { gt: now }
                  }
                ]
              },
              select: { accountId: true, duration: true }
            })
          : [];

      const soldKeys = new Set(
        activeBookings.map((b) => `${b.accountId}:${b.duration}`)
      );

      return drops.map((drop) => ({
        ...drop,
        isSold: soldKeys.has(`${drop.accountId}:${drop.priceList.duration}`)
      }));
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  runRandomizerIfEmptyForOperationalDay = async (): Promise<
    { skipped: true } | { skipped: false }
  > => {
    const { start, end } = await getOperationalWindow();
    const existing = await prisma.dailyDrop.findFirst({
      where: { date: { gte: start, lte: end } },
      select: { id: true }
    });
    if (existing) {
      return { skipped: true };
    }
    await this.runRandomizer();
    return { skipped: false };
  };

  runRandomizer = async () => {
    const config = await this.getConfig();
    if (!config) {
      throw new NotFoundError(
        "No Daily Drop config found. Please create a config first."
      );
    }

    const { start: todayStart, end: todayEnd } = await getOperationalWindow();

    const pickedAccountIds: number[] = [];
    const drops: {
      slot: number;
      date: Date;
      discount: number;
      accountId: number;
      priceListId: number;
    }[] = [];

    const slotConfigs = [
      {
        slot: 1,
        priceTierIds: config.slot1PriceTierIds,
        priceListIds: config.slot1PriceListIds,
        fixedDiscount: config.slot1Discount
      },
      {
        slot: 2,
        priceTierIds: config.slot2PriceTierIds,
        priceListIds: config.slot2PriceListIds,
        fixedDiscount: config.slot2Discount
      },
      {
        slot: 3,
        priceTierIds: config.slot3PriceTierIds,
        priceListIds: config.slot3PriceListIds,
        fixedDiscount: config.slot3Discount
      }
    ];

    for (const {
      slot,
      priceTierIds,
      priceListIds,
      fixedDiscount
    } of slotConfigs) {
      const accounts = await prisma.account.findMany({
        where: {
          availabilityStatus: "AVAILABLE",
          ...(config.allowedAccountIds.length > 0
            ? { id: { in: config.allowedAccountIds } }
            : {}),
          ...(priceTierIds.length > 0
            ? { priceTierId: { in: priceTierIds } }
            : {}),
          ...(pickedAccountIds.length > 0
            ? { id: { notIn: pickedAccountIds } }
            : {})
        },
        include: {
          priceTier: {
            include: {
              priceList:
                priceListIds.length > 0
                  ? { where: { id: { in: priceListIds } } }
                  : true
            }
          }
        }
      });

      // Keep only accounts that have at least one eligible price list item
      const eligible = accounts.filter((a) => a.priceTier.priceList.length > 0);

      if (eligible.length === 0) {
        console.warn(
          `[DailyDrop] No eligible accounts for slot ${slot}, skipping`
        );
        continue;
      }

      // Build (account, priceList) candidate pairs and filter out any with
      // an overlapping HOLD/RESERVED booking in the slot's duration window
      type Candidate = {
        account: (typeof eligible)[number];
        priceList: (typeof eligible)[number]["priceTier"]["priceList"][number];
      };
      const candidates: Candidate[] = [];
      for (const a of eligible) {
        for (const pl of a.priceTier.priceList) {
          candidates.push({ account: a, priceList: pl });
        }
      }

      const now = new Date();
      const candidateAccountIds = Array.from(
        new Set(candidates.map((c) => c.account.id))
      );
      const maxDurationHours = Math.max(
        ...candidates.map((c) => parseDurationToHours(c.priceList.duration))
      );
      const windowEndMax = addHours(now, maxDurationHours);

      const activeBookings = await prisma.booking.findMany({
        where: {
          accountId: { in: candidateAccountIds },
          status: { in: [BookingStatus.HOLD, BookingStatus.RESERVED] },
          startAt: { lt: windowEndMax },
          endAt: { gt: now }
        },
        select: { accountId: true, startAt: true, endAt: true }
      });

      const filtered = candidates.filter(({ account, priceList }) => {
        const slotEnd = addHours(now, parseDurationToHours(priceList.duration));
        return !activeBookings.some(
          (b) =>
            b.accountId === account.id &&
            b.startAt &&
            b.endAt &&
            b.startAt < slotEnd &&
            b.endAt > now
        );
      });

      if (filtered.length === 0) {
        console.warn(
          `[DailyDrop] No candidates with free duration window for slot ${slot}, skipping`
        );
        continue;
      }

      const pick = filtered[Math.floor(Math.random() * filtered.length)];
      const account = pick.account;
      const priceList = pick.priceList;

      const discount =
        fixedDiscount ??
        config.discountMin +
          Math.random() * (config.discountMax - config.discountMin);

      drops.push({
        slot,
        date: todayStart,
        discount: Math.round(Math.round(discount * 100) / 100),
        accountId: account.id,
        priceListId: priceList.id
      });

      pickedAccountIds.push(account.id);
    }

    try {
      await prisma.$transaction([
        prisma.dailyDrop.deleteMany({
          where: { date: { gte: todayStart, lt: todayEnd } }
        }),
        prisma.dailyDrop.createMany({ data: drops })
      ]);
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };
}
