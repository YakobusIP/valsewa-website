"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { bookingService } from "@/services/booking.service";

import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import PaymentCountdown from "@/components/bookings/PaymentCountdown";
import ProgressStepper from "@/components/bookings/ProgressStepper";

import { useAuth } from "@/hooks/useAuth";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { usePaymentVerification } from "@/hooks/usePaymentVerification";

import {
  BOOKING_STATUS,
  PAYMENT_METHOD_TYPE,
  PAYMENT_STATUS,
  PaymentWithBookingEntity
} from "@/types/booking.type";

import { PAYMENT_STATUS_MAP } from "@/lib/constants";
import { instrumentSans, staatliches } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import { ArrowDownToLineIcon, CheckIcon, CopyIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";

function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-lg">Loading payment details...</p>
      </div>
    </div>
  );
}

function PaymentStatusView({ payment }: { payment: PaymentWithBookingEntity }) {
  const router = useRouter();

  const statusLabel =
    PAYMENT_STATUS_MAP[payment.status] || payment.status.toLowerCase();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
      <div role="img" aria-label={statusLabel}>
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
        onClick={() => router.push(`/details/${payment.booking.accountId}`)}
        className="mt-4 px-6 py-3 text-base sm:text-lg font-semibold rounded bg-neutral-700 hover:bg-neutral-600 transition"
      >
        Back to Account
      </button>
    </div>
  );
}

