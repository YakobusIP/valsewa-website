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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { toast } from "@/hooks/useToast";

import { formatNumeric } from "@/utils/formatCurrency";
import { Loader2, MoreHorizontal, Plus } from "lucide-react";

import VoucherCreateModal from "./VoucherCreateModal";
import VoucherDetailModal from "./VoucherDetailModal";
import VoucherEditModal from "./VoucherEditModal";
import { formatQuotaDisplay } from "./VoucherStatisticsGrid";

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
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherEntity | null>(
    null
  );
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

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

  const handleUpdated = () => {
    setOpenEdit(false);
    getVouchers();
  };

  const openVoucherDetail = (voucher: VoucherEntity) => {
    setSelectedVoucher(voucher);
    setOpenDetail(true);
  };

  const openVoucherEdit = (voucher: VoucherEntity) => {
    setSelectedVoucher(voucher);
    setOpenEdit(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="flex flex-col w-full max-w-5xl max-h-[100dvh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Voucher List</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quota</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-6 text-center text-muted-foreground"
                    >
                      <Loader2 className="animate-spin w-6 h-6 inline" />
                    </TableCell>
                  </TableRow>
                )}

                {!loading && vouchers.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-6 text-center text-muted-foreground"
                    >
                      No vouchers available.
                    </TableCell>
                  </TableRow>
                )}

                {!loading &&
                  vouchers.map((voucher) => (
                    <TableRow key={voucher.id}>
                      <TableCell className="font-medium">
                        {voucher.voucherName}
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            voucher.isValid
                              ? "text-green-600 font-semibold text-xs"
                              : "text-red-600 font-semibold text-xs"
                          }
                        >
                          {voucher.isValid ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            voucher.isVisible
                              ? "text-green-600 font-semibold text-xs"
                              : "text-red-600 font-semibold text-xs"
                          }
                        >
                          {voucher.isVisible ? "VISIBLE" : "INVISIBLE"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {voucher.type}
                          {voucher.type === "PERSENTASE" &&
                            ` \u2022 ${formatNumeric(voucher.percentage ?? 0)}%`}
                          {voucher.type === "NOMINAL" &&
                            ` \u2022 Rp ${formatNumeric(voucher.nominal ?? 0)}`}
                          {voucher.maxDiscount != null && (
                            <span className="block text-muted-foreground text-xs">
                              Max: Rp {formatNumeric(voucher.maxDiscount)}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatQuotaDisplay(
                          voucher.usageCount ?? 0,
                          voucher.maxGlobalUsage
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                        {new Date(voucher.dateStart).toLocaleDateString()}
                        {" \u2013 "}
                        {new Date(voucher.dateEnd).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => openVoucherDetail(voucher)}
                            >
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => openVoucherEdit(voucher)}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleToggle(voucher.id)}
                            >
                              {voucher.isValid ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleToggleVisibility(voucher.id)}
                            >
                              {voucher.isVisible
                                ? "Make invisible"
                                : "Make visible"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDelete(voucher.id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end mt-4">
            <Button size="sm" onClick={() => setOpenCreate(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Voucher
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <VoucherCreateModal
        open={openCreate}
        onOpenChange={setOpenCreate}
        onSuccess={handleCreated}
      />

      <VoucherDetailModal
        voucher={selectedVoucher}
        open={openDetail}
        onOpenChange={setOpenDetail}
      />

      <VoucherEditModal
        voucher={selectedVoucher}
        open={openEdit}
        onOpenChange={setOpenEdit}
        onSuccess={handleUpdated}
      />
    </>
  );
}
