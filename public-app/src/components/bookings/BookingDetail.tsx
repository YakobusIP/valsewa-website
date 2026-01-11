import { BookingWithAccountEntity } from "@/types/booking.type";

import { Instrument_Sans, Staatliches } from "next/font/google";
import Image from "next/image";

const staatliches = Staatliches({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap"
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

type BookingDetailProps = {
  booking: BookingWithAccountEntity;
};

export default function BookingDetail({ booking }: BookingDetailProps) {
  function formatDuration(duration: string): string {
    return duration.replace(/d/g, " Day(s)").replace(/h/g, " Hour(s)");
  }

  function getRankImageUrl(rank: string): string {
    const r = rank.toLowerCase();

    if (r.includes("iron")) return "/rank/Iron 3.svg";
    if (r.includes("bronze")) return "/rank/Bronze 3.svg";
    if (r.includes("silver")) return "/rank/Silver 3.svg";
    if (r.includes("gold")) return "/rank/Gold 3.svg";
    if (r.includes("platinum")) return "/rank/Platinum 3.svg";
    if (r.includes("diamond")) return "/rank/Diamond 3.svg";
    if (r.includes("ascendant")) return "/rank/Ascendant 3.svg";
    if (r.includes("immortal")) return "/rank/Immortal 3.svg";
    if (r.includes("radiant")) return "/rank/Radiant 3.svg";

    return "/ranks/Unranked.svg";
  }

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
            src={booking.account.thumbnail.imageUrl}
            alt="Account Thumbnail"
            width={384}
            height={216}
            className="object-cover w-full h-auto"
          />
        </div>

        <div className="flex flex-col flex-1">
          <div className="grid grid-cols-[auto_1fr_auto] grid-rows-2 gap-x-4 gap-y-1 items-center">
            <div className="row-span-2">
              <Image
                src={getRankImageUrl(booking.account.accountRank)}
                alt={booking.account.accountRank}
                width={50}
                height={50}
                className="object-contain"
                priority
              />
            </div>

            <h2 className={`text-xl text-white tracking-wide leading-tight`}>
              <span className="font-semibold uppercase">
                {booking.account.accountRank}
              </span>
              <span className="text-neutral-400"> | </span>
              <span>{booking.account.accountCode}</span>
            </h2>

            <div className="flex items-center justify-end">
              <span className="flex items-center gap-1 text-[#2F40FF] text-sm underline cursor-pointer font-semibold hover:text-blue-300">
                Account Info
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#2F40FF] text-black text-[10px] font-bold no-underline">
                  ?
                </span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`bg-[#2F40FF] text-white px-2 py-1 text-sm rounded-sm font-semibold ${instrumentSans.className}`}
              >
                {booking.account.priceTier.code}
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-1 font-semibold text-gray-300">
            {/* Duration row */}
            <div className="flex justify-between">
              <p>Duration</p>
              <p>{formatDuration(booking.duration)}</p>
            </div>

            {/* Price × quantity row */}
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
