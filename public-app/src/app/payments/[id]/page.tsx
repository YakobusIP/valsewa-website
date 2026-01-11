"use client";

import { useCallback, useEffect, useState } from "react";

import { bookingService } from "@/services/booking.service";

import Navbar from "@/components/Navbar";
import PaymentCountdown from "@/components/bookings/PaymentCountdown";
import ProgressStepper from "@/components/bookings/ProgressStepper";

import { toast } from "@/hooks/useToast";

import { PAYMENT_STATUS, PaymentWithBookingEntity } from "@/types/booking.type";

import { isAxiosError } from "axios";
import { ArrowDownToLineIcon, CheckIcon, XIcon } from "lucide-react";
import { Instrument_Sans, Staatliches } from "next/font/google";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";

const staatliches = Staatliches({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap"
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

export default function BookingDetailPage() {
  const router = useRouter();

  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [payment, setPayment] = useState<PaymentWithBookingEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

  const onDownloadQR = useCallback(async () => {
    if (!payment?.qrUrl) return;

    try {
      const res = await fetch(payment.qrUrl);
      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = `QRIS-${payment.paymentId}.png`;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      let message = "Download QR failed";

      if (isAxiosError(error)) {
        message = error.response?.data?.error || error.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast({
        variant: "destructive",
        title: "Download QR failed",
        description: message
      });
    }
  }, [payment]);

  const onVerify = useCallback(async () => {
    if (verifying || !payment) return;
    if (payment.status !== PAYMENT_STATUS.PENDING) return;

    try {
      setVerifying(true);

      const verifiedPayment = await bookingService.verifyPayment({
        paymentId: id
      });
      setPayment(verifiedPayment);
    } catch (error) {
      let message = "Payment confirmation failed";

      if (isAxiosError(error)) {
        message = error.response?.data?.error || error.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast({
        variant: "destructive",
        title: "Payment verification failed",
        description: message
      });
    } finally {
      setVerifying(false);
    }
  }, [id, payment, verifying]);

  const onBack = () => {
    router.push("/");
  };

  useEffect(() => {
    bookingService
      .fetchPaymentById(id)
      .then((res) => {
        setPayment(res);
      })
      .catch((error) => {
        let message = "Fetch payment failed";

        if (isAxiosError(error)) {
          message = error.response?.data?.error || error.message || message;
        } else if (error instanceof Error) {
          message = error.message;
        }

        setPayment(null);
        toast({
          variant: "destructive",
          title: "Fetch payment failed",
          description: message
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!payment) return;
    if (payment.status !== PAYMENT_STATUS.PENDING) return;

    const interval = setInterval(() => {
      onVerify();
    }, 5000);

    return () => clearInterval(interval);
  }, [payment, onVerify]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        Loading...
      </div>
    );
  }

  if (!payment) return notFound();

  if (payment.status !== PAYMENT_STATUS.PENDING) {
    const statusMap = {
      [PAYMENT_STATUS.SUCCESS]: "success",
      [PAYMENT_STATUS.EXPIRED]: "expired",
      [PAYMENT_STATUS.FAILED]: "failed",
      [PAYMENT_STATUS.CANCELLED]: "cancelled",
      [PAYMENT_STATUS.REFUNDED]: "refunded"
    };
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        <div
          className={`py-[110px] items-center flex flex-col gap-4 px-4 lg:px-10 w-full ${instrumentSans.className}`}
        >
          <div className="flex items-center justify-center">
            {payment.status === PAYMENT_STATUS.SUCCESS ? (
              <CheckIcon className="w-16 h-16 p-2 text-white bg-red-600 rounded-full" />
            ) : (
              <XIcon className="w-16 h-16 p-2 text-white bg-red-600 rounded-full" />
            )}
          </div>
          <h1
            className={`text-6xl text-center font-bold mb-4 leading-[1.2] uppercase ${staatliches.className}`}
          >
            Order {statusMap[payment.status]}!
          </h1>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen text-white bg-black">
      <Navbar />

      <div
        className={`py-[110px] items-center px-4 lg:px-10 w-full ${instrumentSans.className}`}
      >
        <ProgressStepper
          bookingId={payment.booking.id}
          stepIdx={2}
          onBack={onBack}
        />

        {payment.booking.expiredAt && (
          <PaymentCountdown expiredAt={payment.booking.expiredAt} />
        )}

        <div className="flex flex-col items-center w-full gap-4 mx-auto mt-8 max-w-96">
          {payment.qrUrl && (
            <div className="w-full p-4 overflow-hidden bg-white rounded-md max-w-72 max-h-72">
              <Image
                src={payment.qrUrl}
                alt="QRIS"
                width={300}
                height={300}
                className="object-cover w-full h-auto"
              />
            </div>
          )}

          <h1
            className={`text-8xl text-center font-bold mb-4 leading-[1.2] ${staatliches.className}`}
          >
            IDR {payment.value.toLocaleString()}
          </h1>

          <div className="w-full mt-auto space-y-1">
            <div className="flex justify-between">
              <p className="font-semibold">Selected Payment Method</p>
              <p>{payment.paymentMethod}</p>
            </div>
          </div>

          <div className="flex flex-col w-full gap-2 space-y-2 text-center text-white">
            <button
              onClick={onDownloadQR}
              className="flex items-center justify-center w-full gap-2 py-3 mb-4 text-xl font-semibold transition bg-red-600 rounded hover:bg-red-700"
            >
              <p>Download QR</p>
              <ArrowDownToLineIcon
                className="w-6 h-6 text-white"
                strokeWidth={3}
              />
            </button>
            <p className="text-xs">No payment confirmation received?</p>
            <button
              onClick={onVerify}
              className="w-full py-2 text-sm font-semibold rounded-md bg-neutral-700 hover:bg-neutral-600"
            >
              Confirm Payment Manually
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
