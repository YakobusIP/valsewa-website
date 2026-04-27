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
  fallbackSkins = []
}: FilterBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);
  const [overlap, setOverlap] = useState(53);
  const [skinModalOpen, setSkinModalOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useLayoutEffect(() => {
    if (barRef.current) {
      const h = barRef.current.getBoundingClientRect().height;
      setOverlap(Math.round(h * (2 / 3)));
    }

    // Store the initial scroll position where FilterBar is located
    if (containerRef.current) {
      scrollPositionRef.current = containerRef.current.offsetTop;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= scrollPositionRef.current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      <div
        ref={containerRef}
        className={cn(
          "hidden md:block sticky z-40 w-full",
          isSticky ? "top-[80px] lg:top-[84px] bg-black" : "top-0"
        )}
        style={!isSticky ? { marginTop: -overlap } : undefined}
      >
        <div
          className={cn(
            "flex justify-center",
            isSticky ? "px-0" : "px-4 md:px-8 lg:px-16"
          )}
        >
          <div
            ref={barRef}
            className={cn(
              "w-full bg-black",
              isSticky
                ? "max-w-none px-6 md:px-8 lg:px-16 py-4 border-none"
                : "max-w-[1600px] border border-white/30 rounded-2xl px-6 py-4 shadow-2xl"
            )}
          >
            {/* Main row */}
            <div className="flex items-center gap-3">
              {/* LEFT: dropdowns */}
              <div className="flex items-center gap-3 flex-wrap">
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
              <div className="flex items-center gap-3 ml-auto">
                <button className="flex items-center justify-center w-48 h-10 border border-white/30 rounded-xl hover:border-white transition shrink-0">
                  <Image
                    src="/daily-drop-catalogue.svg"
                    alt="Daily Drop"
                    width={160}
                    height={40}
                  />
                </button>

                <button
                  onClick={() => setSkinModalOpen(true)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition min-w-[200px]",
                    skinModalOpen
                      ? "border-white bg-white/10 text-white"
                      : "border-white/30 hover:border-white text-white/50"
                  )}
                >
                  <Search className="w-4 h-4 shrink-0" />
                  <span className="truncate">Search by skin na...</span>
                </button>
              </div>
            </div>

            {/* Divider — always shown */}
            {hasActiveFilters && (
              <div className="border-t border-white/20 mt-4" />
            )}

            {/* Skin chips row */}
            {selectedSkins.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedSkins.map((skin) => (
                  <div
                    key={skin.id}
                    className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-white text-xs"
                  >
                    <span>{skin.name}</span>
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
        fallbackSkins={fallbackSkins}
      />
    </>
  );
}
