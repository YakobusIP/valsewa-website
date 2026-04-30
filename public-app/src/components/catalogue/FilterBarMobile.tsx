"use client";

import { useMemo, useRef, useState } from "react";

import { fetchSkins } from "@/services/skin.service";

import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { Skin } from "@/types/skin.type";

import { ArrowUpDown, Search, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";


import { SORT_OPTIONS, SortOption } from "./SortDropdown";

interface FilterBarMobileProps {
  selectedSkins: Skin[];
  onToggleSkin: (skin: Skin) => void;
  onOpenFilterSheet: () => void;
  onSortChange: (option: SortOption) => void;
  currentSort: SortOption;
  fallbackSkins?: Skin[];
  onAnyFilterChange: () => void;
  onOpenDailyDrop?: () => void;
}

export function FilterBarMobile({
  selectedSkins,
  onToggleSkin,
  onOpenFilterSheet,
  onSortChange,
  currentSort,
  fallbackSkins = [],
  onAnyFilterChange,
  onOpenDailyDrop
}: FilterBarMobileProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [skinQuery, setSkinQuery] = useState("");
  const [skins, setSkins] = useState<Skin[]>([]);
  const [hasFetched, setHasFetched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSkins = useMemo(() => {
    const q = skinQuery.trim().toLowerCase();
    if (!q) return skins;
    return skins.filter((s) => s.name.toLowerCase().includes(q));
  }, [skins, skinQuery]);

  const selectedSkinIds = useMemo(
    () => new Set(selectedSkins.map((s) => s.id)),
    [selectedSkins]
  );

  const toggleSkinFilter = (skin: Skin) => {
    onToggleSkin(skin);
    onAnyFilterChange();
  };

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === currentSort)?.label ?? "Date Added";

  const openSearch = async () => {
    setIsSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);

    if (!hasFetched) {
      const result = await fetchSkins();
      setSkins(result.length > 0 ? result : fallbackSkins);
      setHasFetched(true);
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSkinQuery("");
  };

  return (
    <div className="md:hidden bg-[#0F0F0F] px-4 py-3 space-y-3">
      {/* Search bar or skin list */}
      {!isSearchOpen ? (
        <button
          onClick={openSearch}
          className="flex items-center gap-2 w-full border border-white/30 rounded-xl px-4 py-2.5 text-white/50 hover:border-white transition text-sm text-left"
        >
          <Search className="w-4 h-4 shrink-0" />
          <span>Search by skin name</span>
        </button>
      ) : (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                ref={inputRef}
                value={skinQuery}
                onChange={(e) => setSkinQuery(e.target.value)}
                placeholder="Search by skin name..."
                className="pl-9 bg-neutral-900 border-white/20 text-white placeholder:text-white/30"
              />
            </div>
            <button
              onClick={closeSearch}
              className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/10 transition text-white/60 hover:text-white shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-1 max-h-[55vh] overflow-y-auto">
            {filteredSkins.length === 0 ? (
              <p className="text-white/40 text-sm text-center py-6">
                {skins.length === 0
                  ? "Log in to search skins."
                  : "No skins matched."}
              </p>
            ) : (
              filteredSkins.map((skin) => {
                const checked = selectedSkinIds.has(skin.id);
                return (
                  <div
                    key={skin.id}
                    role="checkbox"
                    aria-checked={checked}
                    tabIndex={0}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer"
                    onClick={() => toggleSkinFilter(skin)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleSkinFilter(skin);
                      }
                    }}
                  >
                    <Checkbox
                      id={`mobile-skin-${skin.id}`}
                      checked={checked}
                      tabIndex={-1}
                      aria-hidden="true"
                      className="border-white/50 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 shrink-0 pointer-events-none"
                    />
                    <div className="relative w-[40px] h-[64px] shrink-0 rounded overflow-hidden bg-neutral-900">
                      {skin.imageUrl ? (
                        <Image
                          src={skin.imageUrl}
                          fill
                          alt={skin.name}
                          className="object-contain"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-800" />
                      )}
                    </div>
                    <span className="text-sm text-white flex-1 min-w-0 truncate">
                      {skin.name}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Filter + Sort row (hidden during skin search) */}
      {!isSearchOpen && (
        <div className="flex items-center justify-between gap-2">

          {/* FILTER BUTTON */}
          <button
            onClick={onOpenFilterSheet}
            className="flex items-center gap-2 border border-white/30 rounded-xl px-4 py-2.5 text-white text-sm hover:border-white transition"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>

          {/* DAILY DROP BUTTON */}
          <button
            onClick={onOpenDailyDrop}
            className="flex items-center justify-center border border-white/30 rounded-xl px-3 py-3.5 hover:border-white transition shrink-0"
          >
            <Image
              src="/daily-drop-catalogue.svg"
              alt="Daily Drop"
              width={80}
              height={24}
              className="object-contain"
            />
          </button>

          {/* SORT DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 border border-white/30 rounded-xl px-4 py-3 text-nowrap text-white text-xs hover:border-white transition">
                <ArrowUpDown className="w-4 h-4" />
                {currentSortLabel}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="bg-neutral-900 border-white/20 text-white w-52"
            >
              <DropdownMenuRadioGroup
                value={currentSort}
                onValueChange={(value) => onSortChange(value as SortOption)}
              >
                {SORT_OPTIONS.map((opt) => (
                  <DropdownMenuRadioItem
                    key={opt.value}
                    value={opt.value}
                    className="text-sm"
                  >
                    {opt.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}