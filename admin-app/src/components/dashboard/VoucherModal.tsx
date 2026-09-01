"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
  const [voucherToDelete, setVoucherToDelete] = useState<VoucherEntity | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const cancelDeleteRef = useRef<HTMLButtonElement>(null);

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
    if (open) {
      getVouchers();
      return;
    }

    setVoucherToDelete(null);
    setIsDeleting(false);
  }, [open, getVouchers]);

  useEffect(() => {
    if (voucherToDelete) cancelDeleteRef.current?.focus();
  }, [voucherToDelete]);

  const handleDelete = async () => {
    if (!voucherToDelete || isDeleting) return;

    try {
      setIsDeleting(true);
      await voucherService.remove(voucherToDelete.id);

      setVouchers((prev) => prev.filter((v) => v.id !== voucherToDelete.id));
      setVoucherToDelete(null);

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
    } finally {
      setIsDeleting(false);
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

  const closeDeleteConfirmation = () => {
    if (isDeleting) return;
    setVoucherToDelete(null);
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (!nextOpen && voucherToDelete) {
            closeDeleteConfirmation();
            return;
          }
          onOpenChange(nextOpen);
        }}
      >
        <DialogContent className="relative flex flex-col w-full max-w-5xl max-h-[100dvh] overflow-hidden">
          {voucherToDelete && (
            <div
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              onClick={closeDeleteConfirmation}
            >
              <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="delete-voucher-title"
                aria-describedby="delete-voucher-description"
                className="grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex flex-col space-y-2 text-center sm:text-left">
                  <h2
                    id="delete-voucher-title"
                    className="text-lg font-semibold"
                  >
                    Delete voucher?
                  </h2>
                  <p
                    id="delete-voucher-description"
                    className="text-sm text-muted-foreground"
                  >
                    {`"${voucherToDelete.voucherName}" (${voucherToDelete.voucherCode}) will be removed from the list.`}
                  </p>
                </div>
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                  <Button
                    ref={cancelDeleteRef}
                    type="button"
                    variant="outline"
                    className="mt-2 sm:mt-0"
                    disabled={isDeleting}
                    onClick={closeDeleteConfirmation}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={isDeleting}
                    onClick={() => void handleDelete()}
                  >
                    {isDeleting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Voucher List</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
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
                      colSpan={8}
                      className="py-6 text-center text-muted-foreground"
                    >
                      <Loader2 className="animate-spin w-6 h-6 inline" />
                    </TableCell>
                  </TableRow>
                )}

                {!loading && vouchers.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="py-6 text-center text-muted-foreground"
                    >
                      No vouchers available.
                    </TableCell>
                  </TableRow>
                )}

                {!loading &&
                  vouchers.map((voucher) => (
                    <TableRow key={voucher.id}>
                      <TableCell className="font-mono font-medium">
                        {voucher.voucherCode}
                      </TableCell>
                      <TableCell>{voucher.voucherName}</TableCell>
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
                              onClick={() => setVoucherToDelete(voucher)}
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
