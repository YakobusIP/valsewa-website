"use client";

import React, { useEffect, useState } from "react";

import { priceTierService } from "@/services/pricetier.service";

import { cn } from "@/lib/utils";

import Image from "next/image";

const tierStyles: Record<
  string,
  { rankLetter: string; color: string; bgGradient: string }
> = {
  C: {
    rankLetter: "C",
    color: "text-[#C69C6D]", // Bronze/Brownish
    bgGradient: "from-[#C69C6D]/20 to-transparent"
  },
  B: {
    rankLetter: "B",
    color: "text-[#A6A6A6]", // Silver/Grey
    bgGradient: "from-[#A6A6A6]/20 to-transparent"
  },
  A: {
    rankLetter: "A",
    color: "text-[#BD2C2C]", // Red
    bgGradient: "from-[#BD2C2C]/20 to-transparent"
  },
  S: {
    rankLetter: "S",
    color: "text-[#3B5BDB]", // Blue
    bgGradient: "from-[#3B5BDB]/20 to-transparent"
  },
  SSS: {
    rankLetter: "SSS",
    color: "text-[#9146FF]", // Purple
    bgGradient: "from-[#9146FF]/20 to-transparent"
  },
  "SSS⁺": {
    rankLetter: "SSS⁺",
    color: "text-[#FFD700]", // Gold
    bgGradient: "from-[#FFD700]/20 to-transparent"
  },
  V: {
    rankLetter: "V",
    color: "text-[#00CED1]", // Turquoise
    bgGradient: "from-[#00CED1]/20 to-transparent"
  }
};

const rankStyles: Record<
  string,
  { name: string; color: string; bgGradient: string; image: string }
> = {
  Iron: {
    name: "IRON",
    color: "text-[#7A7A7A]",
    bgGradient: "from-[#7A7A7A]/30 to-transparent",
    image: "/rank/Iron 3.svg"
  },
  Bronze: {
    name: "BRONZE",
    color: "text-[#C69C6D]",
    bgGradient: "from-[#C69C6D]/30 to-transparent",
    image: "/rank/Bronze 3.svg"
  },
  Silver: {
    name: "SILVER",
    color: "text-[#A6A6A6]",
    bgGradient: "from-[#A6A6A6]/30 to-transparent",
    image: "/rank/Silver 3.svg"
  },
  Gold: {
    name: "GOLD",
    color: "text-[#FFD166]",
    bgGradient: "from-[#FFD166]/30 to-transparent",
    image: "/rank/Gold 3.svg"
  },
  Platinum: {
    name: "PLATINUM",
    color: "text-[#3CCFCF]",
    bgGradient: "from-[#3CCFCF]/30 to-transparent",
    image: "/rank/Platinum 3.svg"
  },
  Diamond: {
    name: "DIAMOND",
    color: "text-[#B983FF]",
    bgGradient: "from-[#B983FF]/30 to-transparent",
    image: "/rank/Diamond 3.svg"
  },
  Ascendant: {
    name: "ASCENDANT",
    color: "text-[#2EE59D]",
    bgGradient: "from-[#2EE59D]/30 to-transparent",
    image: "/rank/Ascendant 3.svg"
  },
  Immortal: {
    name: "IMMORTAL",
    color: "text-[#FF4D6D]",
    bgGradient: "from-[#FF4D6D]/30 to-transparent",
    image: "/rank/Immortal 3.svg"
  },
  Radiant: {
    name: "RADIANT",
    color: "text-[#FFD700]",
    bgGradient: "from-[#FFD700]/30 to-transparent",
    image: "/rank/Radiant.svg"
  }
};

const tierDisplayOrder = ["C", "B", "A", "S", "SSS"];
const rankDisplayOrder = [
  "Iron",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Ascendant",
  "Immortal",
  "Radiant"
];

type DiscoverSectionProps = {
  onSelectTier: (id: string, isLowTier: string) => void;
  onSelectRank: (rank: string) => void;
  loading?: boolean;
};

type FilterType = "LR-TIER" | "TIER" | "RANK";

type TierData = {
  id: string;
  rankLetter: string;
  color: string;
  bgGradient: string;
  price: string;
};

type RankData = {
  id: string;
  name: string;
  color: string;
  bgGradient: string;
  price: string;
  image: string;
};

