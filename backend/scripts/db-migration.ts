/**
 * Database Migration Script
 *
 * This script migrates data from old production schema to new schema using
 * the expand-and-contract pattern.
 *
 * IMPORTANT: Before running this script:
 * 1. Ensure the Prisma schema has been expanded (description field added to PriceTier,
 *    skinList String[] added to Account, and skinList Skin[] renamed to skins Skin[])
 * 2. Run: npx prisma generate
 * 3. Connect your .env to production database
 * 4. Run: ts-node backend/src/scripts/db-migration.ts
 *
 * After migration completes successfully:
 * 1. Contract the schema (remove description, remove skinList String[], rename skins back to skinList)
 * 2. Run: npx prisma generate
 * 3. Create and apply migration to remove old fields
 */

import axios, { AxiosError } from "axios";
import { PrismaClient } from "@prisma/client";

const VALORANT_SKINS_URL = "https://valorant-api.com/v1/weapons/skins";

// Create own PrismaClient instance for migration script (like seed files)
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"]
});

// Types for Valorant API response
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

// Helper function to normalize strings
const normalize = (s?: string): string => (s ?? "").trim().toLowerCase();

// Parse price description from multiline format
// Expected formats (case-insensitive):
// "1 day = 25k"
// "3 days = 50k"
// "1 hour = 5k"
// "7 hours = 20k"
function parsePriceDescription(description: string): Map<string, number> {
  const prices = new Map<string, number>();

  const unitMap: Record<string, string> = {
    day: "d",
    days: "d",
    hour: "h",
    hours: "h"
  };

  const lines = description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  for (const line of lines) {
    const match = line.match(
      /^(\d+)\s+(day|days|hour|hours)\s*=\s*(\d+(?:\.\d+)?)k$/i
    );

    if (!match) continue;

    const amount = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();
    const priceK = parseFloat(match[3]);

    const normalizedUnit = unitMap[unit];
    const duration = `${amount}${normalizedUnit}`;
    const price = Math.round(priceK * 1000);

    prices.set(duration, price);
  }

  return prices;
}

// Fetch all skins from Valorant API
async function fetchValorantSkins(): Promise<ValorantSkin[]> {
  try {
    console.log("Fetching skins from Valorant API...");
    const response = await axios.get<ValorantSkinsResponse>(
      VALORANT_SKINS_URL,
      {
        timeout: 30_000
      }
    );

    if (response.data?.status !== 200 || !Array.isArray(response.data.data)) {
      throw new Error("Invalid response from Valorant API");
    }

    console.log(`Fetched ${response.data.data.length} skins from API`);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status ?? 0;
      if (status === 429) {
        throw new Error("External API rate limit reached!");
      }
      if (status >= 500) {
        throw new Error("External API server is unavailable!");
      }
    }
    throw new Error(`Failed to fetch skins: ${(error as Error).message}`);
  }
}

// Find skin image URL from API data
function findSkinImageUrl(
  skinName: string,
  apiSkins: ValorantSkin[]
): { name: string; imageUrl: string } | null {
  const normalizedName = normalize(skinName);
  if (!normalizedName) {
    return null;
  }

  // Try exact match first
  let matched = apiSkins.find(
    (s) => normalize(s.displayName) === normalizedName
  );

  // If no exact match, try partial match
  if (!matched) {
    matched = apiSkins.find((s) =>
      normalize(s.displayName).includes(normalizedName)
    );
  }

  if (!matched) {
    return null;
  }

  // Extract imageUrl: prefer levels[0].displayIcon, then chromas[0].fullRender
  const imageUrl =
    matched.levels?.find((l) => !!l.displayIcon)?.displayIcon ??
    matched.chromas?.find((c) => !!c.fullRender)?.fullRender ??
    "";

  return {
    name: matched.displayName,
    imageUrl
  };
}

