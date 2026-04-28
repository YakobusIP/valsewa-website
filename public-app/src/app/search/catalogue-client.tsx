"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import AccountsSection from "@/components/catalogue/AccountsSection";
import { CatalogueHero } from "@/components/catalogue/CatalogueHero";
import { CatalogueNavbar } from "@/components/catalogue/CatalogueNavbar";
import { FilterBar } from "@/components/catalogue/FilterBar";
import { FilterBarMobile } from "@/components/catalogue/FilterBarMobile";
import { FilterBottomSheet } from "@/components/catalogue/FilterBottomSheet";
import { SORT_MAP, SortOption } from "@/components/catalogue/SortDropdown";

import { fetchAccountsPublic } from "@/services/accountService";

import { AccountEntity } from "@/types/account.type";
import { Skin } from "@/types/skin.type";

import { useDebounce } from "use-debounce";

type BrandType = "valsewa" | "valjubel" | "valjoki";

interface CatalogueClientProps {
  initialAccounts: AccountEntity[];
}

function processTiers(tiers: string[]): string[] {
  return tiers.map((t) =>
    t.toUpperCase().trim().replace(/\s*-\s*/g, "-").replace(/\s+/g, "")
  );
}

export default function CatalogueClient({ initialAccounts }: CatalogueClientProps) {
  // Brand
  const [activeBrand, setActiveBrand] = useState<BrandType>("valsewa");

  // Filters
  const [selectedRanks, setSelectedRanks] = useState<string[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1_000_000]);
  const [selectedSkins, setSelectedSkins] = useState<Skin[]>([]);

  // Sort
  const [sortOption, setSortOption] = useState<SortOption>("dateAdded");

  // Data
  const [accounts, setAccounts] = useState<AccountEntity[]>(initialAccounts);
  const [isLoading, setIsLoading] = useState(false);

  // UI
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(false);

  // Refs
  const heroSentinelRef = useRef<HTMLDivElement>(null);
  const accountsSectionRef = useRef<HTMLElement>(null);

  // Debounced filter values
  const [debouncedRanks]  = useDebounce(selectedRanks, 400);
  const [debouncedTiers]  = useDebounce(selectedTiers, 400);
  const [debouncedPrice]  = useDebounce(priceRange, 600);
  const [debouncedSkins]  = useDebounce(selectedSkins, 400);

  // Scrollbar width CSS variable (same as home.tsx)
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver on hero sentinel
  useEffect(() => {
    if (!heroSentinelRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsPastHero(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px" }
    );
    observer.observe(heroSentinelRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll to accounts when filter changes while in hero area
  const triggerAutoScroll = () => {
    if (!isPastHero) setShouldAutoScroll(true);
  };

  useEffect(() => {
    if (shouldAutoScroll && !isLoading) {
      accountsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setShouldAutoScroll(false);
    }
  }, [shouldAutoScroll, isLoading]);

  // Fetch accounts when debounced filters or sort change
  useEffect(() => {
    let cancelled = false;
    async function run() {
      setIsLoading(true);
      const { sortBy, direction } = SORT_MAP[sortOption];
      const result = await fetchAccountsPublic({
        limit: 50,
        ranks:     debouncedRanks.length  ? debouncedRanks  : undefined,
        tiers:     debouncedTiers.length  ? processTiers(debouncedTiers) : undefined,
        min_price: debouncedPrice[0] > 0  ? debouncedPrice[0] : undefined,
        max_price: debouncedPrice[1] < 1_000_000 ? debouncedPrice[1] : undefined,
        skin_ids:  debouncedSkins.length  ? debouncedSkins.map((s) => s.id) : undefined,
        sortBy,
        direction,
      });
      if (!cancelled) {
        setAccounts(result ?? []);
        setIsLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [debouncedRanks, debouncedTiers, debouncedPrice, debouncedSkins, sortOption]);

  // Unique skins from fetched accounts (fallback for skin search when not authenticated)
  const fallbackSkins = useMemo<Skin[]>(() => {
    const map = new Map<number, Skin>();
    accounts.forEach((acc) => {
      acc.skinList?.forEach((s) => {
        if (!map.has(s.id)) map.set(s.id, s);
      });
    });
    return Array.from(map.values());
  }, [accounts]);

  const resetAllFilters = () => {
    setSelectedRanks([]);
    setSelectedTiers([]);
    setPriceRange([0, 1_000_000]);
    setSelectedSkins([]);
    setSortOption("mostRented");
  };

  const toggleSkin = (skin: Skin) => {
    setSelectedSkins((prev) =>
      prev.some((s) => s.id === skin.id)
        ? prev.filter((s) => s.id !== skin.id)
        : [...prev, skin]
    );
    triggerAutoScroll();
  };

  return (
    <div className="min-h-screen bg-black">
      <CatalogueNavbar
        activeBrand={activeBrand}
        setActiveBrand={setActiveBrand}
        isScrolled={isScrolled}
      />

      <CatalogueHero
        activeBrand={activeBrand}
        setActiveBrand={setActiveBrand}
        sentinelRef={heroSentinelRef}
      />

      {/* Desktop/tablet sticky filter bar */}
      <FilterBar
        selectedRanks={selectedRanks}
        onRanksChange={(v) => { setSelectedRanks(v); triggerAutoScroll(); }}
        selectedTiers={selectedTiers}
        onTiersChange={(v) => { setSelectedTiers(v); triggerAutoScroll(); }}
        priceRange={priceRange}
        onPriceChange={(v) => { setPriceRange(v); triggerAutoScroll(); }}
        selectedSkins={selectedSkins}
        onSkinsChange={(v) => { setSelectedSkins(v); triggerAutoScroll(); }}
        onResetAll={resetAllFilters}
        onAnyFilterChange={triggerAutoScroll}
      />

      {/* Mobile filter bar */}
      <FilterBarMobile
        selectedSkins={selectedSkins}
        onToggleSkin={toggleSkin}
        onOpenFilterSheet={() => setIsFilterSheetOpen(true)}
        onSortChange={setSortOption}
        currentSort={sortOption}
        onAnyFilterChange={triggerAutoScroll}
      />

      {/* Accounts section */}
      <AccountsSection
        ref={accountsSectionRef}
        accounts={accounts}
        isLoading={isLoading}
        sortOption={sortOption}
        onSortChange={setSortOption}
        onResetFilters={resetAllFilters}
      />

      {/* Mobile filter bottom sheet */}
      <FilterBottomSheet
        open={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        selectedRanks={selectedRanks}
        onRanksChange={setSelectedRanks}
        selectedTiers={selectedTiers}
        onTiersChange={setSelectedTiers}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
        matchingCount={accounts.length}
        onApply={() => { setIsFilterSheetOpen(false); triggerAutoScroll(); }}
        onResetAll={resetAllFilters}
      />
    </div>
  );
}
