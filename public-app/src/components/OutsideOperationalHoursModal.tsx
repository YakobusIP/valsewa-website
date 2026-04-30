"use client";

import { useMemo } from "react";

import InventoryAccountCard from "@/components/InventoryAccountCard";
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
      <DialogContent className="box-border min-w-0 max-h-[90vh] max-w-[80rem] w-full max-[1727px]:w-[min(90vw,80rem)] overflow-x-hidden overflow-y-auto border-red-700 bg-black p-4 text-white sm:rounded-2xl sm:p-8 [&>button:last-child]:hidden">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-white hover:opacity-90"
          aria-label="Close"
        >
          <X size={28} />
        </button>

        <DialogHeader className="flex min-w-0 max-w-full flex-col items-center gap-6 text-center sm:text-center">
          <Clock3 className="h-12 w-12 shrink-0" aria-hidden />
          <DialogTitle className="max-w-full break-words text-3xl font-bold uppercase text-white md:text-4xl">
            Outside Operational Hours
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex w-full min-w-0 max-w-full flex-col items-center text-center text-base text-white sm:text-lg">
              <p className="max-w-full">Our operational hour is from</p>
              <p className="mt-2 max-w-full font-bold">
                {hoursLabel ? `${hoursLabel} WIB` : "—"}
              </p>
              <p className="mt-2 max-w-full">Try again within our operational hour.</p>
              <p className="mt-8 max-w-full break-words font-semibold">
                Or see our account recommendations that doesn’t require MFA
                verification:
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 min-w-0 max-w-full min-[1728px]:hidden">
          <Carousel className="w-full min-w-0" opts={{ align: "center", loop: true }}>
            <CarouselContent className="min-w-0">
              {accounts.map((account) => (
                <CarouselItem
                  key={account.id}
                  className="!max-w-[min(100%,616px)] w-[min(100%,616px)] !basis-[min(100%,616px)] shrink-0"
                >
                  <InventoryAccountCard
                    compact
                    item={account}
                    linkClassName="w-full"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="mt-6 hidden min-w-0 w-full min-[1728px]:flex min-[1728px]:flex-wrap min-[1728px]:content-start min-[1728px]:items-stretch min-[1728px]:gap-4 min-[1728px]:pb-2">
          {accounts.map((account) => (
            <InventoryAccountCard
              key={account.id}
              item={account}
              linkClassName="!mx-0 h-auto min-w-0 max-w-[600px] grow basis-0"
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
