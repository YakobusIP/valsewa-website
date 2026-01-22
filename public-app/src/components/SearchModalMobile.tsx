"use client";

import { useEffect, useMemo, useState } from "react";

import { fetchAccountsPublic } from "@/services/accountService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { AccountEntity } from "@/types/account.type";

import { ListFilter, Search } from "lucide-react";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

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

function useDebouncedValue<T>(value: T, delay = 350) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

type FiltersPanelProps = {
  onClose: () => void;
  onBack: () => void;
  openPrice: boolean;
  setOpenPrice: (v: boolean) => void;
  openRanks: boolean;
  setOpenRanks: (v: boolean) => void;
  openSkins: boolean;
  setOpenSkins: (v: boolean) => void;
  openTier: boolean;
  setOpenTier: (v: boolean) => void;
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
  selectedRanks: string[];
  setSelectedRanks: (v: string[]) => void;
  selectedSkins: string[];
  setSelectedSkins: (v: string[]) => void;
  selectedTiers: string[];
  setSelectedTiers: (v: string[]) => void;
  toggle: (arr: string[], value: string, setArr: (v: string[]) => void) => void;
  activeFilterCount: number;
  onClearFilters: () => void;
};

function FiltersPanel({
  onClose,
  onBack,
  priceRange,
  setPriceRange,
  selectedRanks,
  setSelectedRanks,
  selectedSkins,
  setSelectedSkins,
  selectedTiers,
  setSelectedTiers,
  toggle,
  activeFilterCount,
  onClearFilters
}: FiltersPanelProps) {
  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      {/* Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-neutral-800 shrink-0">
        <button
          onClick={onBack}
          className="w-10 h-10 grid place-items-center rounded-lg hover:bg-white/10 text-white"
          aria-label="Back"
        >
          ←
        </button>

        <div className="font-semibold text-white">
          <figure className="sm:w-[210px] w-[150px]">
            <Image
              src="/header/VALSEWA.png"
              alt="logo"
              height={80}
              width={210}
              className="object-contain"
              priority
            />
          </figure>
        </div>

        <button
          onClick={onClose}
          className="w-10 h-10 grid place-items-center rounded-lg hover:bg-white/10 text-white"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Title row */}
      <div className="px-4 py-3 shrink-0">
        <div className="flex items-center justify-between">
          {/* Left */}
          <div className="text-white font-semibold">FILTERS</div>

          {/* Right */}
          <button
            type="button"
            onClick={onClearFilters}
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition"
          >
            {activeFilterCount > 0 && (
              <span className="min-w-5 h-5 px-1 rounded-full bg-red-600 text-white text-xs grid place-items-center">
                {activeFilterCount}
              </span>
            )}
            <span className="font-medium">Clear Filter</span>
          </button>
        </div>
      </div>

      {/* Filters content (scrolls) */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 pb-6 space-y-3">
        <Accordion
          type="multiple"
          defaultValue={["price", "ranks", "skins", "tiers"]}
          className="space-y-3"
        >
          <AccordionItem value="price" className="rounded-xl bg-black border-0">
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
                        <p className="text-[11px] text-neutral-400">Min</p>
                        <Input
                          type="number"
                          inputMode="numeric"
                          value={minVal}
                          min={PRICE_MIN}
                          max={maxVal}
                          step={5000}
                          onChange={(e) => setMin(Number(e.target.value || 0))}
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
                          onChange={(e) => setMax(Number(e.target.value || 0))}
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
            </AccordionContent>
          </AccordionItem>

          {/* Ranks */}
          <AccordionItem value="ranks" className="rounded-xl bg-black border-0">
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
                          toggle(selectedRanks, r.id, setSelectedRanks)
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
          <AccordionItem value="skins" className="rounded-xl bg-black border-0">
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
          <AccordionItem value="tiers" className="rounded-xl bg-black border-0">
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
      </div>
    </div>
  );
}