export default function DiscoverSection({
  onSelectTier,
  onSelectRank,
  loading
}: DiscoverSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("LR-TIER");
  const [lrTiers, setLrTiers] = useState<TierData[]>([]);
  const [tiers, setTiers] = useState<TierData[]>([]);
  const [ranks, setRanks] = useState<RankData[]>([]);
  const [pricesLoading, setPricesLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const pricesData = await priceTierService.fetchPublicPrices();

        const lrPriceMap = new Map(
          pricesData?.lrTiers?.map((t) => [t.id, t.price]) || []
        );
        const tierPriceMap = new Map(
          pricesData?.tiers?.map((t) => [t.id, t.price]) || []
        );
        const rankPriceMap = new Map(
          pricesData?.ranks?.map((r) => [r.id, r.price]) || []
        );

        const builtLrTiers: TierData[] = tierDisplayOrder
          .filter((id) => tierStyles[id])
          .map((id) => ({
            id,
            rankLetter: tierStyles[id].rankLetter,
            color: tierStyles[id].color,
            bgGradient: tierStyles[id].bgGradient,
            price: lrPriceMap.get(id) || "Rp -"
          }));

        const builtTiers: TierData[] = tierDisplayOrder
          .filter((id) => tierStyles[id])
          .map((id) => ({
            id,
            rankLetter: tierStyles[id].rankLetter,
            color: tierStyles[id].color,
            bgGradient: tierStyles[id].bgGradient,
            price: tierPriceMap.get(id) || "Rp -"
          }));

        const builtRanks: RankData[] = rankDisplayOrder
          .filter((id) => rankStyles[id])
          .map((id) => ({
            id,
            name: rankStyles[id].name,
            color: rankStyles[id].color,
            bgGradient: rankStyles[id].bgGradient,
            image: rankStyles[id].image,
            price: rankPriceMap.get(id) || "Rp -"
          }));

        setLrTiers(builtLrTiers);
        setTiers(builtTiers);
        setRanks(builtRanks);
      } catch (error) {
        console.error("Failed to fetch prices:", error);
        const builtLrTiers: TierData[] = tierDisplayOrder
          .filter((id) => tierStyles[id])
          .map((id) => ({
            id,
            rankLetter: tierStyles[id].rankLetter,
            color: tierStyles[id].color,
            bgGradient: tierStyles[id].bgGradient,
            price: "Rp -"
          }));

        const builtTiers: TierData[] = tierDisplayOrder
          .filter((id) => tierStyles[id])
          .map((id) => ({
            id,
            rankLetter: tierStyles[id].rankLetter,
            color: tierStyles[id].color,
            bgGradient: tierStyles[id].bgGradient,
            price: "Rp -"
          }));

        const builtRanks: RankData[] = rankDisplayOrder
          .filter((id) => rankStyles[id])
          .map((id) => ({
            id,
            name: rankStyles[id].name,
            color: rankStyles[id].color,
            bgGradient: rankStyles[id].bgGradient,
            image: rankStyles[id].image,
            price: "Rp -"
          }));

        setLrTiers(builtLrTiers);
        setTiers(builtTiers);
        setRanks(builtRanks);
      } finally {
        setPricesLoading(false);
      }
    };

    fetchPrices();
  }, []);

  return (
    <section className="w-full relative z-10 mb-12 mt-32">
      <div className="w-full max-w-[1920px] mx-auto">
        <div className="sm:bg-gradient-to-r sm:from-black sm:via-[#5e0000] sm:to-[#C70515] sm:rounded-3xl 2md:p-8 sm:p-8 md:p-8 relative overflow-hidden sm:bg-clip-padding sm:border sm:border-transparent sm:ring-1 sm:ring-white/10 sm:shadow-2xl">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-antonio font-black text-white tracking-tighter">
                  DISCOVER BY
                </h2>

                {/* Filter Tabs */}
                <div className="flex items-center bg-black/40 rounded-lg p-1 border border-white/10 overflow-x-auto scrollbar-hide max-w-full">
                  <button
                    onClick={() => setActiveFilter("LR-TIER")}
                    className={cn(
                      "px-4 py-1.5 rounded-md text-[0.5rem] sm:text-xs font-bold transition-all uppercase",
                      activeFilter === "LR-TIER"
                        ? "bg-white/10 text-white"
                        : "text-white/40 hover:text-white/70"
                    )}
                  >
                    LR - TIER
                  </button>
                  <button
                    onClick={() => setActiveFilter("TIER")}
                    className={cn(
                      "px-4 py-1.5 rounded-md text-[0.5rem] sm:text-xs font-bold transition-all uppercase",
                      activeFilter === "TIER"
                        ? "bg-white/10 text-white"
                        : "text-white/40 hover:text-white/70"
                    )}
                  >
                    TIER
                  </button>
                  <button
                    onClick={() => setActiveFilter("RANK")}
                    className={cn(
                      "px-4 py-1.5 rounded-md text-[0.5rem] sm:text-xs font-bold transition-all uppercase",
                      activeFilter === "RANK"
                        ? "bg-white/10 text-white"
                        : "text-white/40 hover:text-white/70"
                    )}
                  >
                    RANK
                  </button>
                </div>
              </div>
              <p className="text-white/70 text-xs md:text-lg">
                Choose accounts that fit your needs
              </p>
            </div>
          </div>

          {activeFilter === "LR-TIER" && (
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory xl:grid xl:grid-cols-5 xl:overflow-visible">
              {pricesLoading ? (
                <div className="col-span-5 flex justify-center items-center h-[220px]">
                  <span className="text-white/50 text-sm">
                    Loading prices...
                  </span>
                </div>
              ) : lrTiers.length === 0 ? (
                <div className="col-span-5 flex justify-center items-center h-[220px]">
                  <span className="text-white/50 text-sm">
                    No tiers available
                  </span>
                </div>
              ) : (
                lrTiers.map((lrtier) => (
                  <div
                    key={lrtier.id}
                    className="group relative bg-[#111] rounded-2xl border border-[#787878] p-5 h-[220px] flex flex-col justify-between overflow-hidden min-w-[48%] sm:min-w-[260px] xl:min-w-0 snap-start"
                  >
                    {/* Available Badge */}
                    <span className="absolute top-4 left-4 bg-[#4ade80] text-black text-[10px] font-bold px-2 py-1 rounded">
                      Available
                    </span>

                    {/* Main Content */}
                    <div className="flex items-baseline justify-center sm:mt-4  mt-6 relative z-10">
                      <span className="sm:text-6xl text-2xl font-black italic text-white mr-2 tracking-tighter font-antonio">
                        LR
                      </span>
                      <span
                        className={cn(
                          "text-5xl sm:text-8xl font-black italic tracking-tighter leading-none transform translate-y-2 font-antonio",
                          lrtier.color
                        )}
                      >
                        {lrtier.rankLetter}
                      </span>
                    </div>

                    {/* Background Glow */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t opacity-10 group-hover:opacity-20 transition-opacity",
                        lrtier.bgGradient
                      )}
                    />

                    {/* Footer */}
                    <div className="flex items-end justify-between mt-auto relative z-10">
                      <div className="flex flex-col">
                        <span className="text-white/50 text-[10px] font-medium border-none underline-offset-auto">
                          Starts From
                        </span>
                        <span className="text-white font-bold text-sm sm:text-lg leading-tight">
                          {lrtier.price}
                        </span>
                      </div>

                      <button
                        type="button"
                        disabled={loading}
                        onClick={() =>
                          onSelectTier(lrtier.id.concat("-LRTIER"), "true")
                        }
                        className={cn(
                          "bg-[#2f54eb] hover:bg-[#1d39c4] text-white text-[10px] font-bold px-4 py-2 rounded-lg transition-colors",
                          loading && "opacity-60 cursor-not-allowed"
                        )}
                      >
                        {loading ? "Loading..." : "See More"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          {activeFilter === "TIER" && (
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory xl:grid xl:grid-cols-5 xl:overflow-visible">
              {pricesLoading ? (
                <div className="col-span-5 flex justify-center items-center h-[220px]">
                  <span className="text-white/50 text-sm">
                    Loading prices...
                  </span>
                </div>
              ) : tiers.length === 0 ? (
                <div className="col-span-5 flex justify-center items-center h-[220px]">
                  <span className="text-white/50 text-sm">
                    No tiers available
                  </span>
                </div>
              ) : (
                tiers.map((tier) => (
                  <div
                    key={tier.id}
                    className="group relative bg-[#111] rounded-2xl border border-[#787878] p-5 h-[220px] flex flex-col justify-between overflow-hidden min-w-[48%] sm:min-w-[260px] xl:min-w-0 snap-start"
                  >
                    {/* Available Badge */}
                    <span className="absolute top-4 left-4 bg-[#4ade80] text-black text-[10px] font-bold px-2 py-1 rounded">
                      Available
                    </span>

                    {/* Main Content */}
                    <div className="flex items-baseline justify-center sm:mt-4  mt-6 relative z-10">
                      <span
                        className={cn(
                          "text-5xl sm:text-8xl font-black italic tracking-tighter leading-none transform translate-y-2 font-antonio",
                          tier.color
                        )}
                      >
                        {tier.rankLetter}
                      </span>
                    </div>

                    {/* Background Glow */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t opacity-10 group-hover:opacity-20 transition-opacity",
                        tier.bgGradient
                      )}
                    />

                    {/* Footer */}
                    <div className="flex items-end justify-between mt-auto relative z-10">
                      <div className="flex flex-col">
                        <span className="text-white/50 text-[10px] font-medium border-none underline-offset-auto">
                          Starts From
                        </span>
                        <span className="text-white font-bold text-sm sm:text-lg leading-tight">
                          {tier.price}
                        </span>
                      </div>

                      <button
                        type="button"
                        disabled={loading}
                        onClick={() => onSelectTier(tier.id, "false")}
                        className={cn(
                          "bg-[#2f54eb] hover:bg-[#1d39c4] text-white text-[10px] font-bold px-4 py-2 rounded-lg transition-colors",
                          loading && "opacity-60 cursor-not-allowed"
                        )}
                      >
                        {loading ? "Loading..." : "See More"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          {activeFilter === "RANK" && (
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
              {pricesLoading ? (
                <div className="w-full flex justify-center items-center h-[220px]">
                  <span className="text-white/50 text-sm">
                    Loading prices...
                  </span>
                </div>
              ) : ranks.length === 0 ? (
                <div className="w-full flex justify-center items-center h-[220px]">
                  <span className="text-white/50 text-sm">
                    No ranks available
                  </span>
                </div>
              ) : (
                ranks.map((rank) => (
                  <div
                    key={rank.id}
                    className={cn(
                      "relative w-[70%] sm:w-[260px] h-[220px] flex-shrink-0 rounded-2xl border border-white/10 overflow-hidden snap-start",
                      "sm:bg-gradient-to-b sm:from-[#3a0f0f] sm:via-[#1a0505] sm:to-black"
                    )}
                  >
                    {/* Rank Title */}
                    <div className="absolute top-4 left-4 z-20 text-right">
                      <p className="text-white text-xs font-semibold tracking-wider">
                        {rank.name}
                      </p>
                    </div>

                    {/* Available badge */}
                    <span
                      className={cn(
                        "absolute top-10 left-4 z-20  text-[10px] font-bold px-3 py-1 rounded",
                        rank.price === "Rp -"
                          ? "bg-[#C70515] text-white"
                          : "bg-[#4ade80] text-black"
                      )}
                    >
                      {rank.price === "Rp -" ? "Not Available" : "Available"}
                    </span>

                    {/* Rank Image */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                      <Image
                        src={rank.image}
                        alt={rank.name}
                        width={100}
                        height={100}
                        className="object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.35)]"
                      />
                    </div>

                    {/* Red Glow Background */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t opacity-40",
                        rank.bgGradient
                      )}
                    />

                    {/* Bottom Section */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-4 flex items-end justify-between">
                      <div className="flex flex-col">
                        <span className="text-white/50 text-[10px] font-medium">
                          Starts From
                        </span>
                        <span className="text-white font-bold text-sm sm:text-lg leading-tight">
                          {rank.price}
                        </span>
                      </div>

                      <button
                        type="button"
                        disabled={loading}
                        onClick={() => onSelectRank(rank.id)}
                        className={cn(
                          "bg-[#2f54eb] hover:bg-[#1d39c4] text-white text-[10px] font-bold px-4 py-2 rounded-lg transition-colors",
                          loading && "opacity-60 cursor-not-allowed"
                        )}
                      >
                        {loading ? "Loading..." : "See More"}
                      </button>
                    </div>

                    {/* Subtle border glow */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
