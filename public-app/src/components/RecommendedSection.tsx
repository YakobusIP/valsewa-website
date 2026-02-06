"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";

import { fetchRecommendedAccounts } from "@/services/accountService";

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";

import { AccountEntity } from "@/types/account.type";

import { cn, convertHoursToDays, getRankImageUrl } from "@/lib/utils";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaFire } from "react-icons/fa";

type RecSectionProps = {
  onSeeMore: () => void;
};

export default function RecommendedSection({ onSeeMore }: RecSectionProps) {
  const [accounts, setAccounts] = useState<AccountEntity[]>([]);
  const [loading, setLoading] = useState(true);

  const recAutoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  ).current;

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchRecommendedAccounts();
        setAccounts(data.slice(0, 3)); // Ensure we only take top 3
      } catch (error) {
        console.error("Failed to load recommended accounts", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return null; // Or a skeleton loader
  if (accounts.length === 0) return null;

  const renderAccountCard = (account: AccountEntity, forCarousel = false) => {
    const tierCode = account.priceTier?.code || "N/A";
    const letterGrade = tierCode.split("-")[0] || "B";

    let glowColor = "from-gray-500/20";
    let borderColor = "border-gray-600";

    if (letterGrade.includes("SSS")) {
      glowColor = "from-[#9146FF]/30";
      borderColor = "border-[#9146FF]";
    } else if (letterGrade.includes("S")) {
      glowColor = "from-[#3B5BDB]/30";
      borderColor = "border-[#3B5BDB]";
    } else if (letterGrade.includes("A")) {
      glowColor = "from-[#BD2C2C]/30";
      borderColor = "border-[#BD2C2C]";
    } else if (letterGrade.includes("B")) {
      glowColor = "from-[#C69C6D]/30";
      borderColor = "border-[#C69C6D]";
    } else if (letterGrade.includes("V")) {
      glowColor = "from-[#3CCFCF]/30";
      borderColor = "border-[#3CCFCF]";
    }

    return (
      <Link href={`/details/${account.id}`} className="cursor-pointer">
        <div
          className={cn(
            "group relative rounded-xl overflow-auto lg:overflow-hidden border transition-all duration-300 hover:scale-[1.02]",
            "border-white/10 hover:border-white/30 bg-[#111] border-[#E8C545]",
            "aspect-square",
            forCarousel && "min-w-[320px]"
          )}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={account.thumbnail?.imageUrl ?? "/defaultPicture/default.jpg"}
              fill
              alt="Thumbnail"
              className="object-cover rounded-xl"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            <span className="bg-[#4ade80] text-black text-[10px] sm:text-xs font-bold px-3 py-1 rounded shadow-lg">
              Most Rented
            </span>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
            {/* Rank Name */}
            <div className="flex items-center gap-2 mb-1">
              <Image
                src={getRankImageUrl(account.accountRank)}
                alt={account.accountRank}
                width={24}
                height={24}
                className="object-contain"
              />
              <span className="text-white font-bold text-xs sm:text-sm tracking-wide uppercase">
                {account.accountRank} | {account.accountCode}
              </span>
            </div>

            {/* Big Letter Grade & Stats */}
            <div className="flex items-end mt-2 gap-8">
              <span className="text-5xl md:text-7xl font-black italic leading-none tracking-tighter text-white font-antonio">
                {letterGrade}
              </span>

              <div className="flex flex-col gap-2 mb-1 font-instrumentSans">
                <span className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1">
                  <span className="text-white/70 text-[10px]">
                    Skins Amount
                  </span>
                  <span className="text-white/70 text-[10px]">
                    | {account.skinList?.length || 0}
                  </span>
                </span>
                <span className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1">
                  <span className="text-white/70 text-[10px]">Rent Count</span>
                  <span className="text-white/70 text-[10px]">
                    | {convertHoursToDays(account.totalRentHour)}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Glow Effect */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t opacity-30 pointer-events-none",
              glowColor
            )}
          />

          <div
            className={cn(
              "absolute inset-0 border-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
              borderColor
            )}
          />
        </div>
      </Link>
    );
  };

  const renderDiscoverMore = (forCarousel = false) => (
    <div
      className={cn("aspect-square", forCarousel ? "min-w-[320px]" : "w-full")}
    >
      <button
        onClick={onSeeMore}
        className="group relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#770000] to-black border border-white/10 flex flex-col items-center justify-center text-left transition-all duration-300 hover:scale-[1.02]"
      >
        <div className="relative z-10 p-6">
          <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
            Discover
            <br />
            More
          </h3>
          <div className="mt-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto group-hover:bg-white/20 transition-colors">
            <FaArrowRight className="text-white text-xl group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        {/* Red Glow */}
        <div className="absolute inset-0 bg-red-600/20 blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
      </button>
    </div>
  );

  return (
    <section className="w-full relative z-10 my-8 xl:my-16">
      <div className="w-full max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-3xl md:text-5xl font-antonio font-black text-white tracking-tighter uppercase relative">
              Trending Now
              <span className="inline-block ml-3 text-[#C70515] animate-pulse">
                <FaFire />
              </span>
            </h2>
          </div>
          <p className="text-white/70 text-xs md:text-lg">
            Most rented accounts this week
          </p>
        </div>

        {/* Mobile: Auto-sliding Carousel */}
        <Carousel
          className="xl:hidden"
          opts={{ loop: true, align: "start" }}
          plugins={[recAutoplay]}
        >
          <CarouselContent className="-ml-4">
            {accounts.map((account) => (
              <CarouselItem key={account.id} className="basis-auto pl-4">
                {renderAccountCard(account, true)}
              </CarouselItem>
            ))}
            <CarouselItem className="basis-auto pl-4">
              {renderDiscoverMore(true)}
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        {/* Desktop: Grid */}
        <div className="hidden xl:grid xl:grid-cols-4 gap-4">
          {accounts.map((account) => (
            <Fragment key={account.id}>
              {renderAccountCard(account, false)}
            </Fragment>
          ))}
          {renderDiscoverMore(false)}
        </div>
      </div>
    </section>
  );
}