function ResultsPanel({
  q,
  setQ,
  tierTab,
  setTierTab,
  accounts,
  isLoading,
  onClose,
  onOpenFilters,
  onSelectAccount
}: {
  q: string;
  setQ: (v: string) => void;
  tierTab: TierTab;
  setTierTab: (v: TierTab) => void;
  accounts: AccountEntity[];
  isLoading: boolean;
  onClose: () => void;
  onOpenFilters: () => void;
  activeFilterCount: number;
  onSelectAccount?: (id: string) => void;
}) {
  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      {/* Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-neutral-800 shrink-0">
        <div className="w-10" /> {/* left spacer */}
        <div className="flex items-center justify-center flex-1">
          <figure className="sm:w-[210px] w-[150px]">
            <Image
              src="/header/VALSEWA.png"
              alt="logo"
              height={80}
              width={210}
              className="object-contain"
              priority
            />
          </figure>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 grid place-items-center rounded-lg hover:bg-white/10 text-white"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Search row */}
      <div className="px-4 pt-3 shrink-0">
        <div
          className="
              w-full h-12 flex items-center gap-2 rounded-2xl bg-neutral-700/80 px-3 shadow-[0_6px_18px_rgba(0,0,0,0.35)] ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-red-600/40
            "
        >
          {/* Left icon */}
          <Search className="h-5 w-5 text-white/80 shrink-0" />

          {/* Input (inside pill) */}
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
            className="
                flex-1
                h-10
                border-0 bg-transparent
                px-1
                text-white placeholder:text-white/70
                focus-visible:ring-0 focus-visible:ring-offset-0
              "
          />

          {/* Filter button (inside pill, at the end) */}
          <button
            type="button"
            onClick={onOpenFilters}
            className="
                relative
                h-9 w-9
                rounded-xl
                bg-black/40
                border border-white/10
                grid place-items-center
                active:scale-[0.98]
                transition
              "
            aria-label="Open filters"
          >
            <ListFilter className="h-5 w-5 text-white/90" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 py-3 border-b border-neutral-800 shrink-0">
        <div className="grid grid-cols-3 gap-2">
          <Button
            type="button"
            onClick={() => setTierTab("all")}
            className={
              tierTab === "all"
                ? "bg-white hover:bg-white text-black"
                : "bg-black hover:bg-white hover:text-black text-neutral-200"
            }
          >
            All
          </Button>
          <Button
            type="button"
            onClick={() => setTierTab("low")}
            className={
              tierTab === "low"
                ? "bg-white hover:bg-white text-black"
                : "bg-black hover:bg-white hover:text-black text-neutral-200"
            }
          >
            Low Rank
          </Button>
          <Button
            type="button"
            onClick={() => setTierTab("normal")}
            className={
              tierTab === "normal"
                ? "bg-white hover:bg-white text-black"
                : "bg-black hover:bg-white hover:text-black text-neutral-200"
            }
          >
            Normal
          </Button>
        </div>
      </div>

      {/* List (scrolls) */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-3 space-y-3">
        {isLoading ? (
          <div className="text-sm text-neutral-400 text-center py-10">
            Loading accounts...
          </div>
        ) : accounts.length === 0 ? (
          <div className="text-sm text-neutral-400 text-center py-10">
            No accounts found.
          </div>
        ) : (
          accounts.map((acc) => (
            <button
              key={acc.id}
              onClick={() => onSelectAccount?.(acc.id.toString())}
              className="w-full text-left rounded-xl bg-neutral-900/40 hover:bg-red-600 transition px-4 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                {/* LEFT (new snippet style) */}
                <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                  <Image
                    src={
                      RANKS.find((i) => acc.accountRank.startsWith(i.id))
                        ?.image ?? "/rank/default.svg"
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
          ))
        )}
      </div>
    </div>
  );
}

function countActiveFilters({
  selectedRanks,
  selectedSkins,
  selectedTiers,
  priceRange
}: {
  selectedRanks: string[];
  selectedSkins: string[];
  selectedTiers: string[];
  priceRange: [number, number];
}) {
  let count = 0;

  if (selectedRanks.length) count += selectedRanks.length;
  if (selectedSkins.length) count += selectedSkins.length;
  if (selectedTiers.length) count += selectedTiers.length;

  const [min, max] = priceRange;
  if (min !== PRICE_MIN || max !== PRICE_MAX) count++;

  return count;
}

type Panel = "results" | "filters";

export function SearchModalMobile({
  open,
  onClose,
  onSelectAccount
}: {
  open: boolean;
  onClose: () => void;
  onSelectAccount?: (id: string) => void;
}) {
  const [panel, setPanel] = useState<Panel>("results");

  // --- your existing state ---
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
  const [page] = useState(undefined);
  const [limit] = useState(50);

  // close resets panel
  useEffect(() => {
    if (!open) setPanel("results");
  }, [open]);

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
  }, [open, requestParams]);

  const activeFilterCount = useMemo(
    () =>
      countActiveFilters({
        selectedRanks,
        selectedSkins,
        selectedTiers,
        priceRange
      }),
    [selectedRanks, selectedSkins, selectedTiers, priceRange]
  );

  const onClearFilters = () => {
    setSelectedRanks([]);
    setSelectedSkins([]);
    setSelectedTiers([]);
    setPriceRange([PRICE_MIN, PRICE_MAX]);
  };

  const toggle = (
    arr: string[],
    value: string,
    setArr: (v: string[]) => void
  ) => {
    if (arr.includes(value)) setArr(arr.filter((x) => x !== value));
    else setArr([...arr, value]);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="absolute inset-0 flex items-center justify-center"
        onClick={onClose}
      >
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          className="
            w-full h-dvh
            bg-black
            overflow-hidden
            flex flex-col
          "
        >
          {/* Panels */}
          {panel === "results" ? (
            <ResultsPanel
              q={q}
              setQ={setQ}
              tierTab={tierTab}
              setTierTab={setTierTab}
              accounts={accounts}
              isLoading={isLoading}
              onClose={onClose}
              onOpenFilters={() => setPanel("filters")}
              activeFilterCount={activeFilterCount}
              onSelectAccount={onSelectAccount}
            />
          ) : (
            <FiltersPanel
              onClose={onClose}
              onBack={() => setPanel("results")}
              openPrice={openPrice}
              setOpenPrice={setOpenPrice}
              openRanks={openRanks}
              setOpenRanks={setOpenRanks}
              openSkins={openSkins}
              setOpenSkins={setOpenSkins}
              openTier={openTier}
              setOpenTier={setOpenTier}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedRanks={selectedRanks}
              setSelectedRanks={setSelectedRanks}
              selectedSkins={selectedSkins}
              setSelectedSkins={setSelectedSkins}
              selectedTiers={selectedTiers}
              setSelectedTiers={setSelectedTiers}
              toggle={toggle}
              activeFilterCount={activeFilterCount}
              onClearFilters={onClearFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
}
