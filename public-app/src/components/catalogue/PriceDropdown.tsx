"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

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
  const [open, setOpen] = useState(false);

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
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "2xl-large:w-[270px] md:w-[120px] flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm text-white transition",
            open
              ? "border-white bg-white/10"
              : "border-white/30 hover:border-white"
          )}
        >
          <span className={isDefault ? "text-white/70" : "text-white"}>
            {label}
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
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={8}
        className="z-50 bg-neutral-900 border border-white/20 rounded-xl shadow-xl min-w-[280px] p-4"
        onCloseAutoFocus={(e) => e.preventDefault()} // prevent focus jump
        onInteractOutside={(e) => {
          // allow outside click to close
        }}
      >
        <div
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <p className="text-[11px] text-white">Min</p>
              <Input
                type="number"
                inputMode="numeric"
                value={min}
                min={PRICE_MIN}
                max={max}
                step={5000}
                onChange={(e) => onChange([Number(e.target.value || 0), max])}
                className="h-10 rounded-lg bg-white border-neutral-800 text-black"
              />
            </div>

            <div className="space-y-1">
              <p className="text-[11px] text-white">Max</p>
              <Input
                type="number"
                inputMode="numeric"
                value={max}
                min={min}
                max={PRICE_MAX}
                step={5000}
                onChange={(e) => onChange([min, Number(e.target.value || 0)])}
                className="h-10 rounded-lg bg-white border-neutral-800 text-black"
              />
            </div>
          </div>

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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
