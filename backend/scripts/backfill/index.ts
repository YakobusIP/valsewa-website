/// <reference types="node" />
import "dotenv/config";

import { BookingStatus, PrismaClient } from "@prisma/client";
import axios, { AxiosError } from "axios";
import {
  assertCompleteLegacyBooking,
  baseTierCode,
  durationHours,
  isUnratedTierCode,
  parsePriceDescription
} from "./utils";

const prisma = new PrismaClient();
const VALORANT_SKINS_URL = "https://valorant-api.com/v1/weapons/skins";
const OPERATIONAL_HOURS_KEY = "OPERATIONAL_HOURS";
const DEFAULT_OPERATIONAL_HOURS = {
  open: "10:00",
  close: "22:00",
  lastOrderBufferInMinutes: 30,
  timezone: "Asia/Jakarta"
};

type PriceTierRow = {
  id: number;
  code: string;
  description: string | null;
};

type PriceListRow = {
  id: number;
  duration: string;
  unratedPrice: number;
  compPrice: number;
};

type LegacyBookingFields = {
  label: "current" | "next";
  startAt: Date | null;
  durationHoursValue: number | null;
  endAt: Date | null;
};

type ValorantSkinLevel = {
  displayIcon?: string | null;
};

type ValorantSkinChroma = {
  fullRender?: string | null;
};

type ValorantSkin = {
  uuid: string;
  displayName: string;
  displayIcon?: string | null;
  chromas?: ValorantSkinChroma[];
  levels?: ValorantSkinLevel[];
};

type ValorantSkinsResponse = {
  status: number;
  data: ValorantSkin[];
};

function normalize(value?: string) {
  return (value ?? "").trim().toLowerCase();
}

function requireDatabaseUrl() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set before running the backfill.");
  }
}

async function getCounts() {
  const relationRows = await prisma.$queryRaw<Array<{ count: bigint }>>`
    SELECT COUNT(*)::bigint AS count FROM "_AccountToSkin"
  `;

  return {
    priceLists: await prisma.priceList.count(),
    skins: await prisma.skin.count(),
    accountSkinLinks: Number(relationRows[0]?.count ?? 0),
    bookings: await prisma.booking.count()
  };
}

function printCounts(
  label: string,
  counts: Awaited<ReturnType<typeof getCounts>>
) {
  console.log(
    `${label}: priceLists=${counts.priceLists}, skins=${counts.skins}, accountSkinLinks=${counts.accountSkinLinks}, bookings=${counts.bookings}`
  );
}

async function upsertPriceListItem(data: {
  tierId: number;
  duration: string;
  unratedPrice: number;
  compPrice: number;
}) {
  const existing = await prisma.priceList.findFirst({
    where: {
      tierId: data.tierId,
      duration: data.duration
    },
    select: { id: true }
  });

  if (existing) {
    await prisma.priceList.update({
      where: { id: existing.id },
      data: {
        unratedPrice: data.unratedPrice,
        compPrice: data.compPrice
      }
    });
    return "updated" as const;
  }

  await prisma.priceList.create({ data });
  return "created" as const;
}

async function ensureDefaultOperationalHours() {
  await prisma.globalSettings.upsert({
    where: { key: OPERATIONAL_HOURS_KEY },
    update: {},
    create: {
      key: OPERATIONAL_HOURS_KEY,
      value: JSON.stringify(DEFAULT_OPERATIONAL_HOURS)
    }
  });
}

async function fetchValorantSkins() {
  try {
    console.log("Fetching skins from Valorant API...");
    const response = await axios.get<ValorantSkinsResponse>(
      VALORANT_SKINS_URL,
      {
        timeout: 30_000
      }
    );

    if (response.data?.status !== 200 || !Array.isArray(response.data.data)) {
      throw new Error("Invalid response from Valorant API.");
    }

    console.log(`Fetched ${response.data.data.length} skins from API.`);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status ?? 0;
      if (status === 429) {
        throw new Error("External API rate limit reached.");
      }
      if (status >= 500) {
        throw new Error("External API server is unavailable.");
      }
    }

    throw new Error(`Failed to fetch skins: ${(error as Error).message}`);
  }
}

function findSkinImageUrl(skinName: string, apiSkins: ValorantSkin[]) {
  const normalizedName = normalize(skinName);
  if (!normalizedName) return null;

  const matched =
    apiSkins.find((skin) => normalize(skin.displayName) === normalizedName) ??
    apiSkins.find((skin) =>
      normalize(skin.displayName).includes(normalizedName)
    );

  if (!matched) return null;

  const imageUrl =
    matched.levels?.find((level) => !!level.displayIcon)?.displayIcon ??
    matched.chromas?.find((chroma) => !!chroma.fullRender)?.fullRender ??
    "";

  return {
    name: matched.displayName,
    imageUrl
  };
}