// Migrate price tiers from description field to PriceList entries
async function migratePriceTiers(): Promise<void> {
  console.log("\n=== Starting Price Tier Migration ===");

  try {
    // Read all price tiers with description field (now available in expanded schema)
    // Note: After running `npx prisma generate`, description will be available
    const priceTiers = (await (prisma.priceTier.findMany as any)({
      select: {
        id: true,
        code: true,
        description: true // This field exists in expanded schema
      }
    })) as Array<{ id: number; code: string; description: string | null }>;

    console.log(`Found ${priceTiers.length} price tiers to migrate`);

    if (priceTiers.length === 0) {
      console.log("No price tiers to migrate");
      return;
    }

    // Group price tiers by base code (remove "LR-" prefix)
    const tierGroups = new Map<
      string,
      { normal?: (typeof priceTiers)[0]; low?: (typeof priceTiers)[0] }
    >();

    for (const tier of priceTiers) {
      const baseCode = tier.code.startsWith("LR-")
        ? tier.code.substring(3)
        : tier.code;
      const isLowRank = tier.code.startsWith("LR-");

      if (!tierGroups.has(baseCode)) {
        tierGroups.set(baseCode, {});
      }

      const group = tierGroups.get(baseCode)!;
      if (isLowRank) {
        group.low = tier;
      } else {
        group.normal = tier;
      }
    }

    console.log(`Grouped into ${tierGroups.size} base tiers`);

    // Process each base tier group
    for (const [baseCode, group] of tierGroups.entries()) {
      const normalTier = group.normal;
      const lowTier = group.low;

      if (!normalTier) {
        console.warn(
          `Warning: Base tier "${baseCode}" has no normal tier, skipping`
        );
        continue;
      }

      // Parse description from normal tier
      if (!normalTier.description || normalTier.description.trim() === "") {
        console.warn(
          `  Warning: Tier "${baseCode}" has empty description, skipping`
        );
        continue;
      }

      if (!lowTier?.description && lowTier) {
        console.warn(
          `  Warning: LR tier "${lowTier.code}" has empty description, will use normal prices`
        );
      }

      const normalPrices = parsePriceDescription(normalTier.description);
      const lowPrices =
        lowTier && lowTier.description
          ? parsePriceDescription(lowTier.description)
          : new Map<string, number>();

      if (normalPrices.size === 0) {
        console.warn(
          `  Warning: Could not parse prices from description for tier "${baseCode}", skipping`
        );
        continue;
      }

      console.log(`Processing tier "${baseCode}":`);
      console.log(
        `  Normal prices: ${Array.from(normalPrices.entries())
          .map(([d, p]) => `${d}=${p}`)
          .join(", ")}`
      );
      if (lowTier && lowPrices.size > 0) {
        console.log(
          `  Low prices: ${Array.from(lowPrices.entries())
            .map(([d, p]) => `${d}=${p}`)
            .join(", ")}`
        );
      } else if (lowTier) {
        console.log(`  Low prices: Using normal prices as default`);
      }

      // Check if PriceList entries already exist for this tier
      const existingPriceLists = await prisma.priceList.findMany({
        where: { tierId: normalTier.id }
      });

      if (existingPriceLists.length > 0) {
        console.log(
          `  PriceList entries already exist for tier "${baseCode}", skipping creation`
        );
        continue;
      }

      // Create PriceList entries for each duration found in the parsed prices
      // Get all unique durations from both normal and low prices
      const durations = new Set([...normalPrices.keys(), ...lowPrices.keys()]);

      const priceListEntries: Array<{
        duration: string;
        normalPrice: number;
        lowPrice: number;
        tierId: number;
      }> = [];

      for (const duration of durations) {
        const normalPrice = normalPrices.get(duration) ?? 0;
        const lowPrice = lowPrices.get(duration) ?? normalPrice; // Default to normal price if low price not found

        priceListEntries.push({
          duration,
          normalPrice,
          lowPrice,
          tierId: normalTier.id
        });
      }

      // Create PriceList entries in parallel (no transaction needed for inserts)
      try {
        await Promise.all(
          priceListEntries.map((entry) =>
            prisma.priceList.create({
              data: entry
            })
          )
        );
      } catch (error) {
        console.error(
          `  Error creating PriceList entries for tier "${baseCode}":`,
          (error as Error).message
        );
        throw error;
      }

      console.log(
        `  Created ${priceListEntries.length} PriceList entries for tier "${baseCode}"`
      );
    }

    // Update accounts: set isLowRank and change priceTierId for LR- accounts
    console.log("\nUpdating accounts...");
    const allAccounts = await prisma.account.findMany({
      select: {
        id: true,
        priceTierId: true
      }
    });

    // Get price tier codes for all accounts
    const accountTierMap = new Map<number, string>();
    for (const account of allAccounts) {
      const tier = await prisma.priceTier.findUnique({
        where: { id: account.priceTierId },
        select: { code: true }
      });
      if (tier) {
        accountTierMap.set(account.id, tier.code);
      }
    }

    // Find base tier IDs
    const baseTierIds = new Map<string, number>();
    for (const [baseCode] of tierGroups.entries()) {
      const tier = await prisma.priceTier.findUnique({
        where: { code: baseCode },
        select: { id: true }
      });
      if (tier) {
        baseTierIds.set(baseCode, tier.id);
      }
    }

    // Update accounts in batches using transaction
    const accountsToUpdate: Array<{
      id: number;
      priceTierId?: number;
      isLowRank: boolean;
    }> = [];

    for (const account of allAccounts) {
      const tierCode = accountTierMap.get(account.id);
      if (!tierCode) {
        console.warn(
          `Warning: Account ${account.id} has invalid priceTierId ${account.priceTierId}`
        );
        continue;
      }

      const isLowRank = tierCode.startsWith("LR-");
      const baseCode = isLowRank ? tierCode.substring(3) : tierCode;
      const baseTierId = baseTierIds.get(baseCode);

      if (isLowRank && baseTierId) {
        // Update account to use base tier and set isLowRank
        accountsToUpdate.push({
          id: account.id,
          priceTierId: baseTierId,
          isLowRank: true
        });
      } else if (!isLowRank) {
        // Ensure isLowRank is false
        accountsToUpdate.push({
          id: account.id,
          isLowRank: false
        });
      } else if (isLowRank && !baseTierId) {
        console.warn(
          `Warning: Account ${account.id} has LR tier "${tierCode}" but base tier "${baseCode}" not found`
        );
      }
    }

    // Update accounts in batches (no transaction needed - updates are independent)
    const batchSize = 100;
    let updatedCount = 0;
    for (let i = 0; i < accountsToUpdate.length; i += batchSize) {
      const batch = accountsToUpdate.slice(i, i + batchSize);
      console.log(`Updating batch ${i}-${i + batch.length}...`);

      // Use Promise.all for parallel updates within each batch
      try {
        await Promise.all(
          batch.map((acc) =>
            prisma.account.update({
              where: { id: acc.id },
              data: {
                ...(acc.priceTierId !== undefined && {
                  priceTierId: acc.priceTierId
                }),
                isLowRank: acc.isLowRank
              }
            })
          )
        );
        updatedCount += batch.length;
      } catch (error) {
        console.error(
          `Error updating account batch ${i}-${i + batch.length}:`,
          (error as Error).message
        );
        throw error;
      }
    }

    console.log(`Updated ${updatedCount} accounts`);

    console.log("=== Price Tier Migration Completed ===\n");
  } catch (error) {
    console.error("Error during price tier migration:", error);
    throw error;
  }
}

