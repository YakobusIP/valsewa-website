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
    <div>
      <h1
        className={`text-2xl font-semibold mb-4 leading-[1.2] ${staatliches.className}`}
      >
        PURCHASE DETAILS
      </h1>

      <div className="flex gap-6">
        <div className="w-full overflow-hidden rounded-md max-w-80 max-h-48">
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
          <div className="grid grid-cols-[auto_1fr_auto] grid-rows-2 gap-x-4 gap-y-1 items-center">
            <div className="row-span-2">
              <Image
                src={rankImageUrl}
                alt={`${booking.account.accountRank} rank badge`}
                width={50}
                height={50}
                className="object-contain"
                priority
              />
            </div>

            <h2 className="text-xl text-white tracking-wide leading-tight">
              <span className="font-semibold uppercase">
                {booking.account.accountRank}
              </span>
              <span className="text-neutral-400"> | </span>
              <span>{booking.account.accountCode}</span>
            </h2>

            <div className="flex items-center justify-end">
              <button
                type="button"
                className="flex items-center gap-1 text-[#2F40FF] text-sm underline cursor-pointer font-semibold hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-[#2F40FF] focus:ring-offset-2 focus:ring-offset-black rounded"
                aria-label="View account information"
              >
                Account Info
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#2F40FF] text-black text-[10px] font-bold no-underline">
                  ?
                </span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`bg-[#2F40FF] text-white px-2 py-1 text-sm rounded-sm font-semibold ${instrumentSans.className}`}
              >
                {booking.account.priceTierCode}
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-1 font-semibold text-gray-300">
            <div className="flex justify-between">
              <p>Duration</p>
              <p>{formattedDuration}</p>
            </div>

            <div className="flex justify-between">
              <p>IDR {booking.mainValuePerUnit.toLocaleString()}</p>
              <p>× {booking.quantity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(BookingDetail);