export default function PaymentDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [payment, setPayment] = useState<PaymentWithBookingEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoadingCancelBooking, setIsLoadingCancelBooking] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [vaNoCopied, setVaNoCopied] = useState(false);

  const auth = useAuth();

  const { handleAsyncError } = useErrorHandler();

  const onDownloadQR = useCallback(async () => {
    if (!payment?.qrUrl) return;

    try {
      const res = await fetch(payment.qrUrl);
      if (!res.ok) throw new Error("Failed to fetch QR code");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = `QRIS-${payment.id}.png`;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      handleAsyncError(error, "Download QR failed", "Download QR failed");
    }
  }, [payment, handleAsyncError]);

  const handlePaymentUpdate = useCallback(
    (updatedPayment: PaymentWithBookingEntity) => {
      setPayment(updatedPayment);
      if (
        updatedPayment.status === PAYMENT_STATUS.SUCCESS &&
        updatedPayment.booking.status === BOOKING_STATUS.RESERVED
      ) {
        router.push(`/payments/${id}/success`);
      }
    },
    [id, router]
  );

  const handleCopyVaNo = async (vaNo: string) => {
    await navigator.clipboard.writeText(vaNo.trim());
    setVaNoCopied(true);
    setTimeout(() => setVaNoCopied(false), 1500);
  };

  const { verifyPayment } = usePaymentVerification({
    payment,
    paymentId: id,
    onPaymentUpdate: handlePaymentUpdate
  });

  const onVerify = useCallback(async () => {
    if (verifying || !payment || payment.status !== PAYMENT_STATUS.PENDING)
      return;

    try {
      setVerifying(true);
      await verifyPayment();
    } catch (error) {
      handleAsyncError(
        error,
        "Payment confirmation failed",
        "Payment verification failed"
      );
    } finally {
      setVerifying(false);
    }
  }, [payment, verifying, verifyPayment, handleAsyncError]);

  const handleCancelBooking = useCallback(async () => {
    if (!payment || isLoadingCancelBooking) return;

    try {
      setIsLoadingCancelBooking(true);
      await bookingService.cancelBooking({ bookingId: payment.bookingId });
    } catch (error) {
      handleAsyncError(error, "Cancel booking failed", "Cancel booking failed");
    } finally {
      setIsLoadingCancelBooking(false);
      router.push("/");
    }
  }, [payment, isLoadingCancelBooking, handleAsyncError, router]);

  const isFailed =
    payment &&
    [
      PAYMENT_STATUS.CANCELLED,
      PAYMENT_STATUS.EXPIRED,
      PAYMENT_STATUS.FAILED
    ].includes(payment.status);

  useEffect(() => {
    if (!id) return;

    if (!auth || !auth.isAuthChecked) return;

    if (!auth.isAuthenticated) {
      router.push("/");
    }

    bookingService
      .fetchPaymentById(id)
      .then((res) => {
        setPayment(res);
        // Redirect to success page if payment is successful and booking is reserved
        if (
          res &&
          res.status === PAYMENT_STATUS.SUCCESS &&
          res.booking.status === BOOKING_STATUS.RESERVED
        ) {
          router.push(`/payments/${id}/success`);
        }
      })
      .catch((error) => {
        handleAsyncError(error, "Fetch payment failed", "Fetch payment failed");
        setPayment(null);
      })
      .finally(() => setLoading(false));
  }, [id, handleAsyncError, router, auth]);

  const paymentMethodLabel = useMemo(() => {
    if (!payment) return "";
    return payment.paymentMethod === PAYMENT_METHOD_TYPE.QRIS
      ? "QRIS"
      : `VA ${payment.bankCode || ""}`;
  }, [payment]);

  if (loading) {
    return <LoadingState />;
  }

  if (!payment) return notFound();

  if (
    payment.status === PAYMENT_STATUS.SUCCESS &&
    payment.booking.status === BOOKING_STATUS.RESERVED
  ) {
    router.push(`/payments/${id}/success`);
    return;
  }

  return (
    <main className="min-h-screen flex text-white bg-black">
      <div className="relative max-lg:hidden">
        <Navbar />
      </div>
      <div className="lg:hidden">
        <NavbarMobile />
      </div>

      <div
        className={cn(
          "py-[90px] lg:py-[110px] items-center px-4 lg:px-10 w-full",
          instrumentSans.className
        )}
      >
        {isFailed ? (
          <PaymentStatusView payment={payment} />
        ) : (
          <>
            <ProgressStepper
              stepIdx={2}
              handleCancelBooking={handleCancelBooking}
              isLoadingCancelBooking={isLoadingCancelBooking}
            />

            {payment.booking && payment.booking.expiredAt && (
              <PaymentCountdown expiredAt={payment.booking.expiredAt} />
            )}

            <div className="flex flex-col items-center w-full gap-4 mx-auto mt-4 lg:mt-8 max-w-96">
              {payment.qrUrl && (
                <div className="w-full p-3 sm:p-4 overflow-hidden bg-white rounded-md max-w-64 sm:max-w-72 max-h-64 sm:max-h-72">
                  <Image
                    src={payment.qrUrl}
                    alt="QRIS payment code"
                    width={300}
                    height={300}
                    className="object-cover w-full h-auto"
                    priority
                  />
                </div>
              )}

              <h1
                className={cn(
                  "text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:text-8xl text-center font-bold mb-4 leading-[1.2]",
                  staatliches.className
                )}
              >
                IDR {payment.value.toLocaleString()}
              </h1>

              <div className="w-full mt-auto space-y-2 sm:space-y-1">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <p className="font-semibold text-sm sm:text-base">
                    Selected Payment Method
                  </p>
                  <p className="text-sm sm:text-base">{paymentMethodLabel}</p>
                </div>
                {payment.bankAccountNo && (
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                    <p className="font-semibold text-sm sm:text-base">
                      VA Number
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCopyVaNo(payment.bankAccountNo!)}
                      className="flex items-center gap-2 font-medium text-white hover:text-red-600 text-sm sm:text-base"
                    >
                      <span className="select-text break-all">
                        {payment.bankAccountNo}
                      </span>

                      {vaNoCopied ? (
                        <CheckIcon className="w-4 h-4 flex-shrink-0" />
                      ) : (
                        <CopyIcon className="w-4 h-4 flex-shrink-0" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col w-full gap-2 space-y-2 text-center text-white">
                {payment.qrUrl && (
                  <button
                    type="button"
                    onClick={onDownloadQR}
                    className="flex items-center justify-center w-full gap-2 py-2.5 sm:py-3 mb-4 text-base sm:text-lg lg:text-xl font-semibold transition bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Download QR code"
                  >
                    <p>Download QR</p>
                    <ArrowDownToLineIcon
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      strokeWidth={3}
                    />
                  </button>
                )}
                <p className="text-xs sm:text-sm">
                  No payment confirmation received?
                </p>
                <button
                  type="button"
                  onClick={onVerify}
                  disabled={verifying}
                  className="w-full py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-md bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-black"
                >
                  {verifying ? "Verifying..." : "Confirm Payment Manually"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
