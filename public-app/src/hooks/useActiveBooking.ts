import { useEffect, useState } from 'react';
import { bookingService } from '@/services/booking.service';
import { BookingWithAccountEntity } from '@/types/booking.type';

export function useActiveBooking(customerId: string | null, page = 1, limit = 5) {
  const [booking, setBooking] = useState<BookingWithAccountEntity[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!customerId) {
      setBooking(null);
      return;
    }

    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);
      
      try {
        const data = await bookingService.fetchBookingByCustId(customerId ?? "", page, limit);
        if (!cancelled) {
          const bookingsWithDates = data?.bookings.map((booking) => ({
            ...booking,
            startAt: booking.startAt ? new Date(booking.startAt) : null,
            endAt: booking.endAt ? new Date(booking.endAt) : null,
            expiredAt: booking.expiredAt ? new Date(booking.expiredAt) : null,
            createdAt: booking.createdAt ? new Date(booking.createdAt) : null,
          })) ?? null;
          
          setBooking(bookingsWithDates);
          setTotalPages(data?.totalPages ?? 1);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to fetch booking');
          console.error('Error fetching booking:', err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [customerId, page, limit]);

  return { booking, loading, error, totalPages };
}