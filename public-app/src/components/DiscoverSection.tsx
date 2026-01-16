"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";

// Define the data for the tiers
const lrtiers = [
  {
    id: "c",
    rankLetter: "C",
    color: "text-[#C69C6D]", // Bronze/Brownish
    bgGradient: "from-[#C69C6D]/20 to-transparent",
    price: "Rp 25k"
  },
  {
    id: "b",
    rankLetter: "B",
    color: "text-[#A6A6A6]", // Silver/Grey
    bgGradient: "from-[#A6A6A6]/20 to-transparent",
    price: "Rp 25k"
  },
  {
    id: "a",
    rankLetter: "A",
    color: "text-[#BD2C2C]", // Red
    bgGradient: "from-[#BD2C2C]/20 to-transparent",
    price: "Rp 25k"
  },
  {
    id: "s",
    rankLetter: "S",
    color: "text-[#3B5BDB]", // Blue
    bgGradient: "from-[#3B5BDB]/20 to-transparent",
    price: "Rp 25k"
  },
  {
    id: "sss",
    rankLetter: "SSS",
    color: "text-[#9146FF]", // Purple
    bgGradient: "from-[#9146FF]/20 to-transparent",
    price: "Rp 25k"
  }
];

const tiers = [
  {
    id: "c",
    rankLetter: "C",
    color: "text-[#C69C6D]", // Bronze/Brownish
    bgGradient: "from-[#C69C6D]/20 to-transparent",
    price: "Rp 25k"
  },
  {
    id: "b",
    rankLetter: "B",
    color: "text-[#A6A6A6]", // Silver/Grey
    bgGradient: "from-[#A6A6A6]/20 to-transparent",
    price: "Rp 25k"
  },
  {
    id: "a",
    rankLetter: "A",
    color: "text-[#BD2C2C]", // Red
    bgGradient: "from-[#BD2C2C]/20 to-transparent",
    price: "Rp 25k"
  },
  {
    id: "s",
    rankLetter: "S",
    color: "text-[#3B5BDB]", // Blue
    bgGradient: "from-[#3B5BDB]/20 to-transparent",
    price: "Rp 25k"
  },
  {
    id: "sss",
    rankLetter: "SSS",
    color: "text-[#9146FF]", // Purple
    bgGradient: "from-[#9146FF]/20 to-transparent",
    price: "Rp 25k"
  }
];

const ranks = [
  {
    id: "iron",
    name: "IRON",
    color: "text-[#7A7A7A]",
    bgGradient: "from-[#7A7A7A]/30 to-transparent",
    price: "Rp 25k",
    image: "/rank/iron 3.svg"
  },
  {
    id: "bronze",
    name: "BRONZE",
    color: "text-[#C69C6D]",
    bgGradient: "from-[#C69C6D]/30 to-transparent",
    price: "Rp 25k",
    image: "/rank/bronze 3.svg"
  },
  {
    id: "silver",
    name: "SILVER",
    color: "text-[#A6A6A6]",
    bgGradient: "from-[#A6A6A6]/30 to-transparent",
    price: "Rp 25k",
    image: "/rank/silver 3.svg"
  },
  {
    id: "gold",
    name: "GOLD",
    color: "text-[#FFD166]",
    bgGradient: "from-[#FFD166]/30 to-transparent",
    price: "Rp 25k",
    image: "/rank/gold 3.svg"
  },
  {
    id: "platinum",
    name: "PLATINUM",
    color: "text-[#3CCFCF]",
    bgGradient: "from-[#3CCFCF]/30 to-transparent",
    price: "Rp 25k",
    image: "/rank/platinum 3.svg"
  },
  {
    id: "diamond",
    name: "DIAMOND",
    color: "text-[#B983FF]",
    bgGradient: "from-[#B983FF]/30 to-transparent",
    price: "Rp 25k",
    image: "/rank/diamond 3.svg"
  },
  {
    id: "ascendant",
    name: "ASCENDANT",
    color: "text-[#2EE59D]",
    bgGradient: "from-[#2EE59D]/30 to-transparent",
    price: "Rp 25k",
    image: "/rank/ascendant 3.svg"
  },
  {
    id: "immortal",
    name: "IMMORTAL",
    color: "text-[#FF4D6D]",
    bgGradient: "from-[#FF4D6D]/30 to-transparent",
    price: "Rp 25k",
    image: "/rank/immortal 3.svg"
  },
  {
    id: "radiant",
    name: "RADIANT",
    color: "text-[#FFD700]",
    bgGradient: "from-[#FFD700]/30 to-transparent",
    price: "Rp 25k",
    image: "/rank/radiant.svg"
  }
];

