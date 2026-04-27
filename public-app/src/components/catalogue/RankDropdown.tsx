"use client";

import { useEffect, useRef, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";

import { cn } from "@/lib/utils";

import { ChevronDown } from "lucide-react";
import Image from "next/image";

export const RANKS = [
  { id: "Unrated", name: "Unrated", image: "/rank/unranked.webp" },
  { id: "Iron", name: "Iron", image: "/rank/Iron 3.svg" },
  { id: "Bronze", name: "Bronze", image: "/rank/Bronze 3.svg" },
  { id: "Silver", name: "Silver", image: "/rank/Silver 3.svg" },
  { id: "Gold", name: "Gold", image: "/rank/Gold 3.svg" },
  { id: "Platinum", name: "Platinum", image: "/rank/Platinum 3.svg" },
  { id: "Diamond", name: "Diamond", image: "/rank/Diamond 3.svg" },
  { id: "Ascendant", name: "Ascendant", image: "/rank/Ascendant 3.svg" },
  { id: "Immortal", name: "Immortal", image: "/rank/Immortal 3.svg" },
  { id: "Radiant", name: "Radiant", image: "/rank/Radiant.svg" }
];

interface RankDropdownProps {
  selectedRanks: string[];
  onChange: (ranks: string[]) => void;
}

export function RankDropdown({ selectedRanks, onChange }: RankDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const toggle = (id: string) => {
    onChange(
      selectedRanks.includes(id)
        ? selectedRanks.filter((r) => r !== id)
        : [...selectedRanks, id]
    );
  };

  const firstRank = RANKS.find((r) => r.id === selectedRanks[0]);
  const extraCount = selectedRanks.length - 1;

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm text-white transition whitespace-nowrap",
          isOpen
            ? "border-white bg-white/10"
            : "border-white/30 hover:border-white"
        )}
      >
        {selectedRanks.length === 0 ? (
          <span className="text-white/70">Rank</span>
        ) : (
          <>
            <Image
              src={firstRank!.image}
              width={18}
              height={18}
              alt={firstRank!.id}
              className="shrink-0"
            />
            <span>{firstRank!.name}</span>
            {extraCount > 0 && (
              <span className="text-white/60">+{extraCount}</span>
            )}
          </>
        )}
        <ChevronDown
          className={cn(
            "w-4 h-4 text-white/50 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={cn(
          "absolute top-full left-0 mt-2 z-50 bg-neutral-900 border border-white/20 rounded-xl shadow-xl min-w-[220px] overflow-hidden",
          "transition-all duration-500",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="p-2 max-h-[320px] overflow-y-auto">
          {RANKS.map((rank) => {
            const checked = selectedRanks.includes(rank.id);
            return (
              <div
                key={rank.id}
                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/10 cursor-pointer transition"
                role="button"
                tabIndex={0}
                onClick={() => toggle(rank.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(rank.id);
                  }
                }}
              >
                <Checkbox
                  id={`rank-filter-${rank.id}`}
                  checked={checked}
                  onCheckedChange={() => toggle(rank.id)}
                  className="border-white/50 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 pointer-events-none"
                />
                <Image
                  src={rank.image}
                  width={20}
                  height={20}
                  alt={rank.id}
                  className="shrink-0"
                />
                <span className="text-sm text-white">{rank.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
