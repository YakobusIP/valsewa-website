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
import { FaFire } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

type RecSectionProps = {
  onSeeMore: () => void;
};

/** Trending card order: grey, red, blue — bottom-heavy gradient like design */
const CARD_OVERLAY_HEX = ["#787878", "#C70515", "#2F40FF"] as const;

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

  const renderAccountCard = (
    account: AccountEntity,
    cardIndex: number,
    forCarousel = false
  ) => {
    const tierCode = account.priceTier?.code || "N/A";
    const letterGrade = tierCode.split("-")[0] || "B";
    const overlayHex = CARD_OVERLAY_HEX[cardIndex] ?? CARD_OVERLAY_HEX[0];

    const borderColor =
      cardIndex === 0
        ? "border-[#787878]"
        : cardIndex === 1
          ? "border-[#C70515]"
          : "border-[#2F40FF]";

    const statPillBg =
      cardIndex === 0
        ? "bg-[#787878]/35"
        : cardIndex === 1
          ? "bg-[#C70515]/35"
          : "bg-[#2F40FF]/35";

    return (
      <Link
        href={`/accounts/${account.accountCode}`}
        target="_blank"
        className="block cursor-pointer"
      >
        <div
          className={cn(
            "relative aspect-[7/8] overflow-visible",
            forCarousel && "min-w-[270px]"
          )}
        >
          <div
            className={cn(
              "group absolute inset-0 z-0 origin-center rounded-xl transition-transform duration-300 will-change-transform hover:z-10 hover:scale-[1.02]"
            )}
          >
            {/* Background Image — clip image only; scale lives on parent so no overflow:auto scrollbars */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
              <Image
                src={
                  account.thumbnail?.imageUrl ?? "/defaultPicture/default.jpg"
                }
                fill
                alt="Thumbnail"
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.1]"
                unoptimized
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(to top, ${overlayHex} 0%, color-mix(in srgb, ${overlayHex} 55%, transparent) 42%, transparent 72%)`
                }}
              />
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
              <div className="flex items-center gap-2 mb-1 min-w-0">
                <Image
                  src={getRankImageUrl(account.accountRank)}
                  alt={account.accountRank}
                  width={24}
                  height={24}
                  className="object-contain shrink-0"
                />
                <span className="text-white font-bold text-xs sm:text-sm tracking-wide uppercase truncate">
                  {account.accountRank} | {account.accountCode}
                </span>
              </div>

              {/* Big Letter Grade & Stats */}
              <div className="flex items-end mt-2 gap-8 min-w-0">
                <span className="text-7xl font-black italic leading-none tracking-tighter text-white font-antonio shrink-0">
                  {letterGrade}
                </span>

                <div className="flex flex-col gap-2 mb-1 font-instrumentSans min-w-0">
                  <span
                    className={cn(
                      "backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1 min-w-0",
                      statPillBg
                    )}
                  >
                    <span className="text-white/70 text-[10px] shrink-0">
                      Skins Amount
                    </span>
                    <span className="text-white/70 text-[10px] truncate">
                      | {account.skinList?.length || 0}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1 min-w-0",
                      statPillBg
                    )}
                  >
                    <span className="text-white/70 text-[10px] shrink-0">
                      Rent Count
                    </span>
                    <span className="text-white/70 text-[10px] truncate">
                      | {convertHoursToDays(account.totalRentHour)}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div
              className={cn(
                "absolute inset-0 border-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
                borderColor
              )}
            />
          </div>
        </div>
      </Link>
    );
  };

  const renderDiscoverMore = (forCarousel = false) => (
    <div
      className={cn(
        "relative aspect-[7/8] overflow-visible",
        forCarousel ? "min-w-[270px]" : "w-full"
      )}
    >
      <Link
        href="/search"
        onClick={onSeeMore}
        target="_blank"
        className="block h-full"
      >
        <div className="group absolute inset-0 z-0 origin-center transition-transform duration-300 will-change-transform hover:z-10 hover:scale-[1.02]">
          <div className="relative h-full w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#C70515] to-[#000000] border border-white/10 flex flex-col items-start justify-center text-left">
            <div className="relative z-10 p-6 flex flex-row justify-between items-center w-full">
              <h3 className="text-4xl font-bold text-white mb-2 leading-tight">
                Discover
                <br />
                More
              </h3>
              <div className="mt-4 w-12 h-12 flex items-center justify-center">
                <FaArrowRight className="text-white text-5xl tablet:text-5xl desktop:text-5xl transition-transform group-hover:translate-x-2 group-hover:rotate-45" />
              </div>
            </div>
            {/* Red Glow */}
            {/* <div className="absolute inset-0 bg-red-600/20 blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" /> */}
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <section className="w-full relative z-10 my-8 xl:my-16">
      <div className="w-full max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="flex flex-col mb-4">
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
          className="xl:hidden py-2"
          opts={{ loop: true, align: "start" }}
          plugins={[recAutoplay]}
        >
          <CarouselContent className="-ml-4">
            {accounts.map((account, index) => (
              <CarouselItem key={account.id} className="basis-auto pl-4">
                {renderAccountCard(account, index, true)}
              </CarouselItem>
            ))}
            <CarouselItem className="basis-auto pl-4">
              {renderDiscoverMore(true)}
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        {/* Desktop: Grid */}
        <div className="hidden xl:grid xl:grid-cols-4 gap-4 py-2">
          {accounts.map((account, index) => (
            <Fragment key={account.id}>
              {renderAccountCard(account, index, false)}
            </Fragment>
          ))}
          {renderDiscoverMore(false)}
        </div>
      </div>
    </section>
  );
}