type FilterType = "LR-TIER" | "TIER" | "RANK";

export default function DiscoverSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("LR-TIER");

  return (
    <section className="w-full relative z-10 -mt-8 mb-12">
      <div className="w-full max-w-[1920px] mx-auto xl:px-12">
        <div className="sm:bg-gradient-to-r sm:from-black sm:via-[#5e0000] sm:to-[#C70515] sm:rounded-3xl 2xl:p-8 sm:p-8 md:p-8 relative overflow-hidden sm:bg-clip-padding sm:border sm:border-transparent sm:ring-1 sm:ring-white/10 sm:shadow-2xl">
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
            <div
              className="
                                flex gap-4 overflow-x-auto pb-2
                                snap-x snap-mandatory
                                xl:grid xl:grid-cols-5
                                xl:overflow-visible
                            "
            >
              {lrtiers.map((lrtiers) => (
                <div
                  key={lrtiers.id}
                  className="
                                        group relative bg-[#111] rounded-2xl border border-[#787878]
                                        p-5 h-[220px] flex flex-col justify-between overflow-hidden
                                        min-w-[48%] sm:min-w-[260px] xl:min-w-0 snap-start
                                    "
                >
                  {/* Available Badge */}
                  <span className="absolute top-4 left-4 bg-[#4ade80] text-black text-[10px] font-bold px-2 py-1 rounded">
                    Available
                  </span>

                  {/* Main Content */}
                  <div className="flex items-baseline justify-center sm:mt-4  mt-6 relative z-10">
                    <span className="2xl:text-6xl sm:text-6xl text-2xl font-black italic text-white mr-2 tracking-tighter font-antonio">
                      LR
                    </span>
                    <span
                      className={cn(
                        "text-5xl 2xl:text-8xl sm:text-8xl font-black italic tracking-tighter leading-none transform translate-y-2 font-antonio",
                        lrtiers.color
                      )}
                    >
                      {lrtiers.rankLetter}
                    </span>
                  </div>

                  {/* Background Glow */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t opacity-10 group-hover:opacity-20 transition-opacity",
                      lrtiers.bgGradient
                    )}
                  />

                  {/* Footer */}
                  <div className="flex items-end justify-between mt-auto relative z-10">
                    <div className="flex flex-col">
                      <span className="text-white/50 text-[10px] font-medium border-none underline-offset-auto">
                        Starts From
                      </span>
                      <span className="text-white font-bold text-sm sm:text-lg leading-tight">
                        {lrtiers.price}
                      </span>
                    </div>

                    <Link
                      href="#" // Assuming search implementation
                      className="bg-[#2f54eb] hover:bg-[#1d39c4] text-white text-[10px] font-bold px-4 py-2 rounded-lg transition-colors"
                    >
                      See More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeFilter === "TIER" && (
            <div
              className="
                                flex gap-4 overflow-x-auto pb-2
                                snap-x snap-mandatory
                                xl:grid xl:grid-cols-5
                                xl:overflow-visible
                            "
            >
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="
                                        group relative bg-[#111] rounded-2xl border border-[#787878]
                                        p-5 h-[220px] flex flex-col justify-between overflow-hidden
                                        min-w-[48%] sm:min-w-[260px] xl:min-w-0 snap-start
                                    "
                >
                  {/* Available Badge */}
                  <span className="absolute top-4 left-4 bg-[#4ade80] text-black text-[10px] font-bold px-2 py-1 rounded">
                    Available
                  </span>

                  {/* Main Content */}
                  <div className="flex items-baseline justify-center sm:mt-4  mt-6 relative z-10">
                    <span
                      className={cn(
                        "text-5xl 2xl:text-8xl sm:text-8xl font-black italic tracking-tighter leading-none transform translate-y-2 font-antonio",
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

                    <Link
                      href="#" // Assuming search implementation
                      className="bg-[#2f54eb] hover:bg-[#1d39c4] text-white text-[10px] font-bold px-4 py-2 rounded-lg transition-colors"
                    >
                      See More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeFilter === "RANK" && (
            <div
              className="
                                flex gap-4 overflow-x-auto pb-2
                                snap-x snap-mandatory
                            "
            >
              {ranks.map((rank) => (
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
                  <span className="absolute top-10 left-4 z-20 bg-[#4ade80] text-black text-[10px] font-bold px-3 py-1 rounded">
                    Available
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

                    <Link
                      href="#"
                      className="bg-[#2f54eb] hover:bg-[#1d39c4] text-white text-[11px] font-bold px-4 py-2 rounded-lg transition-all"
                    >
                      See More
                    </Link>
                  </div>

                  {/* Subtle border glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
