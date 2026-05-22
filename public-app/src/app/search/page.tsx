import CatalogueClient from "./catalogue-client";

import { fetchAccountsPublic } from "@/services/accountService";
import { fetchSkinsByIds } from "@/services/skin.service";

import { SORT_MAP } from "@/lib/catalogue-filters";

import {
  buildDescription,
  buildTitle,
  parseSearchParams,
  processTiers,
  serializeFilters,
  PRICE_MIN,
  PRICE_MAX
} from "@/lib/catalogue-filters";

import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  searchParams
}: SearchPageProps): Promise<Metadata> {
  const sp = await searchParams;
  const f = parseSearchParams(sp);
  return {
    title: buildTitle(f),
    description: buildDescription(f),
    alternates: {
      canonical: `/search${serializeFilters(f, { sortKeys: true })}`
    }
  };
}

export default async function CataloguePage({ searchParams }: SearchPageProps) {
  const sp = await searchParams;
  const f = parseSearchParams(sp);
  const { sortBy, direction } = SORT_MAP[f.sort];

  const [accounts, selectedSkins] = await Promise.all([
    fetchAccountsPublic({
      limit: 50,
      ranks: f.ranks.length ? f.ranks : undefined,
      tiers: f.tiers.length ? processTiers(f.tiers) : undefined,
      skin_ids: f.skinIds.length ? f.skinIds : undefined,
      min_price: f.minPrice > PRICE_MIN ? f.minPrice : undefined,
      max_price: f.maxPrice < PRICE_MAX ? f.maxPrice : undefined,
      sortBy,
      direction
    }),
    fetchSkinsByIds(f.skinIds)
  ]);

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <CatalogueClient
        initialAccounts={accounts ?? []}
        initialFilters={f}
        initialSelectedSkins={selectedSkins}
      />
    </div>
  );
}
