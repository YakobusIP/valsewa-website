"use client";

import { ArrowUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import {
  SortOption,
  SORT_OPTIONS,
  SORT_MAP
} from "@/lib/catalogue-filters";

export type { SortOption };
export { SORT_OPTIONS, SORT_MAP };

interface SortDropdownProps {
  currentSort: SortOption;
  onChange: (sort: SortOption) => void;
}

export function SortDropdown({ currentSort, onChange }: SortDropdownProps) {
  const currentLabel =
    SORT_OPTIONS.find((o) => o.value === currentSort)?.label ?? "Rank";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white transition whitespace-nowrap",
            "border border-white/30 hover:border-white",
            "md:border-none md:bg-white/0 md:hover:bg-white/10"
          )}
        >
          <ArrowUpDown className="w-4 h-4 text-white/50" />
          <span>Sorted by {currentLabel}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[220px] bg-neutral-900 border border-white/20 text-white"
      >
        <DropdownMenuLabel className="text-xs text-white/40 uppercase tracking-wide">
          Sort By
        </DropdownMenuLabel>

        <DropdownMenuRadioGroup
          value={currentSort}
          onValueChange={(value) => onChange(value as SortOption)}
        >
          {SORT_OPTIONS.map((opt) => (
            <DropdownMenuRadioItem
              key={opt.value}
              value={opt.value}
              className="cursor-pointer"
            >
              {opt.label}
              
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}