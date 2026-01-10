"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import { bookingService } from "@/services/booking.service";
import { PAYMENT_STATUS, PaymentEntity } from "@/types/booking.type";
import { Instrument_Sans, Staatliches } from "next/font/google";
import { toast } from "@/hooks/useToast";
import { isAxiosError } from "axios";
import ProgressStepper from "@/components/bookings/ProgressStepper";

const staatliches = Staatliches({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap"
}) 

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
})


export default function BookingDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [payment, setPayment] = useState<PaymentEntity | null>(null);
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
        message =
          error.response?.data?.error ||
          error.message ||
          message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast({
        variant: "destructive",
        title: "Download QR failed",
        description: message,
      });
    }
  }, [payment]);

  const onVerify = useCallback(async () => {
    if (verifying || !payment) return;

    try {
      setVerifying(true);

      const verifiedPayment = await bookingService.verifyPayment({ paymentId: id });
      setPayment(verifiedPayment);
    } catch (error) {
      let message = "Payment confirmation failed";

      if (isAxiosError(error)) {
        message =
          error.response?.data?.error ||
          error.message ||
          message;
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

  useEffect(() => {
    bookingService.fetchPaymentById(id)
      .then((res) => {
        setPayment(res);
      })
      .catch((error) => {
        let message = "Fetch payment failed";

        if (isAxiosError(error)) {
          message =
            error.response?.data?.error ||
            error.message ||
            message;
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
  }, [id])

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
      [PAYMENT_STATUS.REFUNDED]: "refunded",
    }
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        Payment is {statusMap[payment.status]}
      </div>
    );
  }

  return (
    <main className="min-h-screen text-white bg-black">
      <Navbar />

      <div className={`py-[110px] items-center px-4 lg:px-10 w-full ${instrumentSans.className}`}>
        <ProgressStepper stepIdx={2} />

        <div className="flex flex-col gap-4 max-w-96 items-center w-full mx-auto mt-8">
          {payment.qrUrl && (
            <div className="w-full overflow-hidden rounded-md max-w-72 max-h-72 p-4 bg-white">
              <Image
                src={payment.qrUrl}
                alt="QRIS"
                width={300}
                height={300}
                className="object-cover w-full h-auto"
              />
            </div>
          )}

          <h1 className={`text-8xl text-center font-bold mb-4 leading-[1.2] ${staatliches.className}`}>IDR {payment.value.toLocaleString()}</h1>

          <div className="w-full mt-auto space-y-1">
            <div className="flex justify-between">
              <p className="font-semibold">Selected Payment Method</p>
              <p>
                {payment.paymentMethod}
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 space-y-2 text-center text-white">
            <button
              onClick={onDownloadQR}
              className="w-full text-xl transition py-3 mb-4 rounded font-semibold bg-red-600 hover:bg-red-700"
            >
              Download QR
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
