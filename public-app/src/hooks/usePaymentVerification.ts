import { useCallback, useEffect, useRef } from "react";

import { bookingService } from "@/services/booking.service";

import { PAYMENT_STATUS, PaymentWithBookingEntity } from "@/types/booking.type";

import { PAYMENT_VERIFICATION_INTERVAL_MILLIS } from "@/lib/constants";

import { useErrorHandler } from "./useErrorHandler";

type UsePaymentVerificationOptions = {
  payment: PaymentWithBookingEntity | null;
  paymentId: string | undefined;
  onPaymentUpdate?: (payment: PaymentWithBookingEntity) => void;
};

export function usePaymentVerification({
  payment,
  paymentId,
  onPaymentUpdate
}: UsePaymentVerificationOptions) {
  const { handleAsyncError } = useErrorHandler();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const verifyPayment = useCallback(async () => {
    if (!paymentId || !payment) return;
    if (payment.status !== PAYMENT_STATUS.PENDING) return;

    try {
      const verifiedPayment = await bookingService.verifyPayment({
        paymentId
      });
      onPaymentUpdate?.(verifiedPayment);
    } catch (error) {
      handleAsyncError(
        error,
        "Payment verification failed",
        "Payment verification failed"
      );
    }
  }, [paymentId, payment, onPaymentUpdate, handleAsyncError]);

  useEffect(() => {
    if (!payment || payment.status !== PAYMENT_STATUS.PENDING) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      verifyPayment();
    }, PAYMENT_VERIFICATION_INTERVAL_MILLIS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [payment, verifyPayment]);

  return { verifyPayment };
}