async function backfillPriceListsAndCompetitiveAccounts() {
  console.log("\n[1/3] Backfilling price lists and account price modes...");

  const tiers = await prisma.priceTier.findMany({
    select: {
      id: true,
      code: true,
      description: true
    }
  });

  const groups = new Map<
    string,
    { base?: PriceTierRow; unrated?: PriceTierRow }
  >();

  for (const tier of tiers) {
    const key = baseTierCode(tier.code);
    const group = groups.get(key) ?? {};

    if (isUnratedTierCode(tier.code)) {
      if (group.unrated) {
        throw new Error(`Duplicate UR tier for base code "${key}".`);
      }
      group.unrated = tier;
    } else {
      if (group.base) {
        throw new Error(`Duplicate base tier code "${key}".`);
      }
      group.base = tier;
    }

    groups.set(key, group);
  }

  let created = 0;
  let updated = 0;
  let markedCompetitiveAccounts = 0;
  let movedUnratedAccounts = 0;
  let deletedUnratedTiers = 0;

  for (const [code, group] of groups) {
    if (!group.base) {
      throw new Error(`Tier "${code}" has a UR- tier but no base tier.`);
    }

    const baseDescription = group.base.description?.trim();
    if (!baseDescription) {
      console.warn(`Skipping tier "${code}" because description is empty.`);
      continue;
    }

    const competitivePrices = parsePriceDescription(baseDescription);
    const unratedPrices = group.unrated?.description?.trim()
      ? parsePriceDescription(group.unrated.description)
      : new Map<string, number>();

    const durations = new Set([
      ...Array.from(competitivePrices.keys()),
      ...Array.from(unratedPrices.keys())
    ]);

    for (const duration of durations) {
      const compPrice = competitivePrices.get(duration);
      if (compPrice === undefined) {
        throw new Error(
          `Tier "${code}" has UR duration "${duration}" without matching normal price.`
        );
      }

      const result = await upsertPriceListItem({
        tierId: group.base.id,
        duration,
        unratedPrice: unratedPrices.get(duration) ?? compPrice,
        compPrice
      });

      if (result === "created") created += 1;
      else updated += 1;
    }

    const marked = await prisma.account.updateMany({
      where: { priceTierId: group.base.id },
      data: { isCompetitive: true }
    });
    markedCompetitiveAccounts += marked.count;

    if (group.unrated) {
      const result = await prisma.account.updateMany({
        where: { priceTierId: group.unrated.id },
        data: {
          priceTierId: group.base.id,
          isCompetitive: false
        }
      });
      movedUnratedAccounts += result.count;

      await prisma.priceTier.delete({
        where: { id: group.unrated.id }
      });
      deletedUnratedTiers += 1;
    }
  }

  console.log(
    `PriceList rows created=${created}, updated=${updated}, normal accounts marked competitive=${markedCompetitiveAccounts}, UR accounts moved=${movedUnratedAccounts}, UR tiers deleted=${deletedUnratedTiers}.`
  );
}

async function backfillSkins() {
  console.log("\n[2/3] Backfilling skins from Account.legacySkinList...");

  const accounts = await prisma.account.findMany({
    select: {
      id: true,
      legacySkinList: true
    }
  });

  const uniqueNames = new Set<string>();
  for (const account of accounts) {
    for (const rawName of account.legacySkinList ?? []) {
      const name = rawName.trim();
      if (name) uniqueNames.add(name);
    }
  }

  const names = Array.from(uniqueNames).sort((a, b) => a.localeCompare(b));
  const apiSkins = names.length > 0 ? await fetchValorantSkins() : [];
  const originalToCanonical = new Map<string, string>();
  const skinDataByCanonicalName = new Map<
    string,
    { name: string; imageUrl: string }
  >();

  for (const name of names) {
    const skinData = findSkinImageUrl(name, apiSkins) ?? {
      name,
      imageUrl: ""
    };

    skinDataByCanonicalName.set(skinData.name, skinData);
    originalToCanonical.set(normalize(name), skinData.name);
  }

  const skinData = Array.from(skinDataByCanonicalName.values());
  for (const skin of skinData) {
    const existing = await prisma.skin.findUnique({
      where: { name: skin.name },
      select: { id: true }
    });

    if (existing) {
      if (skin.imageUrl) {
        await prisma.skin.update({
          where: { id: existing.id },
          data: { imageUrl: skin.imageUrl }
        });
      }
    } else {
      await prisma.skin.create({ data: skin });
    }
  }

  const skins = skinData.length
    ? await prisma.skin.findMany({
        where: { name: { in: skinData.map((skin) => skin.name) } },
        select: { id: true, name: true }
      })
    : [];

  const skinByCanonicalName = new Map(skins.map((skin) => [skin.name, skin]));
  const skinIdByLegacyName = new Map<string, number>();
  for (const [legacyName, canonicalName] of originalToCanonical) {
    const skin = skinByCanonicalName.get(canonicalName);
    if (skin) skinIdByLegacyName.set(legacyName, skin.id);
  }

  let updatedAccounts = 0;

  for (const account of accounts) {
    const skinIds = Array.from(
      new Set(
        (account.legacySkinList ?? [])
          .map((rawName) => skinIdByLegacyName.get(normalize(rawName)))
          .filter((id): id is number => typeof id === "number")
      )
    );

    await prisma.account.update({
      where: { id: account.id },
      data: {
        skinList: { set: skinIds.map((id) => ({ id })) },
        skinCount: skinIds.length
      }
    });
    updatedAccounts += 1;
  }

  console.log(
    `Skin rows ensured=${skinData.length}, account skin relations refreshed=${updatedAccounts}.`
  );
}

