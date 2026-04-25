"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import NavbarHome from "@/components/NavbarHome";
import NavbarHomeMobile from "@/components/NavbarHomeMobile";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

import { AccountEntity } from "@/types/account.type";

import {
  ArrowUp,
  ChevronDown,
  ListFilter,
  RotateCcw,
  Search,
  SortAsc
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PRICE_MIN = 0;
const PRICE_MAX = 1_000_000;

const RANKS = [
  { id: "Unrated",   image: "/rank/unranked.webp" },
  { id: "Iron",      image: "/rank/Iron 3.svg" },
  { id: "Bronze",    image: "/rank/Bronze 3.svg" },
  { id: "Silver",    image: "/rank/Silver 3.svg" },
  { id: "Gold",      image: "/rank/Gold 3.svg" },
  { id: "Platinum",  image: "/rank/Platinum 3.svg" },
  { id: "Diamond",   image: "/rank/Diamond 3.svg" },
  { id: "Ascendant", image: "/rank/Ascendant 3.svg" },
  { id: "Immortal",  image: "/rank/Immortal 3.svg" },
  { id: "Radiant",   image: "/rank/Radiant.svg" }
] as const;

const TIER_CODES = ["C", "B", "A", "S", "SSS"] as const;

type SortOption = "date_added" | "most_rented" | "cheapest" | "available_now";

const SORT_LABELS: Record<SortOption, string> = {
  date_added:    "date added",
  most_rented:   "most rented",
  cheapest:      "cheapest to highest",
  available_now: "available now"
};

type DummySkin = { id: number; name: string; imageUrl: string };

const DUMMY_SKINS: DummySkin[] = [
  { id: 1,  name: "Phantom Prime",      imageUrl: "/defaultPicture/default.jpg" },
  { id: 2,  name: "Vandal Reaver",      imageUrl: "/defaultPicture/default.jpg" },
  { id: 3,  name: "Operator Sovereign", imageUrl: "/defaultPicture/default.jpg" },
  { id: 4,  name: "Vandal Elderflame",  imageUrl: "/defaultPicture/default.jpg" },
  { id: 5,  name: "Knife Reaver",       imageUrl: "/defaultPicture/default.jpg" },
  { id: 6,  name: "Sheriff Glitchpop",  imageUrl: "/defaultPicture/default.jpg" },
  { id: 7,  name: "Ghost Oni",          imageUrl: "/defaultPicture/default.jpg" },
  { id: 8,  name: "Ares Prime",         imageUrl: "/defaultPicture/default.jpg" },
  { id: 9,  name: "Spectre Ion",        imageUrl: "/defaultPicture/default.jpg" },
  { id: 10, name: "Stinger Spline",     imageUrl: "/defaultPicture/default.jpg" },
  { id: 11, name: "Vandal Forsaken",    imageUrl: "/defaultPicture/default.jpg" },
  { id: 12, name: "Phantom RGX",        imageUrl: "/defaultPicture/default.jpg" }
];

const mk = (
  n: number,
  price: number
): AccountEntity["priceTier"] => ({
  id: n,
  code: (["C", "B", "A", "S", "SSS"] as const)[Math.min(n - 1, 4)],
  priceList: [
    { id: n, duration: "1 DAY", unratedPrice: price, compPrice: Math.round(price * 1.3), tierId: n }
  ]
});

const skin = (count: number) =>
  Array(count).fill({ id: 0, name: "", imageUrl: "" });

const thumb = { id: 0, imageUrl: "/defaultPicture/default.jpg", type: "IMAGE" as const };

const DUMMY_ACCOUNTS: AccountEntity[] = [
  {
    id: 1, username: "valsewa01", accountCode: "VAL-R01", nickname: "",
    accountRank: "Radiant", availabilityStatus: "AVAILABLE",
    isCompetitive: true, isRecommended: true,
    priceTier: { id: 5, code: "SSS", priceList: [{ id: 5, duration: "1 DAY", unratedPrice: 500_000, compPrice: 650_000, tierId: 5 }] },
    skinList: skin(18), skinCount: 18, thumbnail: thumb, otherImages: null,
    totalRentHour: 720, password: "", stale_password: false,
    currentExpireAt: null, nextBooking: null, nextBookingDuration: null
  },
  {
    id: 2, username: "valsewa02", accountCode: "VAL-I301", nickname: "",
    accountRank: "Immortal 3", availabilityStatus: "AVAILABLE",
    isCompetitive: true, isRecommended: false,
    priceTier: { id: 4, code: "S", priceList: [{ id: 4, duration: "1 DAY", unratedPrice: 350_000, compPrice: 455_000, tierId: 4 }] },
    skinList: skin(15), skinCount: 15, thumbnail: thumb, otherImages: null,
    totalRentHour: 480, password: "", stale_password: false,
    currentExpireAt: null, nextBooking: null, nextBookingDuration: null
  },
  {
    id: 3, username: "valsewa03", accountCode: "VAL-I101", nickname: "",
    accountRank: "Immortal 1", availabilityStatus: "AVAILABLE",
    isCompetitive: false, isRecommended: false,
    priceTier: { id: 3, code: "A", priceList: [{ id: 3, duration: "1 DAY", unratedPrice: 200_000, compPrice: 260_000, tierId: 3 }] },
    skinList: skin(12), skinCount: 12, thumbnail: thumb, otherImages: null,
    totalRentHour: 360, password: "", stale_password: false,
    currentExpireAt: null, nextBooking: null, nextBookingDuration: null
  },
  {
    id: 4, username: "valsewa04", accountCode: "VAL-A201", nickname: "",
    accountRank: "Ascendant 2", availabilityStatus: "AVAILABLE",
    isCompetitive: true, isRecommended: true,
    priceTier: { id: 4, code: "S", priceList: [{ id: 4, duration: "1 DAY", unratedPrice: 300_000, compPrice: 390_000, tierId: 4 }] },
    skinList: skin(13), skinCount: 13, thumbnail: thumb, otherImages: null,
    totalRentHour: 240, password: "", stale_password: false,
    currentExpireAt: null, nextBooking: null, nextBookingDuration: null
  },
  {
    id: 5, username: "valsewa05", accountCode: "VAL-D101", nickname: "",
    accountRank: "Diamond 1", availabilityStatus: "IN_USE",
    isCompetitive: true, isRecommended: false,
    priceTier: { id: 3, code: "A", priceList: [{ id: 3, duration: "1 DAY", unratedPrice: 150_000, compPrice: 195_000, tierId: 3 }] },
    skinList: skin(10), skinCount: 10, thumbnail: thumb, otherImages: null,
    totalRentHour: 600, password: "", stale_password: false,
    currentExpireAt: new Date("2026-05-15T14:00:00Z"),
    nextBooking: null, nextBookingDuration: null
  },
  {
    id: 6, username: "valsewa06", accountCode: "VAL-D102", nickname: "",
    accountRank: "Diamond 1", availabilityStatus: "AVAILABLE",
    isCompetitive: false, isRecommended: false,
    priceTier: { id: 2, code: "B", priceList: [{ id: 2, duration: "1 DAY", unratedPrice: 100_000, compPrice: 130_000, tierId: 2 }] },
    skinList: skin(9), skinCount: 9, thumbnail: thumb, otherImages: null,
    totalRentHour: 120, password: "", stale_password: false,
    currentExpireAt: null, nextBooking: null, nextBookingDuration: null
  },
  {
    id: 7, username: "valsewa07", accountCode: "VAL-P201", nickname: "",
    accountRank: "Platinum 2", availabilityStatus: "IN_USE",
    isCompetitive: true, isRecommended: false,
    priceTier: { id: 2, code: "B", priceList: [{ id: 2, duration: "1 DAY", unratedPrice: 80_000, compPrice: 104_000, tierId: 2 }] },
    skinList: skin(8), skinCount: 8, thumbnail: thumb, otherImages: null,
    totalRentHour: 300, password: "", stale_password: false,
    currentExpireAt: new Date("2026-05-20T10:00:00Z"),
    nextBooking: null, nextBookingDuration: null
  },
  {
    id: 8, username: "valsewa08", accountCode: "VAL-P202", nickname: "",
    accountRank: "Platinum 2", availabilityStatus: "AVAILABLE",
    isCompetitive: false, isRecommended: false,
    priceTier: { id: 1, code: "C", priceList: [{ id: 1, duration: "1 DAY", unratedPrice: 50_000, compPrice: 65_000, tierId: 1 }] },
    skinList: skin(7), skinCount: 7, thumbnail: thumb, otherImages: null,
    totalRentHour: 48, password: "", stale_password: false,
    currentExpireAt: null, nextBooking: null, nextBookingDuration: null
  },
  {
    id: 9, username: "valsewa09", accountCode: "VAL-G301", nickname: "",
    accountRank: "Gold 3", availabilityStatus: "AVAILABLE",
    isCompetitive: true, isRecommended: false,
    priceTier: { id: 1, code: "C", priceList: [{ id: 1, duration: "1 DAY", unratedPrice: 40_000, compPrice: 52_000, tierId: 1 }] },
    skinList: skin(6), skinCount: 6, thumbnail: thumb, otherImages: null,
    totalRentHour: 96, password: "", stale_password: false,
    currentExpireAt: null, nextBooking: null, nextBookingDuration: null
  },
  {
    id: 10, username: "valsewa10", accountCode: "VAL-G302", nickname: "",
    accountRank: "Gold 3", availabilityStatus: "AVAILABLE",
    isCompetitive: false, isRecommended: false,
    priceTier: { id: 1, code: "C", priceList: [{ id: 1, duration: "1 DAY", unratedPrice: 35_000, compPrice: 45_500, tierId: 1 }] },
    skinList: skin(6), skinCount: 6, thumbnail: thumb, otherImages: null,
    totalRentHour: 24, password: "", stale_password: false,
    currentExpireAt: null, nextBooking: null, nextBookingDuration: null
  },
  {
    id: 11, username: "valsewa11", accountCode: "VAL-S101", nickname: "",
    accountRank: "Silver 1", availabilityStatus: "IN_USE",
    isCompetitive: false, isRecommended: false,
    priceTier: { id: 1, code: "C", priceList: [{ id: 1, duration: "1 DAY", unratedPrice: 30_000, compPrice: 39_000, tierId: 1 }] },
    skinList: skin(5), skinCount: 5, thumbnail: thumb, otherImages: null,
    totalRentHour: 72, password: "", stale_password: false,
    currentExpireAt: new Date("2026-06-01T08:00:00Z"),
    nextBooking: null, nextBookingDuration: null
  },
  {
    id: 12, username: "valsewa12", accountCode: "VAL-B201", nickname: "",
    accountRank: "Bronze 2", availabilityStatus: "AVAILABLE",
    isCompetitive: false, isRecommended: false,
    priceTier: { id: 1, code: "C", priceList: [{ id: 1, duration: "1 DAY", unratedPrice: 30_000, compPrice: 39_000, tierId: 1 }] },
    skinList: skin(5), skinCount: 5, thumbnail: thumb, otherImages: null,
    totalRentHour: 12, password: "", stale_password: false,
    currentExpireAt: null, nextBooking: null, nextBookingDuration: null
  },
  {
    id: 13, username: "valsewa13", accountCode: "VAL-IR301", nickname: "",
    accountRank: "Iron 3", availabilityStatus: "AVAILABLE",
    isCompetitive: false, isRecommended: false,
    priceTier: { id: 1, code: "C", priceList: [{ id: 1, duration: "1 DAY", unratedPrice: 30_000, compPrice: 39_000, tierId: 1 }] },
    skinList: skin(5), skinCount: 5, thumbnail: thumb, otherImages: null,
    totalRentHour: 6, password: "", stale_password: false,
    currentExpireAt: null, nextBooking: null, nextBookingDuration: null
  },
  {
    id: 14, username: "valsewa14", accountCode: "VAL-UR01", nickname: "",
    accountRank: "Unrated", availabilityStatus: "IN_USE",
    isCompetitive: false, isRecommended: false,
    priceTier: { id: 1, code: "C", priceList: [{ id: 1, duration: "1 DAY", unratedPrice: 30_000, compPrice: 39_000, tierId: 1 }] },
    skinList: skin(7), skinCount: 7, thumbnail: thumb, otherImages: null,
    totalRentHour: 144, password: "", stale_password: false,
    currentExpireAt: new Date("2026-05-25T18:00:00Z"),
    nextBooking: null, nextBookingDuration: null
  }
];

// ---------------------------------------------------------------------------
// Inline countdown hook (uppercase D/H/M format)
// ---------------------------------------------------------------------------

function useCountdownDHM(target: Date | null): string {
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!target) return;
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setLabel("0D:00H:00M");
        return;
      }
      const d = Math.floor(diff / 86_400_000);
      const h = Math.floor((diff % 86_400_000) / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      setLabel(
        `${d}D:${String(h).padStart(2, "0")}H:${String(m).padStart(2, "0")}M`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return label;
}

// ---------------------------------------------------------------------------
// CatalogueCard sub-component (needs its own hook call)
// ---------------------------------------------------------------------------

function CatalogueCard({ acc }: { acc: AccountEntity }) {
  const inUse = acc.availabilityStatus === "IN_USE";
  const countdown = useCountdownDHM(
    inUse && acc.currentExpireAt ? new Date(acc.currentExpireAt) : null
  );
  const rankImage =
    RANKS.find((r) => acc.accountRank.startsWith(r.id))?.image ??
    "/rank/unranked.webp";

  return (
    <Link
      href={`/details/${acc.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative block rounded-xl overflow-hidden border border-white/10
                  bg-gradient-to-b from-[#111111] to-[#1a0608] transition-all duration-300
                  ${inUse ? "pointer-events-none" : "hover:scale-[1.02] hover:border-white/30"}`}
    >
      {/* Darkened overlay for IN_USE */}
      {inUse && (
        <div className="absolute inset-0 bg-black/50 z-20 rounded-xl pointer-events-none" />
      )}

      {/* HEADER */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative w-7 h-7 md:w-8 md:h-8 shrink-0">
            <Image
              src={rankImage}
              alt={acc.accountRank}
              fill
              className="object-contain"
            />
          </div>
          <p className="text-white font-semibold text-[0.55rem] md:text-xs truncate leading-tight">
            {acc.accountRank} | {acc.accountCode}
          </p>
        </div>
        <span
          className={`shrink-0 text-[0.5rem] md:text-[0.6rem] font-bold px-2 py-0.5 rounded
                      ${acc.isCompetitive ? "bg-red-600/80" : "bg-neutral-700"} text-white whitespace-nowrap`}
        >
          {acc.isCompetitive ? "Competitive" : "Unrated"}
        </span>
      </div>

      {/* THUMBNAIL */}
      <div className="relative px-3">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={acc.thumbnail?.imageUrl ?? "/defaultPicture/default.jpg"}
            alt={acc.accountCode}
            fill
            className="object-cover rounded-md"
            unoptimized
          />
        </AspectRatio>

        {/* ON RENT overlay */}
        {inUse && (
          <div className="absolute inset-0 z-30 flex items-center justify-center px-3">
            <div className="bg-black w-full rounded-md px-3 py-2.5 text-center">
              <p className="text-white font-bold text-[0.6rem] md:text-xs tracking-[0.2em] uppercase">
                ON RENT
              </p>
              <hr className="border-white/20 my-1.5" />
              <p className="text-white/50 text-[0.5rem] md:text-[0.6rem] mb-1 uppercase tracking-wider">
                Available in:
              </p>
              <p className="text-white font-bold text-xs md:text-sm">{countdown}</p>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="flex justify-end px-3 py-2">
        <span className="text-[0.5rem] md:text-[0.6rem] text-white/60 bg-white/10 px-2 py-0.5 rounded-sm whitespace-nowrap">
          Skin Amount | {acc.skinList.length}
        </span>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Shared sort popover content
// ---------------------------------------------------------------------------

function SortPopoverContent({
  sortBy,
  setSortBy,
  setSortDropOpen
}: {
  sortBy: SortOption;
  setSortBy: (v: SortOption) => void;
  setSortDropOpen: (v: boolean) => void;
}) {
  const options: SortOption[] = [
    "date_added",
    "most_rented",
    "cheapest",
    "available_now"
  ];
  return (
    <>
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <span className="text-sm font-semibold text-white">Sort By</span>
        <ArrowUp className="w-4 h-4 text-white/50" />
      </div>
      <div className="py-1">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => {
              setSortBy(opt);
              setSortDropOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 text-sm transition
              ${sortBy === opt ? "text-white bg-white/10" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
          >
            {SORT_LABELS[opt]}
          </button>
        ))}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Clamp helper
// ---------------------------------------------------------------------------

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function CataloguePage() {
  const mainRef = useRef<HTMLDivElement>(null);

  // Navbar state
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeBrand, setActiveBrand] = useState<
    "valsewa" | "valjubel" | "valjoki"
  >("valsewa");

  // Filter state
  const [selectedRanks, setSelectedRanks] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_MIN,
    PRICE_MAX
  ]);
  const [selectedTiers, setSelectedTiers] = useState<
    { tier: string; isCompetitive: boolean }[]
  >([]);

  // Dropdown open states (desktop)
  const [rankDropOpen, setRankDropOpen] = useState(false);
  const [priceDropOpen, setPriceDropOpen] = useState(false);
  const [tierDropOpen, setTierDropOpen] = useState(false);

  // Skin state
  const [skinSearchOpen, setSkinSearchOpen] = useState(false); // desktop dialog
  const [mobileSkinDropOpen, setMobileSkinDropOpen] = useState(false); // mobile dropdown
  const [skinQuery, setSkinQuery] = useState("");
  const [selectedSkinNames, setSelectedSkinNames] = useState<string[]>([]);

  // Mobile
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sort
  const [sortBy, setSortBy] = useState<SortOption>("date_added");
  const [sortDropOpen, setSortDropOpen] = useState(false);

  // Derived
  const hasActiveFilters =
    selectedRanks.length > 0 ||
    selectedTiers.length > 0 ||
    priceRange[0] > PRICE_MIN ||
    priceRange[1] < PRICE_MAX;
  const hasSkins = selectedSkinNames.length > 0;
  const totalActiveFilters =
    selectedRanks.length +
    selectedTiers.length +
    (priceRange[0] > PRICE_MIN || priceRange[1] < PRICE_MAX ? 1 : 0);

  // Scroll tracking
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 1);
  };

  // Scrollbar width CSS variable
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth - el.clientWidth;
      document.documentElement.style.setProperty(
        "--scrollbar-width",
        `${w}px`
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  const toggleRank = (id: string) =>
    setSelectedRanks((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );

  const toggleTier = (tier: string, isCompetitive: boolean) =>
    setSelectedTiers((prev) => {
      const exists = prev.some(
        (t) => t.tier === tier && t.isCompetitive === isCompetitive
      );
      return exists
        ? prev.filter(
            (t) => !(t.tier === tier && t.isCompetitive === isCompetitive)
          )
        : [...prev, { tier, isCompetitive }];
    });

  const setMin = (v: number) =>
    setPriceRange([clamp(v, PRICE_MIN, priceRange[1]), priceRange[1]]);
  const setMax = (v: number) =>
    setPriceRange([priceRange[0], clamp(v, priceRange[0], PRICE_MAX)]);

  const toggleSkin = (name: string) =>
    setSelectedSkinNames((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  const removeSkin = (name: string) =>
    setSelectedSkinNames((prev) => prev.filter((n) => n !== name));

  const resetAllFilters = () => {
    setSelectedRanks([]);
    setPriceRange([PRICE_MIN, PRICE_MAX]);
    setSelectedTiers([]);
    setSelectedSkinNames([]);
  };

  // ---------------------------------------------------------------------------
  // Label helpers
  // ---------------------------------------------------------------------------

  const rankLabel = () => {
    if (selectedRanks.length === 0) return "Rank";
    if (selectedRanks.length === 1) return selectedRanks[0];
    return `${selectedRanks[0]} +${selectedRanks.length - 1}`;
  };

  const priceLabel = () => {
    const [min, max] = priceRange;
    if (min === PRICE_MIN && max === PRICE_MAX) return "Price";
    if (min === PRICE_MIN) return `Up to ${max.toLocaleString("id-ID")}`;
    return `${min.toLocaleString("id-ID")} – ${max.toLocaleString("id-ID")}`;
  };

  const tierLabel = () => {
    if (selectedTiers.length === 0) return "Tier";
    const first = selectedTiers[0];
    const firstLabel = first.isCompetitive
      ? `Competitive - ${first.tier}`
      : `Unrated - ${first.tier}`;
    if (selectedTiers.length === 1) return firstLabel;
    return `${firstLabel} +${selectedTiers.length - 1}`;
  };

  // ---------------------------------------------------------------------------
  // Filtering + sorting
  // ---------------------------------------------------------------------------

  const filteredAccounts = useMemo(() => {
    let result = DUMMY_ACCOUNTS.filter((acc) => {
      if (selectedRanks.length > 0) {
        const base = acc.accountRank.split(" ")[0];
        if (!selectedRanks.includes(base)) return false;
      }
      if (priceRange[0] > PRICE_MIN || priceRange[1] < PRICE_MAX) {
        const ref = acc.priceTier.priceList[0]?.unratedPrice ?? 0;
        if (ref < priceRange[0] || ref > priceRange[1]) return false;
      }
      if (selectedTiers.length > 0) {
        const match = selectedTiers.some(
          (t) =>
            acc.priceTier.code === t.tier &&
            acc.isCompetitive === t.isCompetitive
        );
        if (!match) return false;
      }
      return true;
    });

    if (sortBy === "cheapest") {
      result = [...result].sort(
        (a, b) =>
          (a.priceTier.priceList[0]?.unratedPrice ?? 0) -
          (b.priceTier.priceList[0]?.unratedPrice ?? 0)
      );
    } else if (sortBy === "available_now") {
      result = [...result].sort((a, b) =>
        a.availabilityStatus === "AVAILABLE"
          ? -1
          : b.availabilityStatus === "AVAILABLE"
            ? 1
            : 0
      );
    } else if (sortBy === "most_rented") {
      result = [...result].sort((a, b) => b.totalRentHour - a.totalRentHour);
    }

    return result;
  }, [selectedRanks, priceRange, selectedTiers, sortBy]);

  // ---------------------------------------------------------------------------
  // Shared filter content (rank, tier, price) — reused in desktop popover & mobile modal
  // ---------------------------------------------------------------------------

  const RankFilterContent = () => (
    <div className="space-y-0.5">
      {RANKS.map((r) => {
        const checked = selectedRanks.includes(r.id);
        return (
          <div
            key={r.id}
            onClick={() => toggleRank(r.id)}
            className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <Checkbox
              id={`rank-${r.id}`}
              checked={checked}
              onCheckedChange={() => toggleRank(r.id)}
              className="h-4 w-4 border-neutral-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
            />
            <Label
              htmlFor={`rank-${r.id}`}
              className="flex items-center gap-2 cursor-pointer flex-1"
            >
              <div className="relative w-5 h-5 shrink-0">
                <Image
                  src={r.image}
                  alt={r.id}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm text-white">{r.id}</span>
            </Label>
          </div>
        );
      })}
    </div>
  );

  const TierFilterContent = () => (
    <div className="grid grid-cols-2 gap-x-6 gap-y-1">
      {/* Competitive column */}
      <div className="space-y-1">
        <p className="text-[0.65rem] font-semibold text-white/50 uppercase tracking-wider mb-2">
          Competitive
        </p>
        {TIER_CODES.map((t) => {
          const checked = selectedTiers.some(
            (st) => st.tier === t && st.isCompetitive
          );
          return (
            <div
              key={`comp-${t}`}
              onClick={() => toggleTier(t, true)}
              className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-white/5 rounded px-1"
            >
              <Checkbox
                id={`tier-comp-${t}`}
                checked={checked}
                onCheckedChange={() => toggleTier(t, true)}
                className="h-4 w-4 border-neutral-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
              />
              <Label
                htmlFor={`tier-comp-${t}`}
                className="text-sm text-white cursor-pointer"
              >
                {t}
              </Label>
            </div>
          );
        })}
      </div>
      {/* Unrated column */}
      <div className="space-y-1">
        <p className="text-[0.65rem] font-semibold text-white/50 uppercase tracking-wider mb-2">
          Unrated
        </p>
        {TIER_CODES.map((t) => {
          const checked = selectedTiers.some(
            (st) => st.tier === t && !st.isCompetitive
          );
          return (
            <div
              key={`unr-${t}`}
              onClick={() => toggleTier(t, false)}
              className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-white/5 rounded px-1"
            >
              <Checkbox
                id={`tier-unr-${t}`}
                checked={checked}
                onCheckedChange={() => toggleTier(t, false)}
                className="h-4 w-4 border-neutral-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
              />
              <Label
                htmlFor={`tier-unr-${t}`}
                className="text-sm text-white cursor-pointer"
              >
                {t}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );

  const PriceFilterContent = () => (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <p className="text-[11px] text-neutral-400">Min</p>
          <Input
            type="number"
            inputMode="numeric"
            value={priceRange[0]}
            min={PRICE_MIN}
            max={priceRange[1]}
            step={5000}
            onChange={(e) => setMin(Number(e.target.value || 0))}
            className="h-9 bg-neutral-800 border-neutral-700 text-white text-sm"
          />
        </div>
        <div className="space-y-1">
          <p className="text-[11px] text-neutral-400">Max</p>
          <Input
            type="number"
            inputMode="numeric"
            value={priceRange[1]}
            min={priceRange[0]}
            max={PRICE_MAX}
            step={5000}
            onChange={(e) => setMax(Number(e.target.value || 0))}
            className="h-9 bg-neutral-800 border-neutral-700 text-white text-sm"
          />
        </div>
      </div>
      <Slider
        value={[priceRange[0], priceRange[1]]}
        min={PRICE_MIN}
        max={PRICE_MAX}
        step={5000}
        onValueChange={(v) => {
          const a = v[0] ?? PRICE_MIN;
          const b = v[1] ?? PRICE_MAX;
          setPriceRange([Math.min(a, b), Math.max(a, b)]);
        }}
      />
      <div className="flex items-center justify-between text-xs text-neutral-400">
        <span>Rp {priceRange[0].toLocaleString("id-ID")}</span>
        <span>Rp {priceRange[1].toLocaleString("id-ID")}</span>
      </div>
    </div>
  );

  // ---------------------------------------------------------------------------
  // Shared skin list (desktop Dialog + mobile Popover)
  // ---------------------------------------------------------------------------

  const SkinList = () => (
    <>
      {DUMMY_SKINS.filter(
        (s) =>
          !skinQuery ||
          s.name.toLowerCase().includes(skinQuery.toLowerCase())
      ).map((skin) => {
        const checked = selectedSkinNames.includes(skin.name);
        return (
          <div
            key={skin.id}
            onClick={() => toggleSkin(skin.name)}
            className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 cursor-pointer transition"
          >
            <Checkbox
              checked={checked}
              onCheckedChange={() => toggleSkin(skin.name)}
              className="h-4 w-4 shrink-0 border-neutral-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
            />
            <div className="relative w-9 h-9 rounded bg-neutral-800 shrink-0 overflow-hidden">
              <Image
                src={skin.imageUrl}
                alt={skin.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <span className="text-sm text-white truncate flex-1">
              {skin.name}
            </span>
          </div>
        );
      })}
    </>
  );

  // Shared dropdown trigger class builder
  const triggerCls = (active: boolean) =>
    `flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs md:text-sm border transition whitespace-nowrap
     ${active ? "border-white text-white" : "border-white/30 text-white/70 hover:border-white hover:text-white"}`;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div
      ref={mainRef}
      className="min-h-screen bg-black text-white overflow-y-auto"
      onScroll={handleScroll}
    >
      {/* ── Navbars ─────────────────────────────────────────────────────── */}
      <div className="hidden md:block">
        <NavbarHome
          activeBrand={activeBrand}
          setActiveBrand={setActiveBrand}
          isScrolled={isScrolled}
        />
      </div>
      <div className="md:hidden">
        <NavbarHomeMobile activeBrand={activeBrand} isScrolled={isScrolled} />
      </div>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-[64px] md:pt-[84px]">
        <div className="relative w-full h-[180px] md:h-[260px] 2xl-large:h-[320px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a0608]" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2 px-4 text-center">
            <h1 className="font-antonio font-black uppercase tracking-tighter text-5xl md:text-7xl 2xl-large:text-8xl text-white">
              CATALOGUE
            </h1>
            <p className="text-white/60 text-sm md:text-base font-instrumentSans">
              Explore 100+ Premium Accounts
            </p>
          </div>
        </div>
      </section>

      {/* ── Desktop sticky filter bar ────────────────────────────────────── */}
      <div className="hidden md:block sticky top-[84px] z-40 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-[1920px] mx-auto">

          {/* Row 1 */}
          <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-3 gap-3">
            {/* Left */}
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              {/* Rank */}
              <Popover open={rankDropOpen} onOpenChange={setRankDropOpen}>
                <PopoverTrigger asChild>
                  <button className={triggerCls(selectedRanks.length > 0)}>
                    <span>{rankLabel()}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-52 p-2 bg-neutral-900 border-white/20 text-white"
                  align="start"
                  sideOffset={8}
                >
                  <div className="max-h-72 overflow-y-auto">
                    <RankFilterContent />
                  </div>
                </PopoverContent>
              </Popover>

              {/* Price */}
              <Popover open={priceDropOpen} onOpenChange={setPriceDropOpen}>
                <PopoverTrigger asChild>
                  <button
                    className={triggerCls(
                      priceRange[0] > PRICE_MIN || priceRange[1] < PRICE_MAX
                    )}
                  >
                    <span>{priceLabel()}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-72 p-4 bg-neutral-900 border-white/20 text-white"
                  align="start"
                  sideOffset={8}
                >
                  <p className="text-sm font-medium text-white mb-3">
                    Price Range
                  </p>
                  <PriceFilterContent />
                </PopoverContent>
              </Popover>

              {/* Tier */}
              <Popover open={tierDropOpen} onOpenChange={setTierDropOpen}>
                <PopoverTrigger asChild>
                  <button className={triggerCls(selectedTiers.length > 0)}>
                    <span>{tierLabel()}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-72 p-4 bg-neutral-900 border-white/20 text-white"
                  align="start"
                  sideOffset={8}
                >
                  <TierFilterContent />
                </PopoverContent>
              </Popover>

              {/* Reset — only when filters active and no skin tags */}
              {hasActiveFilters && !hasSkins && (
                <button
                  onClick={resetAllFilters}
                  className="flex items-center gap-1.5 text-xs md:text-sm text-white/50 hover:text-white transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  reset filter
                </button>
              )}
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <button className="border border-white/30 rounded-xl px-3 md:px-4 py-2 text-xs md:text-sm text-white/70 hover:border-white hover:text-white transition whitespace-nowrap">
                Daily Drop
              </button>
              <div
                onClick={() => setSkinSearchOpen(true)}
                className="flex items-center gap-2 border border-white/20 rounded-xl px-3 py-2 cursor-pointer hover:border-white/50 bg-white/5 hover:bg-white/10 transition w-36 md:w-48"
              >
                <Search className="w-3.5 h-3.5 text-white/40 shrink-0" />
                <span className="text-xs md:text-sm text-white/40 truncate select-none">
                  search by skin na...
                </span>
              </div>
            </div>
          </div>

          {/* Row 2 — skin tags (only when skins selected) */}
          {hasSkins && (
            <div className="flex items-center gap-2 px-4 md:px-8 lg:px-16 pb-3 flex-wrap">
              <button
                onClick={resetAllFilters}
                className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition"
              >
                <RotateCcw className="w-3 h-3" />
                reset filter
              </button>
              {selectedSkinNames.map((name) => (
                <span
                  key={name}
                  className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs text-white"
                >
                  {name}
                  <button
                    onClick={() => removeSkin(name)}
                    className="text-white/50 hover:text-white transition leading-none ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile sticky filter section ─────────────────────────────────── */}
      <div className="md:hidden sticky top-[64px] z-40 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 space-y-2">
          {/* Skin search — inline Popover dropdown */}
          <Popover
            open={mobileSkinDropOpen}
            onOpenChange={setMobileSkinDropOpen}
          >
            <PopoverTrigger asChild>
              <div className="flex items-center gap-2 border border-white/20 rounded-xl px-3 py-2.5 cursor-pointer hover:border-white/50 bg-white/5 w-full">
                <Search className="w-4 h-4 text-white/40 shrink-0" />
                <span className="text-sm text-white/40 flex-1 select-none">
                  search by skin na...
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="p-0 bg-neutral-950 border-white/20 text-white"
              style={{ width: "var(--radix-popover-trigger-width)" }}
              align="start"
              sideOffset={6}
            >
              <div className="px-3 pt-3 pb-2 border-b border-white/10">
                <Input
                  value={skinQuery}
                  onChange={(e) => setSkinQuery(e.target.value)}
                  placeholder="Search skins..."
                  className="bg-neutral-900 border-neutral-800 text-white text-sm h-9 placeholder:text-neutral-500 focus-visible:ring-red-600/40"
                  autoFocus
                />
              </div>
              <div className="max-h-56 overflow-y-auto py-1">
                <SkinList />
              </div>
            </PopoverContent>
          </Popover>

          {/* Filter + Sort buttons */}
          <div className="flex items-center gap-2">
            {/* Filter */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-1.5 border border-white/30 rounded-xl px-3 py-2 text-sm text-white/70 hover:border-white hover:text-white transition"
            >
              <ListFilter className="w-4 h-4" />
              Filters
              {totalActiveFilters > 0 && (
                <span className="bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {totalActiveFilters}
                </span>
              )}
            </button>

            {/* Sort */}
            <Popover open={sortDropOpen} onOpenChange={setSortDropOpen}>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-1.5 border border-white/30 rounded-xl px-3 py-2 text-sm text-white/70 hover:border-white hover:text-white transition">
                  <SortAsc className="w-4 h-4" />
                  Sort by
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-52 p-0 bg-neutral-900 border-white/20 text-white"
                align="start"
                sideOffset={8}
              >
                <SortPopoverContent
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  setSortDropOpen={setSortDropOpen}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* ── Inventory header + desktop sort ─────────────────────────────── */}
      <div className="px-4 md:px-8 lg:px-16 pt-6 md:pt-8 pb-3 max-w-[1920px] mx-auto">
        <h2 className="text-3xl md:text-5xl font-antonio font-black text-white tracking-tighter uppercase">
          FULL INVENTORY
        </h2>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-white/70 text-xs md:text-lg font-instrumentSans">
            Explore 100+ Premium Account Today!
          </p>
          {/* Sort — desktop only (mobile has dedicated Sort by button) */}
          <Popover open={sortDropOpen} onOpenChange={setSortDropOpen}>
            <PopoverTrigger asChild>
              <button className="hidden md:flex items-center gap-1.5 text-xs md:text-sm text-white/60 hover:text-white transition whitespace-nowrap">
                <SortAsc className="w-3.5 h-3.5" />
                sorted by {SORT_LABELS[sortBy]}
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-52 p-0 bg-neutral-900 border-white/20 text-white"
              align="end"
              sideOffset={8}
            >
              <SortPopoverContent
                sortBy={sortBy}
                setSortBy={setSortBy}
                setSortDropOpen={setSortDropOpen}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* ── Account grid ────────────────────────────────────────────────── */}
      <section className="px-4 md:px-8 lg:px-16 pb-12 max-w-[1920px] mx-auto">
        {filteredAccounts.length === 0 ? (
          <div className="text-center py-24 text-white/40">
            <p className="text-lg">No accounts match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
            {filteredAccounts.map((acc) => (
              <CatalogueCard key={acc.id} acc={acc} />
            ))}
          </div>
        )}
      </section>

      {/* ── Desktop skin search Dialog ───────────────────────────────────── */}
      <Dialog open={skinSearchOpen} onOpenChange={setSkinSearchOpen}>
        <DialogContent className="max-w-lg w-[95vw] max-h-[80vh] p-0 overflow-hidden bg-neutral-950 border-white/20 text-white">
          <DialogTitle className="sr-only">Search by Skin</DialogTitle>
          <div className="px-4 pt-4 pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2 bg-neutral-900 rounded-xl px-3 border border-neutral-800 focus-within:border-red-600/40">
              <Search className="w-4 h-4 text-white/40 shrink-0" />
              <Input
                value={skinQuery}
                onChange={(e) => setSkinQuery(e.target.value)}
                placeholder="Search skins..."
                className="flex-1 border-0 bg-transparent text-white placeholder:text-neutral-500 focus-visible:ring-0 focus-visible:ring-offset-0 h-11"
                autoFocus
              />
            </div>
          </div>
          <div className="overflow-y-auto max-h-[60vh] py-1">
            <SkinList />
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Mobile filter bottom-sheet ───────────────────────────────────── */}
      <Dialog open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
        <DialogContent className="md:hidden fixed bottom-0 left-0 right-0 top-auto w-full max-w-full h-[90vh] rounded-t-2xl rounded-b-none p-0 bg-neutral-950 border-white/20 translate-x-0 translate-y-0 flex flex-col">
          <DialogTitle className="sr-only">Filters</DialogTitle>

          {/* Scrollable filters */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-7">
            {/* Rank */}
            <div>
              <p className="text-white font-semibold text-base mb-3">Rank</p>
              <RankFilterContent />
            </div>

            {/* Tier */}
            <div>
              <p className="text-white font-semibold text-base mb-3">Tier</p>
              <TierFilterContent />
            </div>

            {/* Price */}
            <div>
              <p className="text-white font-semibold text-base mb-3">Price</p>
              <PriceFilterContent />
            </div>

            {/* Show N accounts red button */}
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl py-3 text-sm transition"
            >
              show {filteredAccounts.length} accounts →
            </button>
          </div>

          {/* Sticky footer */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-4 border-t border-white/10 bg-neutral-950">
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="text-white/70 text-sm hover:text-white transition px-4 py-2"
            >
              Cancel
            </button>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="border border-white text-white text-sm rounded-xl px-5 py-2 hover:bg-white hover:text-black transition"
            >
              Save
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
