"use client";

import { useEffect, useRef, useState } from "react";

import { Slider } from "@/components/ui/slider";

import { cn } from "@/lib/utils";


const PRICE_MIN = 0;
const PRICE_MAX = 1_000_000;

function formatIDR(n: number) {
  return n.toLocaleString("id-ID");
}

interface PriceDropdownProps {
  priceRange: [number, number];
  onChange: (range: [number, number]) => void;
}

export function PriceDropdown({ priceRange, onChange }: PriceDropdownProps) {
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

  const [min, max] = priceRange;
  const isDefault = min === PRICE_MIN && max === PRICE_MAX;

  let label = "Price";
  if (!isDefault) {
    if (min === PRICE_MIN) {
      label = `Up to ${formatIDR(max)}`;
    } else {
      label = `${formatIDR(min)} - ${formatIDR(max)}`;
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "w-[270px] flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm text-white transition",
          isOpen ? "border-white bg-white/10" : "border-white/30 hover:border-white"
        )}
      >
        <span className={isDefault ? "text-white/70" : "text-white"}>{label}</span>
        <svg
          className={cn("w-2.5 h-1.5 fill-white shrink-0 transition-transform ml-2", isOpen && "rotate-180")}
          viewBox="0 0 10 6"
        >
          <path d="M0 0L5 6L10 0H0Z" />
        </svg>
      </button>

      <div
        className={cn(
          "absolute top-full left-0 mt-2 z-50 bg-neutral-900 border border-white/20 rounded-xl shadow-xl min-w-[280px] p-4",
          "transition-all duration-500",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <Slider
          value={[min, max]}
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={5000}
          onValueChange={(v) => {
            const a = v[0] ?? PRICE_MIN;
            const b = v[1] ?? PRICE_MAX;
            onChange([Math.min(a, b), Math.max(a, b)]);
          }}
          className="my-4"
        />
        <div className="flex justify-between text-xs text-white/50 mt-1">
          <span>Rp {formatIDR(min)}</span>
          <span>Rp {formatIDR(max)}</span>
        </div>
      </div>
    </div>
  );
}
