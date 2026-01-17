"use client";

import { useRef } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import { AccountEntity } from "@/types/account.type";

import Image from "next/image";
import Link from "next/link";

import CountdownTimer from "./CountdownTimer";

interface CardProps {
  data?: AccountEntity[];
  gridRef?: React.RefObject<HTMLDivElement | null>
}

const Card: React.FC<CardProps> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);

  const processCardData = (items?: AccountEntity[]) => {
    return items?.map((item) => ({
      ...item,
      otherImages:
        item.thumbnail && item.otherImages
          ? [{ ...item.thumbnail, isThumbnail: true }, ...item.otherImages]
          : item.otherImages
    }));
  };

  const processedData = processCardData(data);

  function getRankImage(rank: string): string {
    if (!rank) return "/rank/unranked.webp";
    const baseRank = rank.trim().split(" ")[0].toLowerCase();
    if (baseRank === "unrated") return "/rank/unranked.webp";
    const normalizedRank = baseRank.charAt(0).toUpperCase() + baseRank.slice(1);
    return `/rank/${normalizedRank} 3.svg`;
  }

  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-[1920px] xl:px-12">
        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-3xl md:text-5xl font-antonio font-black text-white tracking-tighter uppercase relative">
              FULL INVENTORY
            </h2>
          </div>
          <p className="text-white/70 text-xs md:text-lg">
            Explore 100+ Premium Accounts today!
          </p>
        </div>
        <div
          ref={ref}
          className="
              grid grid-cols-12 
              gap-x-3 gap-y-4
              sm:gap-x-6 sm:gap-y-6
              lg:gap-x-8 lg:gap-y-10
              justify-items-center
              font-instrumentSans
            "
        >
          {processedData?.map((item) => {
            const inUse = item.availabilityStatus === "IN_USE";

            return (
              <Link
                key={item.id}
                href={`/details/${item.id}`}
                className={`
                col-span-6 sm:col-span-6 lg:col-span-4 xl:col-span-4
                w-full h-full cursor-pointer
                transition-all duration-300
                ${inUse ? "" : "hover:scale-[1.02]"}
              `}
              >
                {/* CARD FRAME */}
                <div className="rounded-sm h-full p-[1px] bg-gradient-to-b from-white/40 via-black to-white/40">
                  <div className="relative h-full rounded-sm overflow-hidden bg-gradient-to-b from-black to-[#7A0610] flex flex-col justify-between">
                    {inUse && (
                      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
                    )}

                    {/* HEADER */}
                    <div className="flex items-center justify-between px-2 sm:px-4 pt-4">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Image
                          src={getRankImage(item.accountRank)}
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-7 h-7 sm:w-[42px] sm:h-[42px]"
                          alt="Rank"
                        />
                        <div className="flex flex-col gap-0">
                          <p className="text-white font-semibold text-[0.4rem] sm:text-sm">
                            {item.accountRank} | {item.accountCode}
                          </p>
                          <span className="flex items-top justify-top">
                            <span
                              className="inline-flex items-center justify-center text-center
                              text-[0.4rem] sm:text-xs font-bold text-white bg-red-600
                              sm:h-5 h-auto py-0.1 rounded pl-1 pr-1 sm:pl-2 sm:pr-2"
                            >
                              {item.priceTier.code}
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-1 text-blue-400 text-[0.4rem] sm:text-xs cursor-pointer hover:text-blue-300">
                        Account Info
                        <span className="flex items-center justify-center w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-400 text-black text-[0.4rem] sm:text-[10px] font-bold no-underline">
                          ?
                        </span>
                      </div>
                    </div>

                    {/* IMAGE */}
                    <div className="relative px-2 sm:px-4 pt-4">
                      <div className="sm:hidden">
                        <AspectRatio ratio={1 / 1}>
                          <Image
                            src={
                              item.thumbnail?.imageUrl ??
                              "/defaultPicture/default.jpg"
                            }
                            fill
                            alt="Thumbnail"
                            className="object-cover rounded-sm"
                            unoptimized
                          />
                        </AspectRatio>
                      </div>
                      <div className="hidden sm:block">
                        <AspectRatio ratio={16 / 9}>
                          <Image
                            src={
                              item.thumbnail?.imageUrl ??
                              "/defaultPicture/default.jpg"
                            }
                            fill
                            alt="Thumbnail"
                            className="object-cover rounded-sm"
                            unoptimized
                          />
                        </AspectRatio>
                      </div>

                      {/* AVAILABLE BADGE */}
                      {!inUse && (
                        <div
                          className="absolute sm:top-6 sm:left-6 top-5 left-4
                            bg-gradient-to-r from-[#4FDF6D] to-[#BBFD7B] text-black
                            text-[0.4rem] sm:text-xs px-3 py-1 rounded-sm"
                        >
                          Available
                        </div>
                      )}

                      {/* IN USE OVERLAY */}
                      {inUse && (
                        <div
                          className="absolute sm:top-6 sm:left-6 top-5 left-4 flex items-center justify-center z-20
                            bg-black/70 rounded-sm"
                        >
                          <div
                            className="bg-white text-black
                              sm:px-3 sm:py-1 px-2 py-1 rounded-sm text-[0.4rem] sm:text-xs lg:text-sm"
                          >
                            Time Left{" "}
                            {item.currentExpireAt && (
                              <CountdownTimer
                                targetDate={new Date(
                                  item.currentExpireAt
                                ).toISOString()}
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* FOOTER */}
                    <div className="px-2 sm:px-4 sm:py-4 py-1">
                      <div
                        className="inline-flex items-center
                          bg-white/10 text-white
                          text-[0.4rem] sm:text-xs px-3 py-1 rounded-sm"
                      >
                        Skins Amount |{" "}
                        <span className="ml-1">{item.skinList.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Card;
