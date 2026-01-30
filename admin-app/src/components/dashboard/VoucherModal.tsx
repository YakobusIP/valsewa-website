"use client";

import { useCallback, useEffect, useState } from "react";

import { VoucherEntity, voucherService } from "@/services/voucher.service";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { toast } from "@/hooks/useToast";

import { formatNumeric } from "@/utils/formatCurrency";
import { Loader2, Plus, Trash2 } from "lucide-react";

import VoucherCreateModal from "./VoucherCreateModal";

type VoucherModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function VoucherModal({
  open,
  onOpenChange
}: VoucherModalProps) {
  const [vouchers, setVouchers] = useState<VoucherEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const getVouchers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await voucherService.fetchAll(1, 100);
      setVouchers(res.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load vouchers";
      toast({
        variant: "destructive",
        title: "Failed to load vouchers",
        description: errorMessage || "Unknown error"
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) getVouchers();
  }, [open, getVouchers]);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this voucher?")) return;

    try {
      await voucherService.remove(id);

      setVouchers((prev) => prev.filter((v) => v.id !== id));

      toast({
        title: "Deleted",
        description: "Voucher removed successfully"
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to remove voucher";
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: errorMessage || "Unknown error"
      });
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await voucherService.toggleStatus(id);

      // Update UI instantly (no need refetch)
      setVouchers((prev) =>
        prev.map((v) => (v.id === id ? { ...v, isValid: !v.isValid } : v))
      );

      toast({
        title: "Updated",
        description: "Voucher status changed"
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update voucher";
      toast({
        variant: "destructive",
        title: "Failed",
        description: errorMessage || "Unknown error"
      });
    }
  };

  const handleToggleVisibility = async (id: number) => {
    try {
      await voucherService.toggleStatusVisibility(id);

      // Update UI instantly (no need refetch)
      setVouchers((prev) =>
        prev.map((v) => (v.id === id ? { ...v, isVisible: !v.isVisible } : v))
      );

      toast({
        title: "Updated",
        description: "Voucher visibility changed"
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update voucher";
      toast({
        variant: "destructive",
        title: "Failed",
        description: errorMessage || "Unknown error"
      });
    }
  };

  const handleCreated = () => {
    setOpenCreate(false);
    getVouchers();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Voucher List</DialogTitle>
          </DialogHeader>

          {/* CONTENT */}
          <div className="mt-4">
            {loading && (
              <div className="flex justify-center py-10">
                <Loader2 className="animate-spin w-6 h-6" />
              </div>
            )}

            {!loading && vouchers.length === 0 && (
              <p className="text-center text-muted-foreground">
                No vouchers available.
              </p>
            )}

            {!loading && vouchers.length > 0 && (
              <div className="space-y-3 max-h-[60vh] overflow-auto pr-2">
                {vouchers.map((voucher) => (
                  <div
                    key={voucher.id}
                    className="border p-4 rounded-xl flex justify-between items-center"
                  >
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">
                        {voucher.voucherName}
                      </h3>
                      <p
                        className={`text-xs font-semibold ${
                          voucher.isValid ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        Status: {voucher.isValid ? "ACTIVE" : "INACTIVE"}
                      </p>
                      <p
                        className={`text-xs font-semibold ${
                          voucher.isVisible ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        Visibility:{" "}
                        {voucher.isVisible ? "VISIBLE" : "INVISIBLE"}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Type: {voucher.type}
                        {voucher.type === "PERSENTASE" &&
                          ` • ${formatNumeric(voucher.percentage ?? 0)}%`}
                        {voucher.type === "NOMINAL" &&
                          ` • Rp ${formatNumeric(voucher.nominal ?? 0)}`}
                      </p>

                      {voucher.maxDiscount && (
                        <p className="text-sm text-muted-foreground">
                          Max: Rp {formatNumeric(voucher.maxDiscount) ?? 0}
                        </p>
                      )}

                      <p className="text-xs text-muted-foreground">
                        {new Date(voucher.dateStart).toLocaleDateString()} –{" "}
                        {new Date(voucher.dateEnd).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex flex-col xl:flex-row gap-2">
                      <Button
                        size="sm"
                        className="hover:bg-slate-400"
                        variant={voucher.isValid ? "secondary" : "default"}
                        onClick={() => handleToggle(voucher.id)}
                      >
                        {voucher.isValid ? "Deactivate" : "Activate"}
                      </Button>

                      <Button
                        size="sm"
                        className="hover:bg-slate-400"
                        variant={voucher.isVisible ? "secondary" : "default"}
                        onClick={() => handleToggleVisibility(voucher.id)}
                      >
                        {voucher.isVisible ? "Invisible" : "Visible"}
                      </Button>

                      <Button
                        size="icon"
                        variant="destructive"
                        className="place-self-end"
                        onClick={() => handleDelete(voucher.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button size="sm" onClick={() => setOpenCreate(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Voucher
          </Button>
        </DialogContent>
      </Dialog>

      <VoucherCreateModal
        open={openCreate}
        onOpenChange={setOpenCreate}
        onSuccess={handleCreated}
      />
    </>
  );
}
