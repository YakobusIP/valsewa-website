"use client";

import { Fragment, useEffect, useMemo, useState } from "react";

import { fetchAccountsPublic } from "@/services/accountService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { AccountEntity } from "@/types/account.type";

import { cn } from "@/lib/utils";

import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";
import { DialogOverlay } from "./ui/dialog";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

type SearchModalProps = React.ComponentProps<"div"> & {
  onSelectAccount?: (id: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
  "C - NORMAL TIER",
  "B - NORMAL TIER",
  "V - NORMAL TIER",
  "S - NORMAL TIER",
  "SSS - NORMAL TIER",
  "SSS⁺ - NORMAL TIER",
  "C - LR TIER",
  "B - LR TIER",
  "V - LR TIER",
  "S - LR TIER",
  "SSS - LR TIER",
  "SSS⁺ - LR TIER"
] as const;
const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

function useDebouncedValue<T>(value: T, delay = 350) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export function SearchModal({
  onSelectAccount,
  open,
  onOpenChange
}: SearchModalProps) {
  const [q, setQ] = useState("");
  const debouncedQ = useDebouncedValue(q, 500);

  const [tierTab, setTierTab] = useState<TierTab>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_MIN,
    PRICE_MAX
  ]);

  const [selectedRanks, setSelectedRanks] = useState<string[]>([]);
  const [selectedSkins, setSelectedSkins] = useState<string[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState<AccountEntity[]>([]);
  const [page] = useState(undefined);
  const [limit] = useState(50);

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
        ? selectedTiers.map((t) => {
            const processed = t
              .toUpperCase()
              .trim()
              .replace(/\s*-\s*/g, "-")
              .replace(/\s+/g, "");

            if (processed.includes("NORMAL")) {
              return processed.split("-")[0];
            }

            return processed;
          })
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
    if (!open) return;
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
  }, [requestParams, open]);

  const toggle = (
    arr: string[],
    value: string,
    setArr: (v: string[]) => void
  ) => {
    if (arr.includes(value)) setArr(arr.filter((x) => x !== value));
    else setArr([...arr, value]);
  };

  return (
    <Fragment>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogOverlay
          className="
          fixed inset-0 z-50
          bg-black/60
          backdrop-blur-sm
        "
        />
        <DialogContent
          className="
          !fixed !left-[50%] !top-[50%] 
          !-translate-x-1/2 !-translate-y-1/2
          !z-[100]
          max-w-screen-large w-[95vw] h-[90vh] 
          p-0 overflow-y-auto
          bg-neutral-950 border-white
        "
        >
          <DialogTitle className="sr-only">Search Accounts</DialogTitle>
          <div className="w-full h-full flex flex-col">
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
              <div className="flex-1">
                <div className="w-full h-[70vh] grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4 px-4 md:px-4 py-4">
                  {/* LEFT FILTERS */}
                  <aside className=" h-[80vh] overflow-y-auto overscroll-contain pr-1 space-y-3">
                    <div className="text-sm text-neutral-300 font-medium">
                      Filters
                    </div>

                    <Accordion
                      type="multiple"
                      defaultValue={["price", "ranks", "skins", "tiers"]}
                      className="space-y-3"
                    >
                      <AccordionItem
                        value="price"
                        className="rounded-xl bg-black border-0"
                      >
                        <AccordionTrigger className="px-4 py-3 text-sm font-medium text-white hover:no-underline">
                          Price
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          {(() => {
                            const [minVal, maxVal] = priceRange;
                            const setMin = (next: number) => {
                              const newMin = clamp(next, PRICE_MIN, maxVal);
                              setPriceRange([newMin, maxVal]);
                            };

                            const setMax = (next: number) => {
                              const newMax = clamp(next, minVal, PRICE_MAX);
                              setPriceRange([minVal, newMax]);
                            };

                            return (
                              <div className="space-y-3">
                                {/* Inputs on top */}
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-1">
                                    <p className="text-[11px] text-neutral-400">
                                      Min
                                    </p>
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
                                    <p className="text-[11px] text-neutral-400">
                                      Max
                                    </p>
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
                                    setPriceRange([
                                      Math.min(a, b),
                                      Math.max(a, b)
                                    ]);
                                  }}
                                />

                                {/* Helper text */}
                                <div className="flex items-center justify-between text-xs text-neutral-400">
                                  <span>
                                    Rp {minVal.toLocaleString("id-ID")}
                                  </span>
                                  <span>
                                    Rp {maxVal.toLocaleString("id-ID")}
                                  </span>
                                </div>
                              </div>
                            );
                          })()}
                        </AccordionContent>
                      </AccordionItem>

                      {/* Ranks */}
                      <AccordionItem
                        value="ranks"
                        className="rounded-xl bg-black border-0"
                      >
                        <AccordionTrigger className="px-4 py-3 text-sm font-medium text-white hover:no-underline">
                          Ranks
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="space-y-2">
                            {RANKS.map((r) => {
                              const checked = selectedRanks.includes(r.id);

                              return (
                                <div
                                  key={r.id}
                                  className="flex items-center gap-3 rounded-lg p-3 py-2"
                                >
                                  <Checkbox
                                    id={`rank-${r.id}`}
                                    checked={checked}
                                    onCheckedChange={() =>
                                      toggle(
                                        selectedRanks,
                                        r.id,
                                        setSelectedRanks
                                      )
                                    }
                                    className="h-4 w-4 border-neutral-700 bg-white data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                                  />
                                  <Label
                                    htmlFor={`rank-${r.id}`}
                                    className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
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
                                  </Label>
                                </div>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Total Skin */}
                      <AccordionItem
                        value="skins"
                        className="rounded-xl bg-black border-0"
                      >
                        <AccordionTrigger className="px-4 py-3 text-sm font-medium text-white hover:no-underline">
                          Skins
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="space-y-2">
                            {SKIN_COUNTS.map((s) => {
                              const checked = selectedSkins.includes(s);

                              return (
                                <div
                                  key={s}
                                  className="flex items-center gap-3 rounded-lg p-3 py-2"
                                >
                                  <Checkbox
                                    id={`skin-${s}`}
                                    checked={checked}
                                    onCheckedChange={() =>
                                      toggle(selectedSkins, s, setSelectedSkins)
                                    }
                                    className="h-4 w-4 border-neutral-700 bg-white data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                                  />
                                  <Label
                                    htmlFor={`skin-${s}`}
                                    className="text-sm text-neutral-100 truncate cursor-pointer flex-1"
                                  >
                                    {s}
                                  </Label>
                                </div>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Tier Code */}
                      <AccordionItem
                        value="tiers"
                        className="rounded-xl bg-black border-0"
                      >
                        <AccordionTrigger className="px-4 py-3 text-sm font-medium text-white hover:no-underline">
                          Tiers
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="space-y-2">
                            {TIER_CODES.map((t) => {
                              const checked = selectedTiers.includes(t);

                              return (
                                <div
                                  key={t}
                                  className="flex items-center gap-3 rounded-lg p-3 py-2"
                                >
                                  <Checkbox
                                    id={`tier-${t}`}
                                    checked={checked}
                                    onCheckedChange={() =>
                                      toggle(selectedTiers, t, setSelectedTiers)
                                    }
                                    className="h-4 w-4 border-neutral-700 bg-white data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                                  />
                                  <Label
                                    htmlFor={`tier-${t}`}
                                    className="text-sm text-neutral-100 truncate cursor-pointer flex-1"
                                  >
                                    {t}
                                  </Label>
                                </div>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </aside>

                  {/* RIGHT RESULTS */}
                  <section className="h-[80vh] flex flex-col rounded-2xl bg-neutral-950/40">
                    {/* Tabs */}
                    <div className="p-3 md:p-4 border-b border-neutral-800">
                      <div className="grid grid-cols-3 gap-2 w-full">
                        <Button
                          type="button"
                          onClick={() => setTierTab("all")}
                          className={cn(
                            "h-16 w-full rounded-md px-5",
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
                            "h-16 w-full rounded-md px-5",
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
                            "h-16 w-full rounded-md px-5",
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
                    <div className="flex-1 overflow-y-auto overscroll-contain p-3 md:p-4 space-y-3">
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
                            <Link
                              key={acc.id}
                              href={`/details/${acc.id}`}
                              onClick={() => {
                                onSelectAccount?.(acc.id.toString());
                              }}
                              className="block w-full text-left rounded-xl bg-neutral-900/40 hover:bg-red-600 transition px-4 py-3"
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
                                    width={84}
                                    height={84}
                                    className="w-24 h-24 sm:w-[60px] sm:h-[60px] shrink-0"
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
                                <div className="relative w-72 h-40 rounded-lg border border-neutral-800 bg-neutral-950 shrink-0">
                                  {acc.thumbnail.imageUrl ? (
                                    <Image
                                      src={acc.thumbnail.imageUrl}
                                      alt={`${acc.accountCode} thumbnail`}
                                      fill
                                      sizes="150px"
                                      className="object-cover"
                                      quality={100}
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-neutral-500">
                                      No Image
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Link>
                          );
                        })
                      )}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
