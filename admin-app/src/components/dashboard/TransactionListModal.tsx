import { useCallback, useEffect, useState } from "react";

import { accountService } from "@/services/account.service";
import { bookingService } from "@/services/transaction.service";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import {
  BOOKING_STATUS,
  BookingEntity,
  BookingStatistics,
  PaymentEntity
} from "@/types/booking.type";

import { format } from "date-fns";
import { useDebounce } from "use-debounce";

import TransactionStatisticsGrid from "./TransactionStatisticGrid";

type Props = {
  open: boolean;
  onOpenChange: (val: boolean) => void;
};

type DatePreset = "1D" | "7D" | "30D" | null;

export default function TransactionListModal({ open, onOpenChange }: Props) {
  const [bookings, setBookings] = useState<BookingEntity[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [datePreset, setDatePreset] = useState<DatePreset>(null);
  const [debouncedDatePreset] = useDebounce(datePreset, 500);
  const [dateFrom, setDateFrom] = useState("");
  const [debouncedDateFrom] = useDebounce(dateFrom, 500);
  const [dateTo, setDateTo] = useState("");
  const [debouncedDateTo] = useDebounce(dateTo, 500);
  const [statistics, setStatistics] = useState<BookingStatistics>({
    completedBookingCount: 0,
    totalIncome: 0
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isOverrideBookingOpen, setIsOverrideBookingOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingEntity | null>(
    null
  );

  const [editTotalValue, setEditTotalValue] = useState<number>(0);
  const [accountOverrideValue, setAccountOverrideValue] = useState<
    string | null
  >(null);
  const [availableAccounts, setAvailableAccounts] = useState<ComboboxOption[]>(
    []
  );

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await bookingService.fetchAll(
        debouncedSearch,
        debouncedDatePreset,
        debouncedDateFrom,
        debouncedDateTo
      );
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [
    debouncedSearch,
    debouncedDatePreset,
    debouncedDateFrom,
    debouncedDateTo
  ]);

  const fetchAccountRented = useCallback(async () => {
    try {
      setLoading(true);

      if (datePreset) {
        const now = new Date();
        const from = new Date();
        if (datePreset === "1D") from.setDate(now.getDate() - 1);
        if (datePreset === "7D") from.setDate(now.getDate() - 7);
        if (datePreset === "30D") from.setDate(now.getDate() - 30);
        const response = await bookingService.getAccountRented(
          formatDateOnly(from),
          formatDateOnly(now)
        );
        setStatistics(response.data);
        return;
      }

      if (dateFrom && dateTo) {
        const from = new Date(dateFrom);
        const to = new Date(dateTo);
        const response = await bookingService.getAccountRented(
          formatDateOnly(from),
          formatDateOnly(to)
        );
        setStatistics(response.data);
        return;
      }

      const response = await bookingService.getAccountRented();
      setStatistics(response.data);
      return;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [dateFrom, datePreset, dateTo]);

  const formatDateOnly = (date: Date | string) => {
    return format(new Date(date), "MM-dd-yyyy");
  };

  const handleOpenEdit = (booking: BookingEntity) => {
    setSelectedBooking(booking);
    setEditTotalValue(booking.totalValue);
    setIsEditOpen(true);
  };

  const handleUpdateTotalValue = async () => {
    if (!selectedBooking) return;

    try {
      await bookingService.update(selectedBooking.id, {
        totalValue: editTotalValue
      });

      setIsEditOpen(false);
      setSelectedBooking(null);
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert("Failed to update total value");
    }
  };

  const handleOpenOverrideBooking = async (booking: BookingEntity) => {
    try {
      setSelectedBooking(booking);
      setAccountOverrideValue(null);

      const accounts = await accountService.fetchAvailableAccounts(
        booking.startAt!,
        booking.endAt!
      );
      setAvailableAccounts(
        accounts.map((acc) => ({
          key: String(acc.id),
          label: acc.accountCode
        }))
      );
      setIsOverrideBookingOpen(true);
    } catch (err) {
      console.error(err);
      alert("Failed to open override booking");
    }
  };

  const handleOverrideBooking = async () => {
    if (!selectedBooking || !accountOverrideValue) return;

    try {
      await bookingService.overrideBooking(
        selectedBooking.id,
        Number(accountOverrideValue)
      );

      setIsOverrideBookingOpen(false);
      setSelectedBooking(null);
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert("Failed to override booking");
    }
  };

  const resetFilter = () => {
    setSearch("");
    setDatePreset(null);
    setDateFrom("");
    setDateTo("");
  };

  const formatCurrency = (v: number | null) =>
    v == null
      ? "-"
      : new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR"
        }).format(v);

  const formatDateTime = (d: Date | string | null) =>
    d ? new Date(d).toLocaleString("id-ID") : "-";

  const renderBookingStatus = (status: BOOKING_STATUS) => {
    const map: Record<BOOKING_STATUS, string> = {
      HOLD: "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20",
      RESERVED: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20",
      EXPIRED: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
      FAILED: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
      CANCELLED: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
      COMPLETED: "bg-green-500/10 text-green-600 hover:bg-green-500/20"
    };
    return <Badge className={map[status]}>{status}</Badge>;
  };
  const renderPaymentStatus = (status?: string | null) => {
    if (!status) return "-";

    const normalized = status.toUpperCase();

    const map: Record<string, string> = {
      PAID: "bg-green-500/10 text-green-600 hover:bg-green-500/20",
      SUCCESS: "bg-green-500/10 text-green-600 hover:bg-green-500/20",
      PENDING: "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20",
      FAILED: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
      REFUNDED: "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20",
      EXPIRED: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    };
    return (
      <Badge className={map[normalized] ?? "bg-gray-500/10 text-gray-500"}>
        {normalized}
      </Badge>
    );
  };

  const getLatestPayment = (payments: PaymentEntity[] | undefined) => {
    if (!payments || payments.length === 0) return null;

    return [...payments].sort((a, b) => {
      const aTime = a.paidAt ? new Date(a.paidAt).getTime() : 0;
      const bTime = b.paidAt ? new Date(b.paidAt).getTime() : 0;
      return bTime - aTime;
    })[0];
  };

  const formatBookingNumber = (n: string) => {
    return `VS-${n.toString().padStart(7, "0")}`;
  };

  useEffect(() => {
    if (!open) return;
    fetchBookings();
    fetchAccountRented();
  }, [
    open,
    debouncedDatePreset,
    debouncedDateFrom,
    debouncedDateTo,
    fetchAccountRented,
    fetchBookings
  ]);

  return (
    <>
      {/* MAIN MODAL */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="flex flex-col w-full max-h-[100dvh] overflow-y-auto">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Transaction List</DialogTitle>
            <DialogDescription>List of transactions</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-auto">
            <TransactionStatisticsGrid
              statistics={statistics}
              isLoading={loading}
            />

            {/* FILTER */}
            <div className="flex flex-col xl:flex-row gap-3 mt-4">
              <Input
                placeholder="Search Transaction ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="w-full"
                  variant={datePreset === "1D" ? "default" : "outline"}
                  onClick={() => setDatePreset("1D")}
                >
                  1 Day
                </Button>
                <Button
                  size="sm"
                  className="w-full"
                  variant={datePreset === "7D" ? "default" : "outline"}
                  onClick={() => setDatePreset("7D")}
                >
                  7 Days
                </Button>
                <Button
                  size="sm"
                  className="w-full"
                  variant={datePreset === "30D" ? "default" : "outline"}
                  onClick={() => setDatePreset("30D")}
                >
                  30 Days
                </Button>
              </div>

              <div className="flex gap-2">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full border rounded h-9 px-[0.15rem]"
                />
                <strong className="mt-1">-</strong>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full border rounded h-9 px-[0.15rem]"
                />
              </div>

              <Button size="sm" variant="destructive" onClick={resetFilter}>
                Reset
              </Button>
            </div>

            <Table className="mt-2">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Main Value</TableHead>
                  <TableHead>Others Value</TableHead>
                  <TableHead>Admin Fee</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Booking Status</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((b) => (
                  <TableRow key={b.id} className="border-b hover:bg-muted">
                    <TableCell className="font-mono">
                      {formatBookingNumber(b.readableNumber)}
                    </TableCell>
                    <TableCell>{formatDateTime(b.createdAt)}</TableCell>
                    <TableCell>{b.customer?.username ?? "-"}</TableCell>
                    <TableCell>{b.account?.accountCode ?? "-"}</TableCell>
                    <TableCell>{formatCurrency(b.mainValue)}</TableCell>
                    <TableCell>{formatCurrency(b.othersValue)}</TableCell>
                    <TableCell>{formatCurrency(b.adminFee) ?? "-"}</TableCell>
                    <TableCell className=" font-semibold">
                      {formatCurrency(b.totalValue)}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {getLatestPayment(b.payments)?.paymentMethod ?? "-"}
                    </TableCell>
                    <TableCell className=" font-semibold">
                      {b.duration ?? "-"}
                    </TableCell>
                    <TableCell>{renderBookingStatus(b.status)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {getLatestPayment(b.payments)?.paidAt
                        ? renderPaymentStatus(
                            getLatestPayment(b.payments)!.status
                          )
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-row gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenEdit(b)}
                        >
                          Edit Total
                        </Button>
                        {b.status === "RESERVED" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenOverrideBooking(b)}
                          >
                            Override Account
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {/* EDIT TOTAL MODAL */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Total Value</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              type="number"
              value={editTotalValue}
              onChange={(e) => setEditTotalValue(Number(e.target.value))}
              placeholder="Total Value"
            />

            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateTotalValue}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* OVERRIDE BOOKING MODAL */}
      <Dialog
        open={isOverrideBookingOpen}
        onOpenChange={setIsOverrideBookingOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Override booking</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label>Override booking to account</Label>
              <Combobox
                label="Available accounts"
                options={availableAccounts}
                selected={availableAccounts.find(
                  (acc) => acc.key === accountOverrideValue
                )}
                onSelect={(value) => {
                  setAccountOverrideValue(value.key);
                }}
                disabled={!availableAccounts || availableAccounts.length === 0}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => setIsOverrideBookingOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleOverrideBooking}
                disabled={!accountOverrideValue}
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
