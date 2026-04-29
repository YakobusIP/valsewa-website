"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import { AccountEntity } from "@/types/account.type";

import { cn, getRankImageUrl } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";

import CountdownTimer from "./CountdownTimer";

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
      href={`/details/${item.id}`}
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
            "relative rounded-sm overflow-hidden bg-gradient-to-b from-black to-[#7A0610] flex flex-col",
            compact ? "h-full min-h-0" : "h-full min-h-0 justify-between"
          )}
        >
          {inUse && (
            <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
          )}

          {/* HEADER */}
          <div
            className={cn(
              "flex shrink-0 items-center justify-between",
              compact ? "px-2 py-1.5" : "px-2 sm:px-4 pt-4"
            )}
          >
            <div
              className={cn(
                "flex items-center",
                compact ? "gap-1" : "gap-1 sm:gap-2"
              )}
            >
              <Image
                src={getRankImageUrl(item.accountRank)}
                width={0}
                height={0}
                sizes="100vw"
                className={cn(
                  compact ? "h-5 w-5" : "w-7 h-7 sm:w-[42px] sm:h-[42px]"
                )}
                alt="Rank"
              />
              <div className="flex flex-col gap-0">
                <p
                  className={cn(
                    "font-semibold text-white",
                    compact
                      ? "text-[0.5rem] leading-tight"
                      : "text-[0.4rem] sm:text-sm"
                  )}
                >
                  {item.accountRank} | {item.accountCode}
                </p>
                <span className="flex items-top justify-top">
                  <span
                    className={cn(
                      "inline-flex items-center justify-center text-center font-bold text-white",
                      "bg-red-600 rounded pl-1 pr-1",
                      compact
                        ? "py-0.5 text-[0.5rem] leading-tight"
                        : "h-auto py-0.1 text-[0.4rem] sm:h-5 sm:px-2 sm:text-xs"
                    )}
                  >
                    {item.isCompetitive
                      ? `COMPE-${item.priceTier.code}`
                      : item.priceTier.code}
                  </span>
                </span>
              </div>
            </div>

            <div
              className={cn(
                "flex cursor-pointer items-center justify-center gap-0.5 text-blue-400 hover:text-blue-300",
                compact ? "text-[0.5rem]" : "text-[0.4rem] sm:text-xs"
              )}
            >
              Account Info
              <span
                className={cn(
                  "inline-flex items-center justify-center rounded-full bg-blue-400 text-black font-bold",
                  compact
                    ? "h-3.5 w-3.5 text-[0.45rem]"
                    : "h-2 w-2 sm:h-3 sm:w-3"
                )}
              >
                ?
              </span>
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
              {!inUse && (
                <div className="absolute left-2 top-1 z-20 rounded-sm bg-gradient-to-r from-[#4FDF6D] to-[#BBFD7B] px-1.5 py-0.5 text-[0.5rem] font-medium text-black">
                  Available
                </div>
              )}
              {inUse && (
                <div className="absolute left-2 top-1 z-20 flex items-center justify-center rounded-sm bg-black/70">
                  <div className="rounded-sm bg-white px-1.5 py-0.5 text-[0.5rem] text-black">
                    Time Left{" "}
                    {item.currentExpireAt && (
                      <CountdownTimer
                        targetDate={String(item.currentExpireAt)}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex w-full justify-center px-2 pt-4 sm:px-4">
              <div className="relative w-full">
                <div className="sm:hidden">
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
                <div className="hidden sm:block">
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

                {!inUse && (
                  <div
                    className="absolute top-5 left-4 bg-gradient-to-r from-[#4FDF6D] to-[#BBFD7B] px-3 py-1 text-[0.4rem] text-black
                              sm:top-6 sm:left-6 sm:text-xs"
                  >
                    Available
                  </div>
                )}

                {inUse && (
                  <div
                    className="absolute top-5 left-4 z-20 flex items-center justify-center
                              rounded-sm bg-black/70 sm:top-6 sm:left-6"
                  >
                    <div
                      className="rounded-sm bg-white px-2 py-1 text-[0.4rem] text-black sm:px-3
                                sm:py-1 sm:text-xs lg:text-sm"
                    >
                      Time Left{" "}
                      {item.currentExpireAt && (
                        <CountdownTimer
                          targetDate={String(item.currentExpireAt)}
                        />
                      )}
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
              compact ? "px-2 py-1" : "px-2 py-1 sm:px-4 sm:py-4"
            )}
          >
            <div
              className={cn(
                "inline-flex items-center justify-center bg-white/10 text-white",
                compact
                  ? "rounded px-2 py-0.5 text-[0.5rem]"
                  : "rounded-sm px-3 py-1 text-[0.4rem] sm:text-xs"
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
