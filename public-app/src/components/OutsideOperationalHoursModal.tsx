"use client";

import { useMemo } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { AccountEntity } from "@/types/account.type";
import { OperationalHoursEntity } from "@/types/setting.type";

import { format, subMinutes } from "date-fns";
import { Clock3, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function lastOrderFromClose(
  close: string,
  bufferMinutes: number
): string | null {
  const [hStr, mStr] = close.trim().split(":");
  if (hStr === undefined || mStr === undefined) return null;
  const h = Number(hStr);
  const m = Number(mStr);
  if (
    !Number.isInteger(h) ||
    !Number.isInteger(m) ||
    h < 0 ||
    h > 23 ||
    m < 0 ||
    m > 59
  ) {
    return null;
  }
  const atClose = new Date(2000, 0, 1, h, m, 0, 0);
  return format(subMinutes(atClose, bufferMinutes), "HH:mm");
}

type Props = {
  open: boolean;
  onClose: () => void;
  operationalHours: OperationalHoursEntity | null;
  accounts: AccountEntity[];
};

export default function OutsideOperationalHoursModal({
  open,
  onClose,
  operationalHours,
  accounts
}: Props) {
  const hoursLabel = useMemo(() => {
    if (!operationalHours?.open || !operationalHours?.close) return null;
    const buffer = operationalHours.lastOrderBufferInMinutes ?? 30;
    const last = lastOrderFromClose(operationalHours.close, buffer);
    if (!last) return null;
    return `${operationalHours.open} - ${last}`;
  }, [operationalHours]);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto border-red-700 bg-black p-8 text-white sm:rounded-2xl [&>button:last-child]:hidden">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-white hover:opacity-90"
          aria-label="Close"
        >
          <X size={28} />
        </button>

        <DialogHeader className="flex flex-col items-center gap-6 text-center sm:text-center">
          <Clock3 className="h-12 w-12" aria-hidden />
          <DialogTitle className="text-4xl font-bold uppercase text-white">
            Outside Operational Hours
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex w-full flex-col items-center text-center text-lg text-white">
              <p>Our operational hour is from</p>
              <p className="mt-2 font-bold">
                {hoursLabel ? `${hoursLabel} WIB` : "—"}
              </p>
              <p className="mt-2">Try again within our operational hour.</p>
              <p className="mt-8 font-semibold">
                Or see our account recommendations that doesn’t require MFA
                verification:
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 md:hidden">
          <Carousel
            opts={{ align: "center", loop: true }}
          >
            <CarouselContent>
              {accounts.map((account) => (
                <CarouselItem key={account.id} className="basis-[80%]">
                  <Link href={`/details/${account.id}`}>
                    <div className="rounded-xl overflow-hidden border border-white/20">
                      <div className="relative aspect-video">
                        <Image
                          src={
                            account.thumbnail?.imageUrl ??
                            "/defaultPicture/default.jpg"
                          }
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

        <div className="mt-6 hidden md:flex flex-wrap justify-center gap-4 pb-2">
          {accounts.map((account) => (
            <Link
              key={account.id}
              href={`/details/${account.id}`}
              className="min-w-[280px] flex-shrink-0"
            >
              <div className="rounded-xl overflow-hidden border border-white/20">
                <div className="relative aspect-video">
                  <Image
                    src={
                      account.thumbnail?.imageUrl ??
                      "/defaultPicture/default.jpg"
                    }
                    alt="Recommended"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
