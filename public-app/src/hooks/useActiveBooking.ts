import { useCallback, useEffect, useState } from "react";

import { bookingService } from "@/services/booking.service";

import { BookingWithAccountEntity } from "@/types/booking.type";

export function useActiveBooking(
  customerId: string | null,
  page = 1,
  limit = 5
) {
  const [booking, setBooking] = useState<BookingWithAccountEntity[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBookings = useCallback(
    async (isCancelled: () => boolean = () => false) => {
      if (!customerId) {
        setBooking(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await bookingService.fetchBookingByCustId(
          customerId,
          page,
          limit
        );

        if (isCancelled()) return;

        const bookingsWithDates =
          data?.bookings.map((booking) => ({
            ...booking,
            startAt: booking.startAt ? new Date(booking.startAt) : null,
            endAt: booking.endAt ? new Date(booking.endAt) : null,
            expiredAt: booking.expiredAt ? new Date(booking.expiredAt) : null,
            createdAt: booking.createdAt ? new Date(booking.createdAt) : null
          })) ?? null;

        setBooking(bookingsWithDates);
        setTotalPages(data?.totalPages ?? 1);
      } catch (err) {
        if (!isCancelled()) {
          setError("Failed to fetch booking");
          console.error("Error fetching booking:", err);
        }
      } finally {
        if (!isCancelled()) {
          setLoading(false);
        }
      }
    },
    [customerId, page, limit]
  );

  useEffect(() => {
    let cancelled = false;
    fetchBookings(() => cancelled);
    return () => {
      cancelled = true;
    };
  }, [fetchBookings]);

  const refetch = useCallback(() => fetchBookings(), [fetchBookings]);

  return { booking, loading, error, totalPages, refetch };
}
