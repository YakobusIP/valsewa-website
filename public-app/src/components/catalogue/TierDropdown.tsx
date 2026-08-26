"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

export const COMP_TIERS = [
  "C - COMP",
  "B - COMP",
  "A - COMP",
  "S - COMP",
  "SSS - COMP",
  "TAZZ - COMP"
] as const;

function tierLabel(t: string) {
  return t.replace(" - COMP", "");
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
    selectedTiers.length === 0 ? null : tierLabel(selectedTiers[0]);

  const extraCount = selectedTiers.length - 1;

  if (extraCount > 0 && label != null) {
    label += ` + ${extraCount}`;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "min-w-[100px] md:min-w-[120px] 2xl-large:min-w-[150px] flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm text-white transition whitespace-nowrap",
            open
              ? "border-white bg-white/10"
              : "border-white/30 hover:border-white"
          )}
        >
          <span
            className={
              selectedTiers.length === 0 ? "text-white/70" : "text-white"
            }
          >
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
        className="z-50 bg-neutral-900 border border-white/20 rounded-xl shadow-xl min-w-[180px] p-4"
      >
        <div className="space-y-1">
          {COMP_TIERS.map((t) => {
            const checked = selectedTiers.includes(t);
            return (
              <div
                key={t}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white/10 cursor-pointer"
                role="checkbox"
                aria-checked={checked}
                tabIndex={0}
                onClick={() => toggle(t)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(t);
                  }
                }}
              >
                <Checkbox
                  checked={checked}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="border-white/50 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 pointer-events-none"
                />
                <span className="text-sm text-white">{tierLabel(t)}</span>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
