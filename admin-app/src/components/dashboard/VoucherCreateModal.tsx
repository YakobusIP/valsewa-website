import { useEffect, useState } from "react";

import { voucherService } from "@/services/voucher.service";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { toast } from "@/hooks/useToast";

import { CreateVoucherPayload, VoucherType } from "@/types/voucher.type";

type VoucherForm = {
  voucherCode: string;
  voucherName: string;
  isValid: boolean;
  isVisible: boolean;
  type: VoucherType;
  percentage: string;
  nominal: string;
  maxDiscount: string;
  minOrderValue: string;
  maxGlobalUsage: string;
  maxUsagePerUser: string;
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
  onOpenChange,
  onSuccess
}: VoucherCreateModalProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<VoucherForm>({
    voucherCode: "",
    voucherName: "",
    isValid: true,
    isVisible: true,
    type: "PERSENTASE",
    percentage: "",
    nominal: "",
    maxDiscount: "",
    minOrderValue: "",
    maxGlobalUsage: "",
    maxUsagePerUser: "",
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

    if (!form.voucherCode.trim()) {
      toast({
        variant: "destructive",
        title: "Create failed",
        description: "Voucher code is required"
      });
      setLoading(false);
      return;
    }

    if (!form.voucherName.trim()) {
      toast({
        variant: "destructive",
        title: "Create failed",
        description: "Voucher name is required"
      });
      setLoading(false);
      return;
    }

    if (!form.dateStart || !form.dateEnd) {
      toast({
        variant: "destructive",
        title: "Create failed",
        description: "Start date and end date are required"
      });
      setLoading(false);
      return;
    }

    if (form.type === "PERSENTASE" && !form.percentage.trim()) {
      toast({
        variant: "destructive",
        title: "Create failed",
        description: "Percentage is required"
      });
      setLoading(false);
      return;
    }

    if (form.type === "NOMINAL" && !form.nominal.trim()) {
      toast({
        variant: "destructive",
        title: "Create failed",
        description: "Nominal is required"
      });
      setLoading(false);
      return;
    }

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

    const maxGlobalUsage = toOptionalPositiveInteger(form.maxGlobalUsage);
    if (form.maxGlobalUsage.trim() && maxGlobalUsage === null) {
      toast({
        variant: "destructive",
        title: "Create failed",
        description: "Max global usage must be a whole number of at least 1"
      });
      setLoading(false);
      return;
    }

    const maxUsagePerUser = toOptionalPositiveInteger(form.maxUsagePerUser);
    if (form.maxUsagePerUser.trim() && maxUsagePerUser === null) {
      toast({
        variant: "destructive",
        title: "Create failed",
        description: "Max usage per user must be a whole number of at least 1"
      });
      setLoading(false);
      return;
    }

    const payload: CreateVoucherPayload = {
      voucherCode: form.voucherCode.trim(),
      voucherName: form.voucherName.trim(),
      isValid: form.isValid,
      isVisible: form.isVisible,
      type: form.type,

      percentage:
        form.type === "PERSENTASE" ? toOptionalNumber(form.percentage) : null,

      nominal: form.type === "NOMINAL" ? toOptionalNumber(form.nominal) : null,

      maxDiscount:
        form.type === "PERSENTASE" ? toOptionalNumber(form.maxDiscount) : null,

      minOrderValue: toOptionalNumber(form.minOrderValue),
      maxGlobalUsage,
      maxUsagePerUser,

      dateStart: new Date(form.dateStart),
      dateEnd: new Date(form.dateEnd)
    };

    try {
      await voucherService.create(payload);
      onSuccess();
      onOpenChange(false);

      setForm({
        voucherCode: "",
        voucherName: "",
        isValid: true,
        isVisible: true,
        type: "PERSENTASE",
        percentage: "",
        nominal: "",
        maxDiscount: "",
        minOrderValue: "",
        maxGlobalUsage: "",
        maxUsagePerUser: "",
        dateStart: "",
        dateEnd: ""
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Create failed",
        description: (error as Error).message
      });
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
          <div>
            <label className="block mb-1 text-sm font-medium">
              Voucher Name <span className="text-destructive">*</span>
            </label>
            <input
              name="voucherName"
              value={form.voucherName}
              onChange={handleChange}
              placeholder="Enter voucher display name"
              className="border w-full p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Voucher Code <span className="text-destructive">*</span>
            </label>
            <input
              name="voucherCode"
              value={form.voucherCode}
              onChange={handleChange}
              placeholder="Enter unique promo code"
              className="border w-full p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Voucher Type <span className="text-destructive">*</span>
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
                  Percentage (%) <span className="text-destructive">*</span>
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
                Nominal <span className="text-destructive">*</span>
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

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Start Date <span className="text-destructive">*</span>
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
                End Date <span className="text-destructive">*</span>
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
