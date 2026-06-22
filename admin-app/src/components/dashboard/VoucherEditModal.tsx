"use client";

import { useEffect, useState } from "react";

import { VoucherEntity, voucherService } from "@/services/voucher.service";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { toast } from "@/hooks/useToast";

import { UpdateVoucherPayload } from "@/types/voucher.type";

import { formatNumeric } from "@/utils/formatCurrency";

type VoucherForm = {
  minOrderValue: string;
  maxGlobalUsage: string;
  maxUsagePerUser: string;
  dateEnd: string;
};

type VoucherEditModalProps = {
  voucher: VoucherEntity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

const toDateTimeLocal = (value: Date | string) => {
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 16);
};

const toOptionalNumber = (value: string) => {
  if (!value.trim()) return null;
  return Number(value);
};

const toOptionalPositiveInteger = (value: string): number | null => {
  if (!value.trim()) return null;
  const num = Number(value);
  if (!Number.isInteger(num) || num < 1) {
    return null;
  }
  return num;
};

export default function VoucherEditModal({
  voucher,
  open,
  onOpenChange,
  onSuccess
}: VoucherEditModalProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<VoucherForm>({
    minOrderValue: "",
    maxGlobalUsage: "",
    maxUsagePerUser: "",
    dateEnd: ""
  });

  useEffect(() => {
    if (!open || !voucher) return;

    setForm({
      minOrderValue: voucher.minOrderValue?.toString() ?? "",
      maxGlobalUsage: voucher.maxGlobalUsage?.toString() ?? "",
      maxUsagePerUser: voucher.maxUsagePerUser?.toString() ?? "",
      dateEnd: toDateTimeLocal(voucher.dateEnd)
    });
  }, [open, voucher]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucher) return;

    const dateEnd = new Date(form.dateEnd);
    const now = new Date();

    if (dateEnd < now) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "End date cannot be in the past"
      });
      return;
    }

    if (dateEnd <= new Date(voucher.dateStart)) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "End date must be after the start date"
      });
      return;
    }

    setLoading(true);

    const maxGlobalUsage = toOptionalPositiveInteger(form.maxGlobalUsage);
    if (form.maxGlobalUsage.trim() && maxGlobalUsage === null) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Max global usage must be a whole number of at least 1"
      });
      setLoading(false);
      return;
    }

    const maxUsagePerUser = toOptionalPositiveInteger(form.maxUsagePerUser);
    if (form.maxUsagePerUser.trim() && maxUsagePerUser === null) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Max usage per user must be a whole number of at least 1"
      });
      setLoading(false);
      return;
    }

    const payload: UpdateVoucherPayload = {
      minOrderValue: toOptionalNumber(form.minOrderValue),
      maxGlobalUsage,
      maxUsagePerUser,
      dateEnd
    };

    try {
      await voucherService.update(voucher.id, payload);
      toast({
        title: "Updated",
        description: "Voucher updated successfully"
      });
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: (error as Error).message
      });
    } finally {
      setLoading(false);
    }
  };

  if (!voucher) return null;

  const minDateEnd = toDateTimeLocal(new Date());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full xl:w-3/5 overflow-y-auto max-h-[100dvh]">
        <DialogHeader>
          <DialogTitle>
            Edit Voucher: {voucher.voucherName}{" "}
            <span className="text-muted-foreground font-mono text-base">
              ({voucher.voucherCode})
            </span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="rounded-md border p-4 space-y-2 bg-muted/30 text-sm">
            <p className="font-medium">Discount terms (read-only)</p>
            <p>Type: {voucher.type}</p>
            {voucher.type === "PERSENTASE" && (
              <>
                <p>Percentage: {voucher.percentage ?? "-"}%</p>
                <p>
                  Max discount:{" "}
                  {voucher.maxDiscount != null
                    ? `Rp ${formatNumeric(voucher.maxDiscount)}`
                    : "-"}
                </p>
              </>
            )}
            {voucher.type === "NOMINAL" && (
              <p>
                Nominal:{" "}
                {voucher.nominal != null
                  ? `Rp ${formatNumeric(voucher.nominal)}`
                  : "-"}
              </p>
            )}
            <p>Start date: {new Date(voucher.dateStart).toLocaleString()}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Minimum Order Value
              </label>
              <input
                type="number"
                name="minOrderValue"
                value={form.minOrderValue}
                onChange={handleChange}
                placeholder="Leave empty for none"
                className="border w-full p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Max Global Usage
              </label>
              <input
                type="number"
                step="1"
                min="1"
                name="maxGlobalUsage"
                value={form.maxGlobalUsage}
                onChange={handleChange}
                placeholder="Leave empty for unlimited"
                className="border w-full p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Max Usage per User
              </label>
              <input
                type="number"
                step="1"
                min="1"
                name="maxUsagePerUser"
                value={form.maxUsagePerUser}
                onChange={handleChange}
                placeholder="Leave empty for unlimited"
                className="border w-full p-2 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">End Date</label>
            <input
              type="datetime-local"
              name="dateEnd"
              value={form.dateEnd}
              min={minDateEnd}
              onChange={handleChange}
              className="border w-full p-2 rounded-md"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Must be today or later.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-black text-white"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
