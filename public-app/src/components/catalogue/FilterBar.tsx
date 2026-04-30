"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { Skin } from "@/types/skin.type";

import { cn } from "@/lib/utils";

import { RotateCcw, Search, X } from "lucide-react";
import Image from "next/image";

import { PriceDropdown } from "./PriceDropdown";
import { RankDropdown } from "./RankDropdown";
import { SkinSearchModal } from "./SkinSearchModal";
import { TierDropdown } from "./TierDropdown";

interface FilterBarProps {
  selectedRanks: string[];
  onRanksChange: (ranks: string[]) => void;
  selectedTiers: string[];
  onTiersChange: (tiers: string[]) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  selectedSkins: Skin[];
  onSkinsChange: (skins: Skin[]) => void;
  onResetAll: () => void;
  onAnyFilterChange: () => void;
  fallbackSkins?: Skin[];
  onOpenDailyDrop?: () => void;
}

const PRICE_MAX = 1_000_000;

export function FilterBar({
  selectedRanks,
  onRanksChange,
  selectedTiers,
  onTiersChange,
  priceRange,
  onPriceChange,
  selectedSkins,
  onSkinsChange,
  onResetAll,
  onAnyFilterChange,
  onOpenDailyDrop
}: FilterBarProps) {
  const [skinModalOpen, setSkinModalOpen] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { rootMargin: "-92px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const measureRef = useRef<HTMLDivElement>(null);
  const [truncateAt, setTruncateAt] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (!measureRef.current || selectedSkins.length === 0) {
      setTruncateAt(null);
      return;
    }

    if (skinModalOpen) {
      return;
    }

    const measure = () => {
      const container = measureRef.current!;
      const containerWidth = container.offsetWidth;

      const chips = Array.from(container.children) as HTMLElement[];

      let totalWidth = 0;
      let fitCount = 0;

      for (let i = 0; i < chips.length; i++) {
        const chipWidth = chips[i].offsetWidth;

        // reserve space for "+N" chip if needed
        const remaining = selectedSkins.length - i - 1;
        const plusWidth = remaining > 0 ? 40 : 0; // approx "+99" width

        if (totalWidth + chipWidth + plusWidth > 0.9 * containerWidth) {
          break;
        }

        totalWidth += chipWidth + 8; // gap-2 = 8px
        fitCount++;
      }

      if (fitCount >= selectedSkins.length) {
        setTruncateAt(null);
      } else {
        setTruncateAt(fitCount);
      }
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(measureRef.current);

    return () => observer.disconnect();
  }, [selectedSkins, skinModalOpen]);

  const skinsToShow =
    truncateAt !== null ? selectedSkins.slice(0, truncateAt) : selectedSkins;
  const hiddenCount =
    truncateAt !== null ? selectedSkins.length - truncateAt : 0;

  const removeSkin = (id: number) => {
    onSkinsChange(selectedSkins.filter((s) => s.id !== id));
  };

  const hasActiveFilters =
    selectedRanks.length > 0 ||
    selectedTiers.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < PRICE_MAX ||
    selectedSkins.length > 0;

  const handleRanksChange = (ranks: string[]) => {
    onRanksChange(ranks);
    onAnyFilterChange();
  };

  const handleTiersChange = (tiers: string[]) => {
    onTiersChange(tiers);
    onAnyFilterChange();
  };

  const handlePriceChange = (range: [number, number]) => {
    onPriceChange(range);
    onAnyFilterChange();
  };

  const handleSkinsChange = (skins: Skin[]) => {
    onSkinsChange(skins);
    onAnyFilterChange();
  };

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="hidden md:block h-px" />
      <div
        className={cn(
          "hidden md:block sticky top-[88px] lg:top-[92px] z-40 -mt-12 w-full",
          isStuck ? "" : "px-4 md:px-8 lg:px-16"
        )}
      >
        <div className="flex justify-center">
          <div
            className={
              "w-full mx-8 bg-black border border-white/30 rounded-2xl px-6 py-4 shadow-2xl"
            }
          >
            {/* Main row */}
            <div className="flex items-center gap-3 overflow-x-auto">
              {/* LEFT: dropdowns */}
              <div className="flex items-center gap-3 shrink-0">
                <RankDropdown
                  selectedRanks={selectedRanks}
                  onChange={handleRanksChange}
                />
                <PriceDropdown
                  priceRange={priceRange}
                  onChange={handlePriceChange}
                />
                <TierDropdown
                  selectedTiers={selectedTiers}
                  onChange={handleTiersChange}
                />
              </div>

              {/* RIGHT: daily-drop + skin search */}
              <div className="flex items-center gap-3 ml-auto shrink-0">
                <button onClick={onOpenDailyDrop} className="flex items-center justify-center h-10 border border-white/30 rounded-xl hover:border-white transition shrink-0 px-3">
                  <Image
                    src="/daily-drop-catalogue.svg"
                    alt="Daily Drop"
                    width={120}
                    height={35}
                    className="object-contain"
                  />
                </button>

                <button
                  onClick={() => setSkinModalOpen(true)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-all duration-300 shrink-0",
                    isStuck ? "min-w-[220px]" : "",
                    skinModalOpen
                      ? "border-white bg-white/10 text-white"
                      : "border-white/30 hover:border-white text-white/50"
                  )}
                >
                  <Search className="w-4 h-4 shrink-0" />
                  <span className="truncate whitespace-nowrap">
                    {isStuck ? "Search skin name" : "Search skin na.."}
                  </span>
                </button>
              </div>
            </div>

            {/* Divider — always shown */}
            {hasActiveFilters && (
              <div className="border-t border-white/20 mt-4" />
            )}

            {/* Skin chips row */}
            {selectedSkins.length > 0 && (
              <div className="relative mt-3">
                {/* Invisible measurement div — always renders all chips to detect wrapping */}
                <div
                  ref={measureRef}
                  className="absolute top-0 left-0 right-0 flex flex-wrap gap-2 opacity-0 pointer-events-none"
                  aria-hidden
                >
                  {selectedSkins.map((skin) => (
                    <div
                      data-chip
                      key={skin.id}
                      className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-white text-xs"
                    >
                      <span className="whitespace-nowrap">{skin.name}</span>
                    </div>
                  ))}
                </div>

                {/* Visible chips (truncated to first row) */}
                <div className="flex flex-nowrap gap-2 overflow-hidden">
                  {skinsToShow.map((skin) => (
                    <div
                      key={skin.id}
                      className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-white text-xs"
                    >
                      <span className="whitespace-nowrap">{skin.name}</span>
                      <button
                        onClick={() => {
                          removeSkin(skin.id);
                          onAnyFilterChange();
                        }}
                        className="text-white/60 hover:text-white transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {hiddenCount > 0 && (
                    <div className="flex items-center bg-white/10 rounded-full px-3 py-1 text-white text-xs">
                      +{hiddenCount} more
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Reset filter */}
            {hasActiveFilters && (
              <div
                className={cn(
                  "flex mt-3",
                  selectedSkins.length > 0 ? "justify-end" : "justify-start"
                )}
              >
                <button
                  onClick={onResetAll}
                  className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <SkinSearchModal
        open={skinModalOpen}
        onClose={() => setSkinModalOpen(false)}
        selectedSkins={selectedSkins}
        onToggleSkin={(skin) => {
          const exists = selectedSkins.some((s) => s.id === skin.id);
          const next = exists
            ? selectedSkins.filter((s) => s.id !== skin.id)
            : [...selectedSkins, skin];
          handleSkinsChange(next);
        }}
      />
    </>
  );
}