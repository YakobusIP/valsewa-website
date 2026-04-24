"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock3, X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AccountEntity } from "@/types/account.type";

type Props = {
  open: boolean;
  onClose: () => void;
  openHour: string;
  closeHour: string;
  accounts: AccountEntity[];
};

export default function OutsideOperationalHoursModal({
  open,
  onClose,
  openHour,
  closeHour,
  accounts,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-4">
      <div className="relative bg-black border border-red-700 rounded-2xl w-full max-w-5xl p-8 text-white">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white"
        >
          <X size={28} />
        </button>

        <div className="flex flex-col items-center text-center mb-8">
          <Clock3 className="w-14 h-14 mb-4" />
          <h2 className="text-4xl font-bold uppercase mb-4">
            Outside Operational Hours
          </h2>

          <p className="text-lg">
            Our operational hour is from <br />
            <span className="font-bold">{openHour} - {closeHour}</span>
          </p>

          <p className="mt-2 text-lg">
            Try again within our operational hour.
          </p>

          <p className="mt-6 font-semibold text-lg">
            Or see our account recommendations that doesn’t require MFA verification:
          </p>
        </div>

        <div className="md:hidden">
          <Carousel opts={{ align: "start" }}>
            <CarouselContent>
              {accounts.map((account) => (
                <CarouselItem key={account.id} className="basis-[80%]">
                  <Link href={`/details/${account.id}`}>
                    <div className="rounded-xl overflow-hidden border border-white/20">
                      <div className="relative aspect-video">
                        <Image
                          src={account.thumbnail?.imageUrl ?? "/defaultPicture/default.jpg"}
                          alt="Recommended"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="hidden md:flex flex-wrap justify-center gap-4 pb-2">
          {accounts.map((account) => (
            <Link
              key={account.id}
              href={`/details/${account.id}`}
              className="min-w-[280px] flex-shrink-0"
            >
              <div className="rounded-xl overflow-hidden border border-white/20">
                <div className="relative aspect-video">
                  <Image
                    src={account.thumbnail?.imageUrl ?? "/defaultPicture/default.jpg"}
                    alt="Recommended"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}