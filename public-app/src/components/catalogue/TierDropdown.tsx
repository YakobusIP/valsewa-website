"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

export const COMP_TIERS = ["C - COMP", "B - COMP", "A - COMP", "S - COMP", "SSS - COMP"] as const;
export const UNRATED_TIERS = ["C", "B", "A", "S", "SSS"] as const;

function tierLabel(t: string) {
  return t.replace(" - COMP", "");
}

function firstTierDisplay(t: string) {
  if (t.includes("COMP")) return `Competitive-${tierLabel(t)}`;
  return t;
}

interface TierDropdownProps {
  selectedTiers: string[];
  onChange: (tiers: string[]) => void;
}

export function TierDropdown({ selectedTiers, onChange }: TierDropdownProps) {
  const [open, setOpen] = useState(false);

  const toggle = (t: string) => {
    onChange(
      selectedTiers.includes(t)
        ? selectedTiers.filter((x) => x !== t)
        : [...selectedTiers, t]
    );
  };

  let label =
    selectedTiers.length === 0
      ? null
      : firstTierDisplay(selectedTiers[0]);

  const extraCount = selectedTiers.length - 1;

  if (extraCount > 0 && label != null) {
    label += ` + ${extraCount}`;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "2xl-large:w-[210px] md:w-[120px] flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm text-white transition",
            open
              ? "border-white bg-white/10"
              : "border-white/30 hover:border-white"
          )}
        >
          <span className={selectedTiers.length === 0 ? "text-white/70" : "text-white"}>
            {label ?? "Tier"}
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
        className="z-50 bg-neutral-900 border border-white/20 rounded-xl shadow-xl min-w-[300px] p-4"
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Competitive */}
          <div>
            <p className="text-xs text-white/50 font-semibold mb-2 uppercase tracking-wide">
              Competitive
            </p>
            <div className="space-y-1">
              {COMP_TIERS.map((t) => {
                const checked = selectedTiers.includes(t);
                return (
                  <div
                    key={t}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white/10 cursor-pointer"
                    onClick={() => toggle(t)}
                  >
                    <Checkbox
                      id={`tier-${t}`}
                      checked={checked}
                      onCheckedChange={() => toggle(t)}
                      className="border-white/50 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                    />
                    <Label htmlFor={`tier-${t}`} className="text-sm text-white cursor-pointer">
                      {tierLabel(t)}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Unrated */}
          <div>
            <p className="text-xs text-white/50 font-semibold mb-2 uppercase tracking-wide">
              Unrated
            </p>
            <div className="space-y-1">
              {UNRATED_TIERS.map((t) => {
                const checked = selectedTiers.includes(t);
                return (
                  <div
                    key={t}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white/10 cursor-pointer"
                    onClick={() => toggle(t)}
                  >
                    <Checkbox
                      id={`tier-unrated-${t}`}
                      checked={checked}
                      onCheckedChange={() => toggle(t)}
                      className="border-white/50 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                    />
                    <Label
                      htmlFor={`tier-unrated-${t}`}
                      className="text-sm text-white cursor-pointer"
                    >
                      {t}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}