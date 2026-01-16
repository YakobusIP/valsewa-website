import { useEffect, useMemo, useState } from "react";

import { bookingService } from "@/services/transaction.service";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  BOOKING_STATUS,
  BookingEntity,
  CreateBookingRequest,
  PAYMENT_STATUS,
  PaymentEntity,
  UpdateBookingRequest
} from "@/types/booking.type";

import { format } from "date-fns";

import TransactionStatisticsGrid from "./TransactionStatisticGrid";

type Props = {
  open: boolean;
  onOpenChange: (val: boolean) => void;
};

type DatePreset = "1D" | "7D" | "30D" | null;

export default function TransactionListModal({ open, onOpenChange }: Props) {
  const [bookings, setBookings] = useState<BookingEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [datePreset, setDatePreset] = useState<DatePreset>(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [statistics, setStatistics] = useState<any>(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingEntity | null>(
    null
  );

  const [editTotalValue, setEditTotalValue] = useState<number>(0);

  const [createForm, setCreateForm] = useState<CreateBookingRequest>({
    accountCode: "",
    totalValue: 0
  });

  useEffect(() => {
    if (!open) return;
    fetchBookings();
    fetchAccountRented();
  }, [open, datePreset, dateFrom, dateTo]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await bookingService.fetchAll();
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  const fetchAccountRented = async () => {
    try {
      setLoading(true);
      setError(null);

      if (datePreset) {
        const now = new Date();
        const from = new Date();
        if (datePreset === "1D") from.setDate(now.getDate() - 1);
        if (datePreset === "7D") from.setDate(now.getDate() - 7);
        if (datePreset === "30D") from.setDate(now.getDate() - 30);
        const res = await bookingService.getAccountRented(
          formatDateOnly(from),
          formatDateOnly(now)
        );
        setStatistics(res.data);
        return;
      }

      if (dateFrom && dateTo) {
        const from = new Date(dateFrom);
        const to = new Date(dateTo);
        const res = await bookingService.getAccountRented(
          formatDateOnly(from),
          formatDateOnly(to)
        );
        setStatistics(res.data);
        return;
      }

      const res = await bookingService.getAccountRented();
      setStatistics(res.data);
      return;
    } catch (err) {
      console.error(err);
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  const formatDateOnly = (date: Date | string) => {
    return format(new Date(date), "MM-dd-yyyy");
  };

  const filteredBookings = useMemo(() => {
    let data = [...bookings];

    if (search.trim()) {
      data = data.filter((b) =>
        b.id.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (datePreset) {
      const now = new Date();
      const from = new Date();
      if (datePreset === "1D") from.setDate(now.getDate() - 1);
      if (datePreset === "7D") from.setDate(now.getDate() - 7);
      if (datePreset === "30D") from.setDate(now.getDate() - 30);

      data = data.filter((b) => {
        if (!b.createdAt) return false;
        const d = new Date(b.createdAt);
        return d >= from && d <= now;
      });
    }

    if (dateFrom && dateTo) {
      const from = new Date(dateFrom);
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);

      data = data.filter((b) => {
        if (!b.createdAt) return false;
        const d = new Date(b.createdAt);
        return d >= from && d <= to;
      });
    }

    return data;
  }, [bookings, search, datePreset, dateFrom, dateTo]);

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
      }),
        {
          // backend will only update what you send
          totalValue: editTotalValue
        } as UpdateBookingRequest;

      setIsEditOpen(false);
      setSelectedBooking(null);
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert("Failed to update total value");
    }
  };

  const handleCreateBooking = async () => {
    try {
      await bookingService.create(createForm);
      setIsCreateOpen(false);
      setCreateForm({
        accountCode: "",
        totalValue: 0
      });
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert("Failed to create booking");
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
      HOLD: "bg-yellow-500/10 text-yellow-600",
      RESERVED: "bg-blue-500/10 text-blue-600",
      EXPIRED: "bg-gray-500/10 text-gray-500",
      FAILED: "bg-red-500/10 text-red-500",
      CANCELLED: "bg-red-500/10 text-red-500",
      COMPLETED: "bg-green-500/10 text-green-600"
    };
    return (
      <span className={`px-2 py-0.5 rounded text-xs ${map[status]}`}>
        {status}
      </span>
    );
  };
  const renderPaymentStatus = (status?: string | null) => {
    if (!status) return "-";

    const normalized = status.toUpperCase();

    const map: Record<string, string> = {
      PAID: "bg-green-500/10 text-green-600",
      SUCCESS: "bg-green-500/10 text-green-600",
      PENDING: "bg-yellow-500/10 text-yellow-600",
      FAILED: "bg-red-500/10 text-red-500",
      REFUNDED: "bg-purple-500/10 text-purple-600",
      EXPIRED: "bg-gray-500/10 text-gray-500"
    };
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${map[normalized] ?? "bg-gray-500/10 text-gray-500"}`}
      >
        {normalized}
      </span>
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

  return (
    <>
      {/* MAIN MODAL */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full xl:w-5/6 max-h-[90dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Transaction List</DialogTitle>
          </DialogHeader>

          <TransactionStatisticsGrid
            statistics={statistics}
            isLoading={loading}
          />

          {/* FILTER */}
          <div className="flex flex-wrap gap-3 mt-4">
            <Input
              placeholder="Search Transaction ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[240px]"
            />
            <Button
              size="sm"
              variant={datePreset === "1D" ? "default" : "outline"}
              onClick={() => setDatePreset("1D")}
            >
              1 Day
            </Button>
            <Button
              size="sm"
              variant={datePreset === "7D" ? "default" : "outline"}
              onClick={() => setDatePreset("7D")}
            >
              7 Days
            </Button>
            <Button
              size="sm"
              variant={datePreset === "30D" ? "default" : "outline"}
              onClick={() => setDatePreset("30D")}
            >
              30 Days
            </Button>

            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="border rounded px-2 h-9"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="border rounded px-2 h-9"
            />

            <Button size="sm" variant="ghost" onClick={resetFilter}>
              Reset
            </Button>

            <div className="ml-auto">
              <Button onClick={() => setIsCreateOpen(true)}>
                + Create Booking
              </Button>
            </div>
          </div>

          {/* TABLE */}
          <div className="mt-4 border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="px-3 py-2 text-left">ID</th>
                  <th className="px-3 py-2 text-left">Date</th>
                  <th className="px-3 py-2 text-left">Customer</th>
                  <th className="px-3 py-2 text-left">Account</th>
                  <th className="px-3 py-2 text-left">Main Value</th>
                  <th className="px-3 py-2 text-left">Others Value</th>
                  <th className="px-3 py-2 text-left">Total</th>
                  <th className="px-3 py-2 text-left">Duration</th>
                  <th className="px-3 py-2 text-left">Booking Status</th>
                  <th className="px-3 py-2 text-left">Payment Status</th>
                  <th className="px-3 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="border-b hover:bg-muted">
                    <td className="px-3 py-2 font-mono text-xs">{b.id}</td>
                    <td className="px-3 py-2">{formatDateTime(b.createdAt)}</td>
                    <td className="px-3 py-2">{b.customerId ?? "-"}</td>
                    <td className="px-3 py-2">{b.accountId ?? "-"}</td>
                    <td className="px-3 py-2">{formatCurrency(b.mainValue)}</td>
                    <td className="px-3 py-2">
                      {formatCurrency(b.othersValue)}
                    </td>
                    <td className="px-3 py-2 font-semibold">
                      {formatCurrency(b.totalValue)}
                    </td>
                    <td className="px-3 py-2 font-semibold">
                      {b.duration ?? "-"}
                    </td>
                    <td className="px-3 py-2">
                      {renderBookingStatus(b.status)}
                    </td>
                    <td className="px-3 py-2 text-xs text-muted-foreground">
                      {getLatestPayment(b.payments)?.paidAt
                        ? renderPaymentStatus(
                            getLatestPayment(b.payments)!.status
                          )
                        : "-"}
                    </td>
                    <td className="px-3 py-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenEdit(b)}
                      >
                        Edit Total
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

      {/* CREATE MODAL */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create Booking</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Account Code */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Account Code</label>
              <Input
                type="text"
                placeholder="Enter account Code"
                value={createForm.accountCode}
                onChange={(e) =>
                  setCreateForm({
                    ...createForm,
                    accountCode: e.target.value
                  })
                }
              />
            </div>

            {/* Total Value */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Total Value (IDR)</label>
              <Input
                type="text"
                placeholder="Enter total value"
                value={createForm.totalValue}
                onChange={(e) =>
                  setCreateForm({
                    ...createForm,
                    totalValue: Number(e.target.value)
                  })
                }
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>

              <Button onClick={handleCreateBooking}>Create Booking</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
