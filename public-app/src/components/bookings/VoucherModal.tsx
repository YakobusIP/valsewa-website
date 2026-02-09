"use client";

import { Fragment, useCallback, useEffect, useState } from "react";

import { voucherService } from "@/services/voucher.service";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { useErrorHandler } from "@/hooks/useErrorHandler";

import { VoucherEntity } from "@/types/voucher.type";

import { cn } from "@/lib/utils";

import { Check, Loader2Icon } from "lucide-react";

type VoucherCardProps = {
  voucher: VoucherEntity;
  selected: boolean;
  onSelect: () => void;
};

function VoucherCard({ voucher, selected, onSelect }: VoucherCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full rounded-lg border px-6 py-5 text-left transition",
        "flex items-center justify-between",
        selected
          ? "bg-zinc-600 border-white"
          : "bg-zinc-900 border-transparent hover:border-zinc-700"
      )}
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs text-zinc-300">
          Promo code: {voucher.voucherName}
        </p>
        <p className="text-3xl font-bold text-white">
          {voucher.type === "PERSENTASE"
            ? `${voucher.percentage}%`
            : `IDR ${voucher.nominal?.toLocaleString("id-ID")}`}{" "}
          OFF
        </p>
        {voucher.maxDiscount && (
          <p className="text-xs text-zinc-300">
            Maximum discount: IDR {voucher.maxDiscount.toLocaleString("id-ID")}
          </p>
        )}
      </div>

      <div
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full",
          selected ? "bg-red-500" : "bg-zinc-500"
        )}
      >
        {selected && <Check className="h-4 w-4 text-white" />}
      </div>
    </button>
  );
}

type VoucherModalProps = {
  voucher: VoucherEntity | null;
  handleApplyVoucher: (voucherName: string | null) => void;
  isApplyingVoucher: boolean;
};

export default function VoucherModal({
  voucher,
  handleApplyVoucher,
  isApplyingVoucher
}: VoucherModalProps) {
  const [open, setOpen] = useState(false);

  const [selectedVoucherName, setSelectedVoucherName] = useState<string | null>(
    null
  );
  const [vouchers, setVouchers] = useState<VoucherEntity[]>([]);
  const [loading, setLoading] = useState(false);

  const { handleAsyncError } = useErrorHandler();

  const fetchVouchers = useCallback(async () => {
    try {
      return await voucherService.fetchActiveVouchers();
    } catch (err) {
      handleAsyncError(err, "Fetch voucher failed", "Fetch voucher failed");
      return [];
    }
  }, [handleAsyncError]);

  useEffect(() => {
    if (!open) return;

    setLoading(true);
    fetchVouchers()
      .then(setVouchers)
      .finally(() => setLoading(false));
  }, [fetchVouchers, open]);

  useEffect(() => {
    if (!open) return;

    setSelectedVoucherName(voucher?.voucherName ?? null);
  }, [open, voucher]);

  return (
    <Fragment>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="text-[#E8C545] underline hover:text-yellow-400">
            Explore Promo Codes
          </button>
        </DialogTrigger>

        <DialogContent className="bg-black border border-zinc-700 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl uppercase">
              Promo Code
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {loading && (
              <div className="flex justify-center">
                <Loader2Icon className="h-6 w-6 animate-spin text-white" />
              </div>
            )}

            {!loading &&
              vouchers.map((v) => (
                <VoucherCard
                  key={v.id}
                  voucher={v}
                  selected={selectedVoucherName === v.voucherName}
                  onSelect={() => setSelectedVoucherName(v.voucherName)}
                />
              ))}
          </div>

          <p className="text-center text-sm text-zinc-400">
            {selectedVoucherName ? "1 Voucher Applied" : "No Voucher Applied"}
          </p>

          <DialogFooter className="flex-col gap-3">
            <Button
              className="bg-red-600 text-white w-full"
              onClick={() => {
                handleApplyVoucher(selectedVoucherName);
                setOpen(false);
              }}
              disabled={!selectedVoucherName || isApplyingVoucher}
            >
              {isApplyingVoucher && (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Apply
            </Button>

            <DialogClose asChild>
              <Button variant="ghost" className="text-white hover:bg-zinc-800">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
