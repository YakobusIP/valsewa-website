"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { ArrowUpDown, Check, ChevronDown } from "lucide-react";

export type SortOption = "dateAdded" | "mostRented" | "cheapest" | "availableNow";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "dateAdded",    label: "Date Added" },
  { value: "mostRented",   label: "Most Rented" },
  { value: "cheapest",     label: "Cheapest to Highest" },
  { value: "availableNow", label: "Available Now" },
];

export const SORT_MAP: Record<SortOption, { sortBy: string; direction: "asc" | "desc" }> = {
  dateAdded:    { sortBy: "id",            direction: "desc" },
  mostRented:   { sortBy: "totalRentHour", direction: "desc" },
  cheapest:     { sortBy: "price_tier",    direction: "desc" },
  availableNow: { sortBy: "availability",  direction: "asc" },
};

interface SortDropdownProps {
  currentSort: SortOption;
  onChange: (sort: SortOption) => void;
}

export function SortDropdown({ currentSort, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const currentLabel = SORT_OPTIONS.find((o) => o.value === currentSort)?.label ?? "Date Added";

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm text-white transition whitespace-nowrap",
          isOpen ? "border-white bg-white/10" : "border-white/30 hover:border-white"
        )}
      >
        <ArrowUpDown className="w-4 h-4 text-white/50" />
        <span>Sorted by {currentLabel}</span>
        <ChevronDown className={cn("w-4 h-4 text-white/50 transition-transform", isOpen && "rotate-180")} />
      </button>

      <div
        className={cn(
          "absolute top-full right-0 mt-2 z-50 bg-neutral-900 border border-white/20 rounded-xl shadow-xl min-w-[220px] p-2",
          "transition-all duration-300",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <p className="px-3 py-2 text-xs text-white/40 font-semibold uppercase tracking-wide border-b border-white/10 mb-1">
          Sort By
        </p>
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => { onChange(opt.value); setIsOpen(false); }}
            className="flex items-center justify-between w-full px-3 py-2.5 hover:bg-white/10 rounded-lg text-sm text-white transition"
          >
            {opt.label}
            {currentSort === opt.value && <Check className="w-4 h-4 text-red-500" />}
          </button>
        ))}
      </div>
    </div>
  );
}
