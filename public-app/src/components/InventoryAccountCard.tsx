"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import { AccountEntity } from "@/types/account.type";

import { cn, getRankImageUrl } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";

import CountdownTimer from "./CountdownTimer";
import { staatliches } from "@/lib/fonts";

export type InventoryAccountCardProps = {
  item: AccountEntity;
  linkClassName?: string;
  compact?: boolean;
};

export default function InventoryAccountCard({
  item,
  linkClassName,
  compact = false
}: InventoryAccountCardProps) {
  const inUse = item.availabilityStatus === "IN_USE";

  return (
    <Link
      href={`/accounts/${item.accountCode}`}
      className={cn(
        "block w-full min-w-0 max-w-[600px] cursor-pointer font-instrumentSans transition-all duration-300",
        "mx-auto",
        compact
          ? "h-auto max-h-[450px] aspect-[4/3] overflow-hidden"
          : "h-full",
        !inUse && "hover:scale-[1.02]",
        linkClassName
      )}
    >
      {/* CARD FRAME */}
      <div className="h-full rounded-sm p-[1px] bg-gradient-to-b from-white/40 via-black to-white/40">
        <div
          className={cn(
            "relative rounded-sm overflow-hidden bg-black flex flex-col",
            compact ? "h-full min-h-0" : "h-full min-h-0 justify-between"
          )}
        >
          {inUse && (
            <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
          )}

          {/* HEADER */}
          <div
            className={cn(
              "flex shrink-0 items-center justify-between gap-5 tablet:gap-4",
              compact ? "px-2 py-1.5" : "px-2 tablet:px-2 pt-4 desktop:px-4"
            )}
          >
            <div
              className={cn(
                "flex items-center",
                compact ? "gap-1" : "gap-1 tablet:gap-1 desktop:gap-2"
              )}
            >
              <Image
                src={getRankImageUrl(item.accountRank)}
                width={0}
                height={0}
                sizes="100vw"
                className={cn(
                  compact ? "h-5 w-5" : "w-6 h-6 tablet:w-7 tablet:h-7 desktop:w-[50px] desktop:h-[50px]"
                )}
                alt="Rank"
              />
              <div className={cn(
                "flex flex-col gap-0",
                staatliches.className
              )}>
                <p
                  className={cn(
                    "text-white whitespace-nowrap",
                    compact
                      ? "text-sm leading-tight"
                      : "text-[10px] tablet:text-xs desktop:text-3xl"
                  )}
                >
                  {item.accountRank} | {item.accountCode}
                </p>
              </div>
            </div>

            <div
              className={cn(
                "flex cursor-pointer items-center justify-center gap-0.5 text-blue-400 hover:text-blue-300 pl-4 max-w-[70px] tablet:max-w-[90px] desktop:max-w-full",
                compact ? "text-[0.5rem]" : "text-[0.4rem] tablet:text-xs"
              )}
            >
              {item.isCompetitive ? <img src="/cardneed/compe.svg"></img> : <img src="/cardneed/unrated.svg"></img>}
            </div>
          </div>

          {/* IMAGE */}
          {compact ? (
            <div className="relative min-h-0 w-full flex-1">
              {/*
                fill + absolute inset-0 ignores parent padding; inset the image
                with a dedicated layer so horizontal gap matches default card (px-2).
              */}
              <div className="absolute inset-y-0 left-2 right-2">
                <Image
                  src={
                    item.thumbnail?.imageUrl ?? "/defaultPicture/default.jpg"
                  }
                  fill
                  alt="Thumbnail"
                  className="rounded-sm object-cover"
                  unoptimized
                  sizes="(max-width: 600px) 100vw, 600px"
                />
              </div>

              {inUse && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                  <div className="w-[85%] max-w-[320px] rounded-2xl border border-white/20 bg-[#0B0B0B] px-6 py-5 text-white shadow-xl">

                    {/* TOP: ON RENT */}
                    <div className={cn(
                      "flex items-center gap-3",
                      staatliches.className
                    )}>
                      <div className="relative flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-red-600 animate-pulse" />
                        <div className="absolute w-8 h-8 rounded-full bg-red-600/30 blur-md" />
                      </div>
                      <h2 className="text-xl">ON RENT</h2>
                    </div>

                    {/* Divider */}
                    <div className="my-4 h-[1px] w-full bg-white/20" />

                    {/* Available in */}
                    <p className="text-center text-xs text-gray-400 mb-2">
                      AVAILABLE IN:
                    </p>

                    {/* Countdown */}
                    <div className="flex items-center justify-center gap-2 text-lg font-semibold">
                      <svg
                        className="w-5 h-5 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      {item.currentExpireAt && (
                        <CountdownTimer targetDate={String(item.currentExpireAt)} />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex w-full justify-center px-2 pt-4 desktop:px-4">
              <div className="relative w-full">
                <div className="tablet:hidden">
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src={
                        item.thumbnail?.imageUrl ??
                        "/defaultPicture/default.jpg"
                      }
                      fill
                      alt="Thumbnail"
                      className="rounded-sm object-cover"
                      unoptimized
                    />
                  </AspectRatio>
                </div>
                <div className="hidden tablet:block">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={
                        item.thumbnail?.imageUrl ??
                        "/defaultPicture/default.jpg"
                      }
                      fill
                      alt="Thumbnail"
                      className="rounded-sm object-cover"
                      unoptimized
                    />
                  </AspectRatio>
                </div>
                {inUse && (
                  <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="w-[85%] max-w-[320px] rounded-2xl border border-white/20 bg-[#0B0B0B] tablet:px-6 px-3 py-5 text-white shadow-xl">

                      {/* TOP: ON RENT */}
                      <div className={cn(
                        "flex items-center justify-center gap-2 desktop:gap-3 desktop:text-5xl tablet:text-2xl text-xl",
                        staatliches.className
                      )}>
                        <div className="relative flex items-center justify-center">
                          <div className="desktop:w-5 desktop:h-5 tablet:w-4 tablet:h-4 w-3 h-3 rounded-full bg-red-600 animate-pulse" />
                          <div className="absolute desktop:w-8 desktop:h-8 tablet:w-6 tablet:h-6 w-4 h-4 rounded-full bg-red-600/30 blur-md" />
                        </div>
                        <h2 className="">ON RENT</h2>
                      </div>

                      {/* Divider */}
                      <div className="desktop:my-4 my-2 h-[1px] w-full bg-white/20" />

                      {/* Available in */}
                      <p className="text-center text-xs text-gray-400 desktop:mb-2 mb-1">
                        AVAILABLE IN:
                      </p>

                      {/* Countdown */}
                      <div className="flex items-center justify-center gap-1 desktop:gap-1 text-xs tablet:text-sm desktop:text-lg font-semibold">
                        <Image src="/cardneed/time.svg" alt="time" width={20} height={20} className="pt-1" />

                        {item.currentExpireAt && (
                          <CountdownTimer targetDate={String(item.currentExpireAt)} />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FOOTER */}
          <div
            className={cn(
              "shrink-0",
              compact ? "px-2 py-1" : "px-2 py-1 desktop:px-4 tablet:py-4 flex justify-end"
            )}
          >
            <div
              className={cn(
                "inline-flex items-center justify-center text-white",
                compact
                  ? "rounded px-2 py-0.5 text-[0.5rem]"
                  : "rounded-sm px-3 py-1 text-[0.4rem] tablet:text-xs"
              )}
            >
              <span>Skins Amount</span>
              <span className="ml-0.5">|</span>
              <span className="ml-0.5">{item.skinList.length}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
