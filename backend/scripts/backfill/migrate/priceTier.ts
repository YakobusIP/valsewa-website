import {
  buildPriceTierDescription,
  lrCode,
  SourcePriceListRow
} from "../utils";

export type PriceTierIdMap = {
  normalByCode: Map<string, number>; // "S" -> id
  lowByCode: Map<string, number>; // "S" -> LR-S id
};

export async function migratePriceTiers(
  tx: any,
  source: any
): Promise<PriceTierIdMap> {
  const tiers = await source.priceTier.findMany({
    include: { priceList: true }
  });

  const normalByCode = new Map<string, number>();
  const lowByCode = new Map<string, number>();

  let created = 0;

  // 1) Insert NORMAL tiers with preserved IDs
  for (const tier of tiers) {
    const priceList = tier.priceList as unknown as SourcePriceListRow[];

    const normal = await tx.priceTier.create({
      data: {
        id: tier.id,
        code: tier.code,
        description: buildPriceTierDescription(priceList, "NORMAL"),
        createdAt: tier.createdAt,
        updatedAt: tier.updatedAt
      },
      select: { id: true, code: true }
    });

    normalByCode.set(normal.code, normal.id);
    created += 1;
  }

  // 2) Reset sequence so autoincrement won't collide
  await resetPriceTierSequence(tx);

  // 3) Insert LR tiers (no explicit id)
  for (const tier of tiers) {
    const priceList = tier.priceList as unknown as SourcePriceListRow[];

    const hasLow =
      priceList.length > 0 &&
      priceList.some((p) => p.lowPrice !== null && p.lowPrice !== undefined);

    if (!hasLow) continue;

    const low = await tx.priceTier.create({
      data: {
        code: lrCode(tier.code),
        description: buildPriceTierDescription(priceList, "LOW"),
        createdAt: tier.createdAt,
        updatedAt: tier.updatedAt
      },
      select: { id: true }
    });

    lowByCode.set(tier.code, low.id);
    created += 1;
  }

  console.log(
    `✓ PriceTier migrated: ${created} rows (from ${tiers.length} tiers)`
  );
  return { normalByCode, lowByCode };
}

async function resetPriceTierSequence(tx: any) {
  await tx.$executeRawUnsafe(`
    SELECT setval(
      pg_get_serial_sequence('"PriceTier"', 'id'),
      COALESCE((SELECT MAX(id) FROM "PriceTier"), 1),
      true
    );
  `);
}
