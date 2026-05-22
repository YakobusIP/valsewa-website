"use client"
import { memo, useMemo } from "react";

import { BookingWithAccountEntity } from "@/types/booking.type";

import { instrumentSans, staatliches } from "@/lib/fonts";
import { getRankImageUrl } from "@/lib/utils";

import Image from "next/image";

type BookingDetailProps = {
  booking: BookingWithAccountEntity;
};

function BookingDetail({ booking }: BookingDetailProps) {
  const formatDuration = useMemo(() => {
    return (duration: string): string => {
      return duration.replace(/d/g, " Day(s)").replace(/h/g, " Hour(s)");
    };
  }, []);

  const formattedDuration = useMemo(
    () => formatDuration(booking.duration),
    [booking.duration, formatDuration]
  );

  const rankImageUrl = useMemo(
    () => getRankImageUrl(booking.account.accountRank),
    [booking.account.accountRank]
  );

  return (
    <div className="p-[20px] flex flex-col">
      <h1
        className={`text-xl sm:text-3xl font-semibold mb-4 leading-[1.2] ${staatliches.className}`}
      >
        PURCHASE DETAILS
      </h1>

      <div className="flex flex-row gap-2 sm:gap-6">
        <div className="w-1/2 overflow-hidden rounded-md max-w-30 sm:max-w-80 max-h-30">
          <Image
            src={booking.account.thumbnailImageUrl}
            alt={`${booking.account.accountRank} ${booking.account.accountCode} account thumbnail`}
            width={384}
            height={216}
            className="object-cover w-full h-auto"
            priority
          />
        </div>

        <div className="flex flex-col flex-1">
          <div className="grid grid-cols-[auto_1fr] gap-x-1 sm:gap-x-4 gap-y-1 items-center">
            <div className="row-span-2">
              <Image
                src={rankImageUrl}
                alt={`${booking.account.accountRank} rank badge`}
                width={50}
                height={50}
                className="object-contain min-w-8 min-h-8 sm:min-w-10 sm:min-h-10 md:min-w-[50px] md:min-h-[50px]"
                priority
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <h2 className="text-base sm:text-lg md:text-xl text-white tracking-wide leading-tight break-words">
                <span className="font-semibold uppercase">
                  {booking.account.accountRank}
                </span>
                <span className="text-neutral-400"> | </span>
                <span>{booking.account.accountCode}</span>
              </h2>

              <div className="flex items-center gap-3">
                <div
                  className={`bg-[#F1F1F1] text-[#616161] px-2 py-1 text-xs sm:text-sm rounded-sm font-semibold ${instrumentSans.className}`}
                >
                  {booking.account.priceTierCode}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:pt-6 pt-4">
        <div className="mt-auto space-y-6 text-sm sm:text-base text-gray-300">
          <div className="flex justify-between">
            <p className="font-semibold">Duration</p>
            <p className="break-words">{formattedDuration}</p>
          </div>
          <div className="flex justify-between flex-wrap">
            <p className="font-semibold break-words">
              IDR {booking.mainValuePerUnit.toLocaleString()}
            </p>
            <p>× {booking.quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(BookingDetail);
