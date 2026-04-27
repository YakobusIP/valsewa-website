"use client";

import { useEffect } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

import { cn } from "@/lib/utils";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import { RANKS } from "./RankDropdown";
import { COMP_TIERS, UNRATED_TIERS } from "./TierDropdown";

interface FilterBottomSheetProps {
  open: boolean;
  onClose: () => void;
  selectedRanks: string[];
  onRanksChange: (ranks: string[]) => void;
  selectedTiers: string[];
  onTiersChange: (tiers: string[]) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  matchingCount: number;
  onApply: () => void;
  onResetAll: () => void;
}

function toggleItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

function tierLabel(t: string) {
  return t.replace(" - COMP", "");
}

export function FilterBottomSheet({
  open,
  onClose,
  selectedRanks,
  onRanksChange,
  selectedTiers,
  onTiersChange,
  priceRange,
  onPriceChange,
  matchingCount,
  onApply,
  onResetAll,
}: FilterBottomSheetProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[199] bg-black/60 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[200] bg-[#0F0F0F] rounded-t-3xl h-[calc(100vh-64px)] flex flex-col md:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 shrink-0">
              <h2 className="text-white font-semibold font-instrumentSans text-lg">Filter</h2>
              <button
                onClick={onResetAll}
                className="text-white/40 text-sm hover:text-white/70 transition"
              >
                Reset all
              </button>
            </div>
            <div className="border-t border-white/20 shrink-0" />

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-7">
              {/* Rank */}
              <div>
                <h3 className="text-white font-semibold font-instrumentSans mb-3">Rank</h3>
                <div className="flex flex-wrap gap-2">
                  {RANKS.map((rank) => {
                    const selected = selectedRanks.includes(rank.id);
                    return (
                      <button
                        key={rank.id}
                        onClick={() => onRanksChange(toggleItem(selectedRanks, rank.id))}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition",
                          selected
                            ? "bg-red-600 border-red-600 text-white"
                            : "border-white/30 text-white/70 hover:border-white hover:text-white"
                        )}
                      >
                        <Checkbox
                          checked={selected}
                          onCheckedChange={() => onRanksChange(toggleItem(selectedRanks, rank.id))}
                          className="border-white/50 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 pointer-events-none"
                        />
                        <Image
                          src={rank.image}
                          alt={rank.id}
                          width={20}
                          height={20}
                          className="w-5 h-5 object-contain"
                        />
                        {rank.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tier */}
              <div>
                <h3 className="text-white font-semibold font-instrumentSans mb-3">Tier</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-white/40 font-semibold mb-2 uppercase tracking-wide">Competitive</p>
                    <div className="space-y-1.5">
                      {COMP_TIERS.map((t) => {
                        const checked = selectedTiers.includes(t);
                        return (
                          <div
                            key={t}
                            className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white/10 cursor-pointer"
                            onClick={() => onTiersChange(toggleItem(selectedTiers, t))}
                          >
                            <Checkbox
                              id={`sheet-comp-${t}`}
                              checked={checked}
                              onCheckedChange={() => onTiersChange(toggleItem(selectedTiers, t))}
                              className="border-white/50 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                            />
                            <Label htmlFor={`sheet-comp-${t}`} className="text-sm text-white cursor-pointer">
                              {tierLabel(t)}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 font-semibold mb-2 uppercase tracking-wide">Unrated</p>
                    <div className="space-y-1.5">
                      {UNRATED_TIERS.map((t) => {
                        const checked = selectedTiers.includes(t);
                        return (
                          <div
                            key={t}
                            className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white/10 cursor-pointer"
                            onClick={() => onTiersChange(toggleItem(selectedTiers, t))}
                          >
                            <Checkbox
                              id={`sheet-unrated-${t}`}
                              checked={checked}
                              onCheckedChange={() => onTiersChange(toggleItem(selectedTiers, t))}
                              className="border-white/50 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                            />
                            <Label htmlFor={`sheet-unrated-${t}`} className="text-sm text-white cursor-pointer">
                              {t}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div>
                <h3 className="text-white font-semibold font-instrumentSans mb-3">Price</h3>
                <Slider
                  value={[priceRange[0], priceRange[1]]}
                  min={0}
                  max={1_000_000}
                  step={5000}
                  onValueChange={(v) => {
                    const a = v[0] ?? 0;
                    const b = v[1] ?? 1_000_000;
                    onPriceChange([Math.min(a, b), Math.max(a, b)]);
                  }}
                />
                <div className="flex justify-between text-xs text-white/50 mt-2">
                  <span>Rp {priceRange[0].toLocaleString("id-ID")}</span>
                  <span>Rp {priceRange[1].toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>

            {/* Bottom actions */}
            <div className="shrink-0 px-5 py-4 space-y-2 border-t border-white/10">
              <button
                onClick={onApply}
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-3.5 font-semibold font-instrumentSans transition"
              >
                Show {matchingCount} accounts →
              </button>
              <button
                onClick={onClose}
                className="w-full text-white/50 hover:text-white text-sm py-2 transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
