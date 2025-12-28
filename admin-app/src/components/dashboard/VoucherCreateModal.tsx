"use client";

import { useEffect, useState } from "react";
import { voucherService } from "@/services/voucher.service";
import { VoucherType, CreateVoucherPayload } from "@/types/voucher.type";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

type VoucherForm = {
  voucherName: string;
  isValid: boolean;
  isVisible: boolean;
  type: VoucherType;
  percentage: string;
  nominal: string;
  maxDiscount: string;
  dateStart: string;
  dateEnd: string;
};

type VoucherCreateModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};


export default function VoucherCreateModal({
  open,
  onOpenChange, onSuccess
}: VoucherCreateModalProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<VoucherForm>({
    voucherName: "",
    isValid: true,
    isVisible: true,
    type: "PERSENTASE",
    percentage: "",
    nominal: "",
    maxDiscount: "",
    dateStart: "",
    dateEnd: ""
  });

  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onOpenChange]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    if (target instanceof HTMLInputElement && type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: target.checked
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!form.voucherName) {
      alert("Voucher name is required");
      setLoading(false);
      return;
    }

    const payload: CreateVoucherPayload = {
      voucherName: form.voucherName,
      isValid: form.isValid,
      isVisble: form.isVisible,
      type: form.type,

      percentage:
        form.type === "PERSENTASE"
          ? Number(form.percentage)
          : null,

      nominal:
        form.type === "NOMINAL"
          ? Number(form.nominal)
          : null,

      maxDiscount:
        form.type === "PERSENTASE"
          ? Number(form.maxDiscount)
          : null,

      dateStart: new Date(form.dateStart),
      dateEnd: new Date(form.dateEnd)
    };

    try {
      await voucherService.create(payload);
      onSuccess();
      onOpenChange(false);

      setForm({
        voucherName: "",
        isValid: true,
        isVisible: true,
        type: "PERSENTASE",
        percentage: "",
        nominal: "",
        maxDiscount: "",
        dateStart: "",
        dateEnd: ""
      });
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full xl:w-3/5 overflow-y-auto max-h-[100dvh]">
        <DialogHeader>
          <DialogTitle>Create Voucher</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Voucher Name */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Voucher Name
            </label>
            <input
              name="voucherName"
              value={form.voucherName}
              onChange={handleChange}
              placeholder="Enter voucher name"
              className="border w-full p-2 rounded-md"
            />
          </div>

          {/* Voucher Type */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Voucher Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border w-full p-2 rounded-md"
            >
              <option value="PERSENTASE">PERSENTASE</option>
              <option value="NOMINAL">NOMINAL</option>
            </select>
          </div>

          {/* Discount Section */}
          {form.type === "PERSENTASE" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Percentage (%)
                </label>
                <input
                  type="number"
                  name="percentage"
                  value={form.percentage}
                  onChange={handleChange}
                  placeholder="e.g 10"
                  className="border w-full p-2 rounded-md"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  Max Discount
                </label>
                <input
                  type="number"
                  name="maxDiscount"
                  value={form.maxDiscount}
                  onChange={handleChange}
                  placeholder="e.g 50000"
                  className="border w-full p-2 rounded-md"
                />
              </div>
            </div>
          )}

          {form.type === "NOMINAL" && (
            <div>
              <label className="block mb-1 text-sm font-medium">
                Nominal
              </label>
              <input
                type="number"
                name="nominal"
                value={form.nominal}
                onChange={handleChange}
                placeholder="e.g 50000"
                className="border w-full p-2 rounded-md"
              />
            </div>
          )}

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Start Date
              </label>
              <input
                type="datetime-local"
                name="dateStart"
                value={form.dateStart}
                onChange={handleChange}
                className="border w-full p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                End Date
              </label>
              <input
                type="datetime-local"
                name="dateEnd"
                value={form.dateEnd}
                onChange={handleChange}
                className="border w-full p-2 rounded-md"
              />
            </div>
          </div>

          {/* Active Checkbox */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isValid"
              checked={form.isValid}
              onChange={handleChange}
            />
            Active
          </label>

          {/* Footer */}
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
              {loading ? "Saving..." : "Save Voucher"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
