import { useEffect, useState } from 'react';
import { bookingService } from '@/services/booking.service';
import { BookingWithAccountEntity } from '@/types/booking.type';

export function useActiveBooking(customerId: string | null) {
  const [booking, setBooking] = useState<BookingWithAccountEntity | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        const data = await bookingService.fetchBookingByCustId(customerId ?? "");
        if (!cancelled) {
          setBooking(data);
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
  }, [customerId]);

  return { booking, loading, error };
}