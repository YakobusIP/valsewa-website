"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { bookingService } from "@/services/booking.service";
import { voucherService } from "@/services/voucher.service";

import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import BookingDetail from "@/components/bookings/BookingDetail";
import PaymentCountdown from "@/components/bookings/PaymentCountdown";
import PaymentMethods from "@/components/bookings/PaymentMethods";
import PaymentSummary from "@/components/bookings/PaymentSummary";
import ProgressStepper from "@/components/bookings/ProgressStepper";

import { useErrorHandler } from "@/hooks/useErrorHandler";

import {
  BOOKING_STATUS,
  BookingWithAccountEntity,
  PAYMENT_METHOD_REQUEST,
  PROVIDER
} from "@/types/booking.type";
import { VoucherEntity } from "@/types/voucher.type";

import { BOOKING_STATUS_MAP } from "@/lib/constants";
import { instrumentSans, staatliches } from "@/lib/fonts";
import { calculateVoucherDiscount, cn } from "@/lib/utils";

import { XIcon } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";

function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-lg">Loading booking details...</p>
      </div>
    </div>
  );
}

function BookingStatusView({ booking }: { booking: BookingWithAccountEntity }) {
  const router = useRouter();

  const statusLabel =
    BOOKING_STATUS_MAP[booking.status] || booking.status.toLowerCase();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
      <div
        role="img"
        aria-label={statusLabel}
      >
        <XIcon className="w-16 h-16 p-2 text-white bg-red-600 rounded-full" />
      </div>

      <h1
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase",
          staatliches.className
        )}
      >
        Order {statusLabel}!
      </h1>

      <button
        onClick={() =>
          router.push(`/details/${booking.accountId}`)
        }
        className="mt-4 px-6 py-3 text-base sm:text-lg font-semibold rounded bg-neutral-700 hover:bg-neutral-600 transition"
      >
        Back to Account
      </button>
    </div>
  );
}

export default function BookingDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [booking, setBooking] = useState<BookingWithAccountEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] =
    useState<PAYMENT_METHOD_REQUEST>(PAYMENT_METHOD_REQUEST.QRIS);
  const [voucher, setVoucher] = useState<VoucherEntity | null>(null);
  const [isLoadingCancelBooking, setIsLoadingCancelBooking] = useState(false);
  const { handleAsyncError } = useErrorHandler();

  const fetchVoucher = useCallback(
    async (voucherName: string): Promise<VoucherEntity | null> => {
      try {
        if (!voucherName.trim()) return null;
        return await voucherService.fetchActiveVoucherByVoucherName(
          voucherName
        );
      } catch (error) {
        handleAsyncError(error, "Apply voucher failed", "Apply voucher failed");
        return null;
      }
    },
    [handleAsyncError]
  );

  const handleCancelBooking = useCallback(async () => {
    if (!booking || isLoadingCancelBooking) return;

    try {
      setIsLoadingCancelBooking(true);
      await bookingService.cancelBooking({ bookingId: booking.id });
    } catch (error) {
      handleAsyncError(error, "Cancel booking failed", "Cancel booking failed");
    } finally {
      setIsLoadingCancelBooking(false);
      router.push("/");
    }
  }, [booking, isLoadingCancelBooking, handleAsyncError, router]);

  const onSubmit = useCallback(async () => {
    if (!booking || !paymentMethod) return;

    try {
      const payment = await bookingService.payBooking({
        bookingId: id!,
        voucherId: voucher?.id,
        provider: PROVIDER.FASPAY,
        paymentMethod: paymentMethod
      });

      if (payment) {
        router.push(`/payments/${payment.id}`);
      }
    } catch (error) {
      handleAsyncError(error, "Payment failed", "Payment failed");
    }
  }, [booking, paymentMethod, voucher, id, router, handleAsyncError]);

  const discount = useMemo(() => {
    if (!booking) return 0;
    return calculateVoucherDiscount(voucher, booking.mainValue);
  }, [booking, voucher]);

  const totalPayment = useMemo(() => {
    if (!booking) return 0;
    return booking.totalValue - discount;
  }, [booking, discount]);

  const isFailed = booking && (
    [
      BOOKING_STATUS.CANCELLED,
      BOOKING_STATUS.EXPIRED,
      BOOKING_STATUS.FAILED
    ].includes(booking.status));

  useEffect(() => {
    if (!id) return;

    bookingService
      .fetchBookingById(id)
      .then((res) => {
        setBooking(res);
      })
      .catch((error) => {
        handleAsyncError(error, "Fetch booking failed", "Fetch booking failed");
        setBooking(null);
      })
      .finally(() => setLoading(false));
  }, [id, handleAsyncError]);

  if (loading) {
    return <LoadingState />;
  }

  if (!booking || !booking.account) return notFound();

  if (booking.payments && booking.payments.length > 0) {
    router.push(`/payments/${booking.payments[0].id}`);
  }

  return (
    <main className="min-h-screen flex text-white bg-black">
      <div className="relative max-lg:hidden">
        <Navbar />
      </div>
      <div className="lg:hidden">
        <NavbarMobile onBack={handleCancelBooking} isLoading={isLoadingCancelBooking} />
      </div>

      <div
        className={cn(
          "pt-[90px] lg:pt-[110px] pb-8 lg:pb-[110px] px-4 lg:px-10 items-center w-full",
          instrumentSans.className
        )}
      >
        {isFailed ? (
          <BookingStatusView booking={booking} />
        ) : (
          <>
            <ProgressStepper
              stepIdx={1}
              handleCancelBooking={handleCancelBooking}
              isLoadingCancelBooking={isLoadingCancelBooking}
            />

            {(booking && booking.expiredAt) && (
              <PaymentCountdown expiredAt={booking.expiredAt} />
            )}

            <div className="hidden lg:flex lg:flex-row gap-8 lg:gap-32 mt-6 sm:mt-8 lg:mt-10">
              <div className="w-full space-y-6 sm:space-y-8 lg:space-y-10">
                <BookingDetail booking={booking} />
                <PaymentMethods
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
              </div>

              <PaymentSummary
                booking={booking}
                paymentMethod={paymentMethod}
                voucher={voucher}
                setVoucher={setVoucher}
                fetchVoucher={fetchVoucher}
                onSubmit={onSubmit}
              />
            </div>

            <div className="flex flex-col lg:hidden gap-6 sm:gap-8 mt-6 sm:mt-8">
              <BookingDetail booking={booking} />

              <PaymentSummary
                booking={booking}
                paymentMethod={paymentMethod}
                voucher={voucher}
                setVoucher={setVoucher}
                fetchVoucher={fetchVoucher}
                onSubmit={onSubmit}
              />

              <PaymentMethods
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />

              <div className="flex flex-col gap-2 space-y-2 text-center text-white">
                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={!booking || !paymentMethod || loading}
                  className={cn(
                    "w-full text-base sm:text-lg lg:text-xl transition py-2.5 sm:py-3 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black",
                    !booking || !paymentMethod || loading
                      ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  )}
                  aria-label={`Pay IDR ${totalPayment.toLocaleString()} and rent now`}
                >
                  {loading
                    ? "Loading..."
                    : `IDR ${totalPayment.toLocaleString()} | Rent Now`}
                </button>
                <p className="text-xs sm:text-sm">Any Questions?</p>
                <button
                  type="button"
                  className="w-full py-2 text-xs sm:text-sm font-semibold rounded-md bg-neutral-700 hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-black"
                >
                  Ask Our Team
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