// Migrate skins from Account.skinList String[] to Skin model
async function migrateSkins(): Promise<void> {
  console.log("\n=== Starting Skin Migration ===");

  try {
    // Collect unique skin names from all accounts (using expanded schema with skinList String[])
    // Note: After running `npx prisma generate`, skinList will be String[] in the expanded schema
    console.log("Collecting unique skin names from accounts...");
    const accounts = (await prisma.account.findMany({
      select: {
        id: true,
        skinList: true // This is String[] in expanded schema
      }
    })) as unknown as Array<{ id: number; skinList: string[] }>;

    const uniqueSkinNames = new Set<string>();
    for (const account of accounts) {
      // account.skinList is String[] in expanded schema
      if (Array.isArray(account.skinList)) {
        for (const skinName of account.skinList) {
          if (skinName && typeof skinName === "string") {
            const trimmed = skinName.trim();
            if (trimmed) {
              uniqueSkinNames.add(trimmed);
            }
          }
        }
      }
    }

    console.log(`Found ${uniqueSkinNames.size} unique skin names`);

    if (uniqueSkinNames.size === 0) {
      console.log("No skins to migrate");
      return;
    }

    // Fetch all skins from Valorant API once
    const apiSkins = await fetchValorantSkins();

    // Create Skin records using batch insert (assumes table is empty)
    console.log("Creating Skin records...");

    // Build skin data for batch insert, deduplicating by canonical name
    const skinDataMap = new Map<string, { name: string; imageUrl: string }>();
    const originalToCanonical = new Map<string, string>(); // Maps normalized original name to canonical name

    for (const skinName of uniqueSkinNames) {
      const normalizedOriginal = normalize(skinName);
      const skinData = findSkinImageUrl(skinName, apiSkins);

      if (skinData) {
        // Use API name as canonical
        skinDataMap.set(skinData.name, {
          name: skinData.name,
          imageUrl: skinData.imageUrl
        });
        originalToCanonical.set(normalizedOriginal, skinData.name);
      } else {
        // Use original name if not found in API
        skinDataMap.set(skinName, {
          name: skinName,
          imageUrl: ""
        });
        originalToCanonical.set(normalizedOriginal, skinName);
      }
    }

    // Batch insert all skins at once
    const skinsToCreate = Array.from(skinDataMap.values());
    console.log(`Batch inserting ${skinsToCreate.length} skins...`);

    await prisma.skin.createMany({
      data: skinsToCreate,
      skipDuplicates: true
    });

    // Fetch all created skins to build the skinMap with IDs
    const createdSkins = await prisma.skin.findMany({
      where: {
        name: { in: skinsToCreate.map((s) => s.name) }
      },
      select: { id: true, name: true }
    });

    // Build skinMap: normalized original name -> { id, name }
    const skinMap = new Map<string, { id: number; name: string }>();
    const nameToSkin = new Map(createdSkins.map((s) => [s.name, s]));

    for (const [normalizedOriginal, canonicalName] of originalToCanonical) {
      const skin = nameToSkin.get(canonicalName);
      if (skin) {
        skinMap.set(normalizedOriginal, { id: skin.id, name: skin.name });
        // Also map normalized canonical name
        const normalizedCanonical = normalize(canonicalName);
        if (normalizedCanonical !== normalizedOriginal) {
          skinMap.set(normalizedCanonical, { id: skin.id, name: skin.name });
        }
      }
    }

    console.log(
      `Created ${createdSkins.length} Skin records, mapped ${skinMap.size} names`
    );

    // Link skins to accounts
    console.log("Linking skins to accounts...");

    // Build account-to-skinIds mapping
    const accountSkinLinks: Array<{ accountId: number; skinIds: number[] }> =
      [];

    for (const account of accounts) {
      if (!Array.isArray(account.skinList) || account.skinList.length === 0) {
        continue;
      }

      const skinIds: number[] = [];
      for (const skinName of account.skinList) {
        if (!skinName || typeof skinName !== "string") continue;

        const trimmed = skinName.trim();
        if (!trimmed) continue;

        const normalized = normalize(trimmed);
        const skin = skinMap.get(normalized);

        if (skin) {
          skinIds.push(skin.id);
        }
      }

      if (skinIds.length > 0) {
        accountSkinLinks.push({ accountId: account.id, skinIds });
      }
    }

    // Process in parallel batches
    const batchSize = 50;
    let linkedCount = 0;

    for (let i = 0; i < accountSkinLinks.length; i += batchSize) {
      const batch = accountSkinLinks.slice(i, i + batchSize);
      console.log(
        `Linking batch ${i}-${i + batch.length} of ${accountSkinLinks.length}...`
      );

      const results = await Promise.allSettled(
        batch.map(({ accountId, skinIds }) =>
          prisma.account.update({
            where: { id: accountId },
            data: {
              skins: {
                set: skinIds.map((id) => ({ id }))
              }
            }
          })
        )
      );

      for (let j = 0; j < results.length; j++) {
        if (results[j].status === "fulfilled") {
          linkedCount++;
        } else {
          console.error(
            `Error linking skins to account ${batch[j].accountId}:`,
            (results[j] as PromiseRejectedResult).reason?.message
          );
        }
      }
    }

    console.log(`Linked skins to ${linkedCount} accounts`);
    console.log("=== Skin Migration Completed ===\n");
  } catch (error) {
    console.error("Error during skin migration:", error);
    throw error;
  }
}

// Main migration function
async function main(): Promise<void> {
  console.log("Starting database migration...");
  console.log("This script migrates data from old schema to new schema");
  console.log("Make sure you have a backup of your database!\n");

  try {
    // Run migrations in sequence
    await migratePriceTiers();
    await migrateSkins();

    console.log("=== All Migrations Completed Successfully ===");
  } catch (error) {
    console.error("\n=== Migration Failed ===");
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error("Unhandled error:", error);
    process.exit(1);
  });
}

export { main as migrateDatabase };
