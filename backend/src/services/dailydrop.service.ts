import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { BadRequestError, InternalServerError, NotFoundError } from "../lib/error";
import { prisma } from "../lib/prisma";
import { OPERATIONAL_HOURS_KEY } from "../types/setting.type";
import { UpsertDailyDropConfigRequest } from "../types/dailydrop.type";

dayjs.extend(utc);
dayjs.extend(timezone);

type OperationalWindow = { start: Date; end: Date; tz: string };

async function getOperationalWindow(): Promise<OperationalWindow> {
  const setting = await prisma.globalSettings.findUnique({
    where: { key: OPERATIONAL_HOURS_KEY }
  });

  let openH = 9, openM = 0, closeH = 22, closeM = 0;
  let tz = "Asia/Jakarta";

  if (setting?.value) {
    try {
      const hours = JSON.parse(setting.value);
      [openH, openM] = (hours.open as string).split(":").map(Number);
      [closeH, closeM] = (hours.close as string).split(":").map(Number);
      if (hours.timezone) tz = hours.timezone;
    } catch {
      // fall back to defaults
    }
  }

  const today = dayjs().tz(tz).format("YYYY-MM-DD");
  const pad = (n: number) => String(n).padStart(2, "0");

  const start = dayjs.tz(`${today} ${pad(openH)}:${pad(openM)}:00`, tz).toDate();
  const end   = dayjs.tz(`${today} ${pad(closeH)}:${pad(closeM)}:00`, tz).toDate();

  return { start, end, tz };
}

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

    try {
      await prisma.$transaction([
        prisma.dailyDropConfig.deleteMany(),
        prisma.dailyDropConfig.create({
          data: {
            discountMin,
            discountMax,
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

      return await prisma.dailyDrop.findMany({
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
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
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
        priceListIds: config.slot1PriceListIds
      },
      {
        slot: 2,
        priceTierIds: config.slot2PriceTierIds,
        priceListIds: config.slot2PriceListIds
      },
      {
        slot: 3,
        priceTierIds: config.slot3PriceTierIds,
        priceListIds: config.slot3PriceListIds
      }
    ];

    for (const { slot, priceTierIds, priceListIds } of slotConfigs) {
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
      const eligible = accounts.filter(
        (a) => a.priceTier.priceList.length > 0
      );

      if (eligible.length === 0) {
        console.warn(`[DailyDrop] No eligible accounts for slot ${slot}, skipping`);
        continue;
      }

      const account = eligible[Math.floor(Math.random() * eligible.length)];
      const priceList =
        account.priceTier.priceList[
          Math.floor(Math.random() * account.priceTier.priceList.length)
        ];

      const discount =
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
