"use client";

import { useState } from "react";

import Image from "next/image";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

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
  const [open, setOpen] = useState(false);

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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "2xl-large:min-w-[170px] md:w-[100px] flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm text-white transition",
            open
              ? "border-white bg-white/10"
              : "border-white/30 hover:border-white"
          )}
        >
          <span className="flex items-center gap-2 truncate">
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
                <span className="truncate">{firstRank!.name}</span>
                {extraCount > 0 && (
                  <span className="text-white/60 shrink-0">
                    +{extraCount}
                  </span>
                )}
              </>
            )}
          </span>

          <svg
            className={cn(
              "w-2.5 h-1.5 fill-white shrink-0 transition-transform ml-2",
              open && "rotate-180"
            )}
            viewBox="0 0 10 6"
          >
            <path d="M0 0L5 6L10 0H0Z" />
          </svg>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={8}
        className={cn(
          "p-2 z-50 bg-neutral-900 border border-white/20 rounded-xl shadow-xl min-w-[220px]",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2"
        )}
      >
        <div className="max-h-[320px] overflow-y-auto">
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
      </PopoverContent>
    </Popover>
  );
}