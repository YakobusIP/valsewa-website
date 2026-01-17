"use client";

import { useEffect, useMemo, useState } from "react";

import { fetchAccountsPublic } from "@/services/accountService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { AccountEntity } from "@/types/account.type";

import { cn } from "@/lib/utils";

import { ChevronDown, ChevronUp, Search } from "lucide-react";
import Image from "next/image";

import { Slider } from "./ui/slider";

type SearchModalProps = React.ComponentProps<"div"> & {
  onClose?: () => void;
  onSelectAccount?: (id: string) => void;
};

type TierTab = "all" | "low" | "normal";

const PRICE_MIN = 0;
const PRICE_MAX = 1_000_000;

const RANKS = [
  {
    id: "Unrated",
    name: "UNRATED",
    image: "/rank/unranked.webp"
  },
  {
    id: "Iron",
    name: "IRON",
    image: "/rank/iron 3.svg"
  },
  {
    id: "Bronze",
    name: "BRONZE",
    image: "/rank/bronze 3.svg"
  },
  {
    id: "Silver",
    name: "SILVER",
    image: "/rank/silver 3.svg"
  },
  {
    id: "Gold",
    name: "GOLD",
    image: "/rank/gold 3.svg"
  },
  {
    id: "Platinum",
    name: "PLATINUM",
    image: "/rank/platinum 3.svg"
  },
  {
    id: "Diamond",
    name: "DIAMOND",
    image: "/rank/diamond 3.svg"
  },
  {
    id: "Ascendant",
    name: "ASCENDANT",
    image: "/rank/ascendant 3.svg"
  },
  {
    id: "Immortal",
    name: "IMMORTAL",
    image: "/rank/immortal 3.svg"
  },
  {
    id: "Radiant",
    name: "RADIANT",
    image: "/rank/radiant.svg"
  }
];

const SKIN_COUNTS = ["0-5", "6-10", "11-15", "16-20"] as const;
const TIER_CODES = [
  "c",
  "B",
  "V",
  "S",
  "SSS",
  "SSS⁺",
  "C - LR TIER",
  "B - LR TIER",
  "V - LR TIER",
  "S - LR TIER",
  "SSS - LR TIER",
  "SSS⁺ - LR TIER"
] as const;
const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

function Section({
  title,
  open,
  onToggle,
  children
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-black overflow-y-auto">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between pr-4 py-3 text-left"
      >
        <span className="text-sm font-medium text-white">{title}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-neutral-300" />
        ) : (
          <ChevronDown className="h-4 w-4 text-neutral-300" />
        )}
      </button>

      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

function useDebouncedValue<T>(value: T, delay = 350) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

function CheckboxRow({
  checked,
  onCheckedChange,
  children
}: {
  checked: boolean;
  onCheckedChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label
      className="flex items-center gap-3 rounded-lg p-3 py-2
        cursor-pointer select-none transition"
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onCheckedChange}
        className="h-4 w-4 accent-red-600"
      />
      <div className="flex items-center gap-3 min-w-0">{children}</div>
    </label>
  );
}