function findPriceListForLegacyDuration(
  accountId: number,
  priceList: PriceListRow[],
  legacyDurationHours: number
) {
  const matches = priceList.filter(
    (item) => durationHours(item.duration) === legacyDurationHours
  );

  if (matches.length === 0) {
    throw new Error(
      `Account ${accountId} has no PriceList row matching ${legacyDurationHours} legacy hours.`
    );
  }

  if (matches.length > 1) {
    throw new Error(
      `Account ${accountId} has multiple PriceList rows matching ${legacyDurationHours} legacy hours.`
    );
  }

  return matches[0];
}

async function createLegacyBookingIfNeeded(
  account: {
    id: number;
    isCompetitive: boolean;
    priceTier: { priceList: PriceListRow[] };
  },
  fields: LegacyBookingFields
) {
  const shouldCreate = assertCompleteLegacyBooking(
    account.id,
    fields.label,
    fields.startAt,
    fields.durationHoursValue,
    fields.endAt
  );

  if (!shouldCreate) return false;

  const existing = await prisma.booking.findFirst({
    where: {
      accountId: account.id,
      status: BookingStatus.RESERVED,
      startAt: fields.startAt,
      endAt: fields.endAt
    },
    select: { id: true }
  });

  if (existing) return false;

  const priceList = findPriceListForLegacyDuration(
    account.id,
    account.priceTier.priceList,
    fields.durationHoursValue!
  );

  const mainValuePerUnit = priceList.unratedPrice;
  const othersValuePerUnit = account.isCompetitive
    ? priceList.compPrice - priceList.unratedPrice
    : 0;
  const mainValue = mainValuePerUnit;
  const othersValue = account.isCompetitive ? othersValuePerUnit : 0;
  const totalValue = mainValue + othersValue;

  await prisma.booking.create({
    data: {
      accountId: account.id,
      status: BookingStatus.RESERVED,
      duration: priceList.duration,
      quantity: 1,
      immediate: true,
      startAt: fields.startAt,
      endAt: fields.endAt,
      expiredAt: null,
      mainValuePerUnit,
      othersValuePerUnit,
      mainValue,
      othersValue,
      discount: 0,
      adminFee: null,
      totalValue,
      version: 1
    }
  });

  return true;
}

async function backfillBookings() {
  console.log(
    "\n[3/3] Backfilling bookings from legacy Account booking fields..."
  );

  const accounts = await prisma.account.findMany({
    select: {
      id: true,
      isCompetitive: true,
      currentBookingDate: true,
      currentBookingDuration: true,
      currentExpireAt: true,
      nextBookingDate: true,
      nextBookingDuration: true,
      nextExpireAt: true,
      priceTier: {
        select: {
          priceList: {
            select: {
              id: true,
              duration: true,
              unratedPrice: true,
              compPrice: true
            }
          }
        }
      }
    }
  });

  let createdBookings = 0;

  for (const account of accounts) {
    const legacyBookings: LegacyBookingFields[] = [
      {
        label: "current",
        startAt: account.currentBookingDate,
        durationHoursValue: account.currentBookingDuration,
        endAt: account.currentExpireAt
      },
      {
        label: "next",
        startAt: account.nextBookingDate,
        durationHoursValue: account.nextBookingDuration,
        endAt: account.nextExpireAt
      }
    ];

    for (const legacyBooking of legacyBookings) {
      const created = await createLegacyBookingIfNeeded(account, legacyBooking);
      if (created) createdBookings += 1;
    }
  }

  console.log(`Legacy bookings created=${createdBookings}.`);
}

export async function main() {
  requireDatabaseUrl();

  console.log("Starting in-place production backfill.");
  printCounts("Before", await getCounts());

  await ensureDefaultOperationalHours();
  await backfillPriceListsAndCompetitiveAccounts();
  await backfillSkins();
  await backfillBookings();

  printCounts("After", await getCounts());
  console.log("Backfill complete.");
}

export async function runBackfill() {
  try {
    await main();
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  runBackfill().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
