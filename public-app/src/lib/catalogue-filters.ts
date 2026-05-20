export type SortOption =
  | "rank"
  | "dateAdded"
  | "mostRented"
  | "cheapest"
  | "availableNow";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "rank", label: "Rank" },
  { value: "dateAdded", label: "Date Added" },
  { value: "mostRented", label: "Most Rented" },
  { value: "cheapest", label: "Cheapest" },
  { value: "availableNow", label: "Available Now" }
];

export const SORT_MAP: Record<
  SortOption,
  { sortBy: string; direction: "asc" | "desc" }
> = {
  rank: { sortBy: "rank", direction: "desc" },
  dateAdded: { sortBy: "id", direction: "desc" },
  mostRented: { sortBy: "totalRentHour", direction: "desc" },
  cheapest: { sortBy: "price_tier", direction: "desc" },
  availableNow: { sortBy: "availability", direction: "asc" }
};

export type CatalogueFilters = {
  ranks: string[];
  tiers: string[];
  skinIds: number[];
  minPrice: number;
  maxPrice: number;
  sort: SortOption;
};

export const PRICE_MIN = 0;
export const PRICE_MAX = 1_000_000;

export const DEFAULT_FILTERS: CatalogueFilters = {
  ranks: [],
  tiers: [],
  skinIds: [],
  minPrice: PRICE_MIN,
  maxPrice: PRICE_MAX,
  sort: "rank"
};

const VALID_SORTS: SortOption[] = [
  "rank",
  "dateAdded",
  "mostRented",
  "cheapest",
  "availableNow"
];

type SearchParamsInput = Record<string, string | string[] | undefined>;

function readCsv(v: string | string[] | undefined): string[] {
  if (v == null) return [];
  const raw = Array.isArray(v) ? v.join(",") : v;
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function clampInt(v: string | string[] | undefined, lo: number, hi: number) {
  const raw = Array.isArray(v) ? v[0] : v;
  if (!raw) return null;
  const n = Number(raw);
  if (!Number.isFinite(n)) return null;
  return Math.min(hi, Math.max(lo, Math.trunc(n)));
}

export function parseSearchParams(sp: SearchParamsInput): CatalogueFilters {
  const sortRaw = Array.isArray(sp.sort) ? sp.sort[0] : sp.sort;
  const sort = (VALID_SORTS as string[]).includes(sortRaw ?? "")
    ? (sortRaw as SortOption)
    : DEFAULT_FILTERS.sort;

  const minPrice = clampInt(sp.minPrice, PRICE_MIN, PRICE_MAX) ?? PRICE_MIN;
  const maxPriceRaw = clampInt(sp.maxPrice, PRICE_MIN, PRICE_MAX);
  const maxPrice = maxPriceRaw ?? PRICE_MAX;

  const skinIds = readCsv(sp.skinIds)
    .map((s) => Number(s))
    .filter((n) => Number.isFinite(n) && n > 0);

  return {
    ranks: readCsv(sp.ranks),
    tiers: readCsv(sp.tiers),
    skinIds,
    minPrice: Math.min(minPrice, maxPrice),
    maxPrice: Math.max(minPrice, maxPrice),
    sort
  };
}

export function serializeFilters(
  f: CatalogueFilters,
  opts: { sortKeys?: boolean } = {}
): string {
  const entries: [string, string][] = [];
  if (f.ranks.length) entries.push(["ranks", f.ranks.join(",")]);
  if (f.tiers.length) entries.push(["tiers", f.tiers.join(",")]);
  if (f.skinIds.length) entries.push(["skinIds", f.skinIds.join(",")]);
  if (f.minPrice !== DEFAULT_FILTERS.minPrice)
    entries.push(["minPrice", String(f.minPrice)]);
  if (f.maxPrice !== DEFAULT_FILTERS.maxPrice)
    entries.push(["maxPrice", String(f.maxPrice)]);
  if (f.sort !== DEFAULT_FILTERS.sort) entries.push(["sort", f.sort]);

  if (!entries.length) return "";
  if (opts.sortKeys) entries.sort(([a], [b]) => a.localeCompare(b));

  const sp = new URLSearchParams();
  for (const [k, v] of entries) sp.set(k, v);
  return `?${sp.toString()}`;
}

export function processTiers(tiers: string[]): string[] {
  return tiers.map((t) =>
    t
      .toUpperCase()
      .trim()
      .replace(/\s*-\s*/g, "-")
      .replace(/\s+/g, "")
  );
}

function formatRupiah(n: number): string {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export function buildTitle(f: CatalogueFilters): string {
  const parts: string[] = [];
  if (f.ranks.length) parts.push(f.ranks.join(", "));
  if (f.tiers.length) parts.push(`${f.tiers.join(", ")} tier`);

  const priceClause =
    f.minPrice !== PRICE_MIN && f.maxPrice !== PRICE_MAX
      ? `${formatRupiah(f.minPrice)}–${formatRupiah(f.maxPrice)}`
      : f.minPrice !== PRICE_MIN
        ? `from ${formatRupiah(f.minPrice)}`
        : f.maxPrice !== PRICE_MAX
          ? `under ${formatRupiah(f.maxPrice)}`
          : null;

  const lead = parts.length ? `${parts.join(" · ")} accounts` : "Catalogue";
  const tail = priceClause ? ` ${priceClause}` : "";
  return `${lead}${tail} | Valsewa`;
}

export function buildDescription(f: CatalogueFilters): string {
  const bits: string[] = [];
  if (f.ranks.length) bits.push(`ranks: ${f.ranks.join(", ")}`);
  if (f.tiers.length) bits.push(`tiers: ${f.tiers.join(", ")}`);
  if (f.skinIds.length) bits.push(`${f.skinIds.length} skin filter(s)`);
  if (f.minPrice !== PRICE_MIN || f.maxPrice !== PRICE_MAX) {
    bits.push(
      `price ${formatRupiah(f.minPrice)}–${formatRupiah(f.maxPrice)}`
    );
  }
  if (!bits.length) {
    return "Browse our full inventory of premium Valorant accounts.";
  }
  return `Premium Valorant accounts filtered by ${bits.join("; ")}. Browse and rent from Valsewa.`;
}
