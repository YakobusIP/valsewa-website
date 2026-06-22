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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { toast } from "@/hooks/useToast";

import {
  VoucherUsageBookingRow,
  VoucherUsageSummary
} from "@/types/voucher.type";

import { formatNumeric } from "@/utils/formatCurrency";
import { Loader2 } from "lucide-react";

import BookingStatusBadge from "./BookingStatusBadge";
import VoucherStatisticsGrid, {
  formatQuotaDisplay
} from "./VoucherStatisticsGrid";

type VoucherDetailModalProps = {
  voucher: VoucherEntity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const PAGE_SIZE = 20;

const formatBookingNumber = (n: string) => {
  return `VS-${n.toString().padStart(7, "0")}`;
};

export default function VoucherDetailModal({
  voucher,
  open,
  onOpenChange
}: VoucherDetailModalProps) {
  const [summary, setSummary] = useState<VoucherUsageSummary | null>(null);
  const [bookings, setBookings] = useState<VoucherUsageBookingRow[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(false);

  const fetchSummary = useCallback(async () => {
    if (!voucher) return;

    try {
      setLoadingSummary(true);
      const data = await voucherService.fetchUsageSummary(voucher.id);
      setSummary(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load voucher summary";
      toast({
        variant: "destructive",
        title: "Failed to load summary",
        description: errorMessage
      });
    } finally {
      setLoadingSummary(false);
    }
  }, [voucher]);

  const fetchBookings = useCallback(async () => {
    if (!voucher) return;

    try {
      setLoadingBookings(true);
      const res = await voucherService.fetchUsageBookings(
        voucher.id,
        page,
        PAGE_SIZE
      );
      setBookings(res.data);
      setPageCount(res.metadata.pageCount);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load usage history";
      toast({
        variant: "destructive",
        title: "Failed to load usage history",
        description: errorMessage
      });
    } finally {
      setLoadingBookings(false);
    }
  }, [page, voucher]);

  useEffect(() => {
    if (!open || !voucher) return;
    setPage(1);
  }, [open, voucher]);

  useEffect(() => {
    if (!open || !voucher) return;
    fetchSummary();
  }, [open, voucher, fetchSummary]);

  useEffect(() => {
    if (!open || !voucher) return;
    fetchBookings();
  }, [open, voucher, page, fetchBookings]);

  if (!voucher) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col w-full max-w-5xl max-h-[100dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {voucher.voucherName}{" "}
            <span className="text-muted-foreground font-mono text-base">
              ({voucher.voucherCode})
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap gap-3 text-sm">
            <span
              className={
                voucher.isValid
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {voucher.isValid ? "ACTIVE" : "INACTIVE"}
            </span>
            <span
              className={
                voucher.isVisible
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {voucher.isVisible ? "VISIBLE" : "INVISIBLE"}
            </span>
            <span className="text-muted-foreground">
              Quota:{" "}
              {formatQuotaDisplay(voucher.usageCount, voucher.maxGlobalUsage)}
            </span>
          </div>

        <VoucherStatisticsGrid summary={summary} isLoading={loadingSummary} />

        <div className="space-y-2 flex flex-col flex-1 min-h-0">
          <h3 className="font-semibold">Usage History</h3>

          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Order Value</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Total Paid</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loadingBookings && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-6 text-center text-muted-foreground"
                    >
                      <Loader2 className="animate-spin w-6 h-6 inline" />
                    </TableCell>
                  </TableRow>
                )}

                {!loadingBookings && bookings.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-6 text-center text-muted-foreground"
                    >
                      No bookings are using this voucher.
                    </TableCell>
                  </TableRow>
                )}

                {!loadingBookings &&
                  bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-mono">
                        {formatBookingNumber(booking.readableNumber)}
                      </TableCell>
                      <TableCell>{booking.customerUsername ?? "-"}</TableCell>
                      <TableCell>
                        <BookingStatusBadge status={booking.status} />
                      </TableCell>
                      <TableCell>Rp {formatNumeric(booking.orderValue)}</TableCell>
                      <TableCell>Rp {formatNumeric(booking.discount)}</TableCell>
                      <TableCell>Rp {formatNumeric(booking.totalPaid)}</TableCell>
                      <TableCell>
                        {new Date(booking.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          {pageCount > 1 && (
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1 || loadingBookings}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {page} of {pageCount}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= pageCount || loadingBookings}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