export function SearchModal({
  className,
  onSelectAccount,
  ...props
}: SearchModalProps) {
  const [q, setQ] = useState("");
  const debouncedQ = useDebouncedValue(q, 350);

  const [tierTab, setTierTab] = useState<TierTab>("all");

  const [openPrice, setOpenPrice] = useState(true);
  const [openRanks, setOpenRanks] = useState(true);
  const [openSkins, setOpenSkins] = useState(true);
  const [openTier, setOpenTier] = useState(true);

  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_MIN,
    PRICE_MAX
  ]);

  const [selectedRanks, setSelectedRanks] = useState<string[]>([]);
  const [selectedSkins, setSelectedSkins] = useState<string[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState<AccountEntity[]>([]);
  const [page] = useState(1);
  const [limit] = useState(12);

  useEffect(() => {
    document.title = "Search | Valsewa";
  }, []);

  const requestParams = useMemo(() => {
    const lowTierOnly =
      tierTab === "all" ? undefined : tierTab === "low" ? true : false;

    return {
      page,
      limit,
      q: debouncedQ?.trim() || undefined,
      low_tier_only: lowTierOnly,
      tiers: selectedTiers.length
        ? selectedTiers.map((t) =>
            t
              .toUpperCase()
              .trim()
              .replace(/\s*-\s*/g, "-")
              .replace(/\s+/g, "")
          )
        : undefined,
      skin_counts: selectedSkins.length ? selectedSkins : undefined,
      ranks: selectedRanks.length ? selectedRanks : undefined,
      min_price: priceRange[0],
      max_price: priceRange[1],
      sortBy: "rank",
      direction: "desc" as const
    };
  }, [
    page,
    limit,
    debouncedQ,
    tierTab,
    selectedTiers,
    selectedSkins,
    selectedRanks,
    priceRange
  ]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setIsLoading(true);
      const res = await fetchAccountsPublic(requestParams);
      if (!cancelled) {
        setAccounts(res ?? []);
        setIsLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [requestParams]);

  const toggle = (
    arr: string[],
    value: string,
    setArr: (v: string[]) => void
  ) => {
    if (arr.includes(value)) setArr(arr.filter((x) => x !== value));
    else setArr([...arr, value]);
  };

  return (
    <div
      className={cn("w-full h-full bg-black overflow-hidden", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl w-full h-full px-4 md:px-8 py-4 flex flex-col gap-4">
        {/* search bar */}
        <div
          className="rounded-2xl border border-neutral-800
        bg-neutral-950/70 backdrop-blur
        px-4 md:px-6 py-4"
        >
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search..."
                className="pl-9 h-11 rounded-xl bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-400 focus-visible:ring-red-600/40"
              />
            </div>
          </div>

          {/* MAIN */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <div className="mx-auto max-w-6xl h-full grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4 px-4 md:px-4 py-4">
              {/* LEFT FILTERS */}
              <aside className="h-full min-h-0 overflow-y-auto overscroll-contain pr-1 space-y-3">
                <div className="text-sm text-neutral-300 font-medium">
                  Filters
                </div>

                {/* Price */}
                <Section
                  title="Price"
                  open={openPrice}
                  onToggle={() => setOpenPrice((v) => !v)}
                >
                  {(() => {
                    const [minVal, maxVal] = priceRange;
                    const setMin = (next: number) => {
                      // clamp min to [PRICE_MIN .. current maxVal]
                      const newMin = clamp(next, PRICE_MIN, maxVal);
                      setPriceRange([newMin, maxVal]);
                    };

                    const setMax = (next: number) => {
                      // clamp max to [current minVal .. PRICE_MAX]
                      const newMax = clamp(next, minVal, PRICE_MAX);
                      setPriceRange([minVal, newMax]);
                    };

                    return (
                      <div className="space-y-3">
                        {/* Inputs on top */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <p className="text-[11px] text-neutral-400">Min</p>
                            <Input
                              type="number"
                              inputMode="numeric"
                              value={minVal}
                              min={PRICE_MIN}
                              max={maxVal}
                              step={5000}
                              onChange={(e) =>
                                setMin(Number(e.target.value || 0))
                              }
                              className="h-10 rounded-lg bg-neutral-900 border-neutral-800 text-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <p className="text-[11px] text-neutral-400">Max</p>
                            <Input
                              type="number"
                              inputMode="numeric"
                              value={maxVal}
                              min={minVal}
                              max={PRICE_MAX}
                              step={5000}
                              onChange={(e) =>
                                setMax(Number(e.target.value || 0))
                              }
                              className="h-10 rounded-lg bg-neutral-900 border-neutral-800 text-white"
                            />
                          </div>
                        </div>

                        {/* One slider with TWO thumbs */}
                        <Slider
                          value={[minVal, maxVal]}
                          min={PRICE_MIN}
                          max={PRICE_MAX}
                          step={5000}
                          onValueChange={(v) => {
                            const a = v[0] ?? PRICE_MIN;
                            const b = v[1] ?? PRICE_MAX;
                            setPriceRange([Math.min(a, b), Math.max(a, b)]);
                          }}
                        />

                        {/* Helper text */}
                        <div className="flex items-center justify-between text-xs text-neutral-400">
                          <span>Rp {minVal.toLocaleString("id-ID")}</span>
                          <span>Rp {maxVal.toLocaleString("id-ID")}</span>
                        </div>
                      </div>
                    );
                  })()}
                </Section>

                {/* Ranks */}
                <Section
                  title="Ranks"
                  open={openRanks}
                  onToggle={() => setOpenRanks((v) => !v)}
                >
                  <div className="space-y-2">
                    {RANKS.map((r) => {
                      const checked = selectedRanks.includes(r.id);

                      return (
                        <CheckboxRow
                          key={r.id}
                          checked={checked}
                          onCheckedChange={() =>
                            toggle(selectedRanks, r.id, setSelectedRanks)
                          }
                        >
                          <div className="relative w-6 h-6 shrink-0">
                            <Image
                              src={r.image}
                              alt={r.id}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="text-sm text-neutral-100 truncate">
                            {r.id}
                          </span>
                        </CheckboxRow>
                      );
                    })}
                  </div>
                </Section>

                {/* Total Skin */}
                <Section
                  title="Skins"
                  open={openSkins}
                  onToggle={() => setOpenSkins((v) => !v)}
                >
                  <div className="space-y-2">
                    {SKIN_COUNTS.map((s) => {
                      const checked = selectedSkins.includes(s);

                      return (
                        <CheckboxRow
                          key={s}
                          checked={checked}
                          onCheckedChange={() =>
                            toggle(selectedSkins, s, setSelectedSkins)
                          }
                        >
                          <span className="text-sm text-neutral-100 truncate">
                            {s}
                          </span>
                        </CheckboxRow>
                      );
                    })}
                  </div>
                </Section>

                {/* Tier Code */}
                <Section
                  title="Tiers"
                  open={openTier}
                  onToggle={() => setOpenTier((v) => !v)}
                >
                  <div className="space-y-2">
                    {TIER_CODES.map((t) => {
                      const checked = selectedTiers.includes(t);

                      return (
                        <CheckboxRow
                          key={t}
                          checked={checked}
                          onCheckedChange={() =>
                            toggle(selectedTiers, t, setSelectedTiers)
                          }
                        >
                          <span className="text-sm text-neutral-100 truncate">
                            {t}
                          </span>
                        </CheckboxRow>
                      );
                    })}
                  </div>
                </Section>
              </aside>

              {/* RIGHT RESULTS */}
              <section className="h-full flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col rounded-2xl bg-neutral-950/40">
                {/* Tabs + count */}
                <div className="p-3 md:p-4 border-b border-neutral-800">
                  <div className="grid grid-cols-3 gap-2 w-full">
                    <Button
                      type="button"
                      onClick={() => setTierTab("all")}
                      className={cn(
                        "h-10 w-full rounded-md px-5",
                        tierTab === "all"
                          ? "bg-white hover:bg-white text-black"
                          : "bg-black hover:bg-white hover:text-black text-neutral-200"
                      )}
                    >
                      All
                    </Button>

                    <Button
                      type="button"
                      onClick={() => setTierTab("low")}
                      className={cn(
                        "h-10 w-full rounded-md px-5",
                        tierTab === "low"
                          ? "bg-white hover:bg-white text-black"
                          : "bg-black hover:bg-white hover:text-black text-neutral-200"
                      )}
                    >
                      Low Rank Tier
                    </Button>

                    <Button
                      type="button"
                      onClick={() => setTierTab("normal")}
                      className={cn(
                        "h-10 w-full rounded-md px-5",
                        tierTab === "normal"
                          ? "bg-white hover:bg-white text-black"
                          : "bg-black hover:bg-white hover:text-black text-neutral-200"
                      )}
                    >
                      Normal Tier
                    </Button>
                  </div>
                </div>

                {/* List */}
                <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 md:p-4 space-y-3">
                  {isLoading ? (
                    <div className="text-sm text-neutral-400 text-center py-10">
                      Loading accounts...
                    </div>
                  ) : accounts.length === 0 ? (
                    <div className="text-sm text-neutral-400 text-center py-10">
                      No accounts found.
                    </div>
                  ) : (
                    accounts.map((acc) => {
                      return (
                        <button
                          key={acc.id}
                          onClick={() => {
                            onSelectAccount?.(acc.id.toString());
                          }}
                          className="w-full text-left rounded-xl bg-neutral-900/40 hover:bg-red-600 transition px-4 py-3"
                        >
                          <div className="flex items-center justify-between gap-3">
                            {/* LEFT (new snippet style) */}
                            <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                              <Image
                                src={
                                  RANKS.find((i) =>
                                    acc.accountRank.startsWith(i.id)
                                  )?.image ?? "/rank/default.svg"
                                }
                                width={42}
                                height={42}
                                className="w-7 h-7 sm:w-[42px] sm:h-[42px] shrink-0"
                                alt="Rank"
                              />

                              <div className="flex flex-col gap-0 min-w-0">
                                {/* Title line */}
                                <div className="flex items-center gap-2 min-w-0">
                                  <p className="text-white font-semibold text-[0.7rem] sm:text-sm truncate">
                                    {acc.accountRank} | {acc.accountCode}
                                  </p>

                                  {acc.isRecommended && (
                                    <span className="shrink-0 text-[11px] px-2 py-[2px] rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                                      Recommended
                                    </span>
                                  )}
                                </div>

                                {/* Tier pill row (below) */}
                                <span className="flex items-start justify-start mt-1">
                                  <span
                                    className="
                                    inline-flex items-center justify-center text-center
                                    text-[0.6rem] sm:text-xs font-bold text-white bg-red-600
                                    h-5 rounded px-2 shrink-0
                                  "
                                  >
                                    {acc.priceTier?.code ?? "-"}
                                  </span>
                                </span>
                              </div>
                            </div>

                            {/* RIGHT thumbnail (unchanged positioning, far right) */}
                            <div className="relative w-14 h-14 rounded-lg border border-neutral-800 bg-neutral-950 shrink-0">
                              {acc.thumbnail.imageUrl ? (
                                <Image
                                  src={acc.thumbnail.imageUrl}
                                  alt={`${acc.accountCode} thumbnail`}
                                  fill
                                  sizes="56px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[10px] text-neutral-500">
                                  No Image
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
