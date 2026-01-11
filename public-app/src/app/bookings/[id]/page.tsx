"use client";

import { useEffect, useState } from "react";

import { bookingService } from "@/services/booking.service";
import { voucherService } from "@/services/voucher.service";

import Navbar from "@/components/Navbar";
import BookingDetail from "@/components/bookings/BookingDetail";
import PaymentCountdown from "@/components/bookings/PaymentCountdown";
import PaymentMethods from "@/components/bookings/PaymentMethods";
import PaymentSummary from "@/components/bookings/PaymentSummary";
import ProgressStepper from "@/components/bookings/ProgressStepper";

import { toast } from "@/hooks/useToast";

import { AccountEntity } from "@/types/account.type";
import {
  BOOKING_STATUS,
  BookingWithAccountEntity,
  PAYMENT_METHOD_REQUEST,
  PROVIDER
} from "@/types/booking.type";
import { VoucherEntity } from "@/types/voucher.type";

import { isAxiosError } from "axios";
import { CheckIcon, XIcon } from "lucide-react";
import { Instrument_Sans, Staatliches } from "next/font/google";
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

  const [account, setAccount] = useState<AccountEntity | null>(null);
  const [booking, setBooking] = useState<BookingWithAccountEntity | null>(null);
  const [loading, setLoading] = useState(true);

  const [paymentMethod, setPaymentMethod] =
    useState<PAYMENT_METHOD_REQUEST | null>(null);
  const [voucher, setVoucher] = useState<VoucherEntity | null>(null);

  useEffect(() => {
    bookingService
      .fetchBookingById(id)
      .then((res) => {
        setBooking(res);
        setAccount(res?.account ?? null);
      })
      .catch((error) => {
        let message = "Fetch booking failed";

        if (isAxiosError(error)) {
          message = error.response?.data?.error || error.message || message;
        } else if (error instanceof Error) {
          message = error.message;
        }

        setBooking(null);
        setAccount(null);
        toast({
          variant: "destructive",
          title: "Fetch booking failed",
          description: message
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function fetchVoucher(voucherName: string) {
    try {
      if (!voucherName) return null;
      return await voucherService.fetchActiveVoucherByVoucherName(voucherName);
    } catch (error) {
      let message = "Apply voucher failed";

      if (isAxiosError(error)) {
        message = error.response?.data?.error || error.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast({
        variant: "destructive",
        title: "Apply voucher failed",
        description: message
      });

      return null;
    }
  }

  async function onBack() {
    router.push("/");
  }

  async function onSubmit() {
    try {
      if (!booking || !paymentMethod) return;
      const payment = await bookingService.payBooking({
        bookingId: id,
        voucherId: voucher ? voucher.id : undefined,
        provider: PROVIDER.FASPAY,
        paymentMethod: paymentMethod
      });

      if (payment) {
        router.push(`/payments/${payment.paymentId}`);
      }
    } catch (error) {
      let message = "Payment failed";

      if (isAxiosError(error)) {
        message = error.response?.data?.error || error.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast({
        variant: "destructive",
        title: "Payment failed",
        description: message
      });
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        Loading...
      </div>
    );
  }

  if (!booking || !account) return notFound();

  if (booking.status !== BOOKING_STATUS.HOLD) {
    const statusMap = {
      [BOOKING_STATUS.RESERVED]: "reserved",
      [BOOKING_STATUS.EXPIRED]: "expired",
      [BOOKING_STATUS.FAILED]: "failed",
      [BOOKING_STATUS.CANCELLED]: "cancelled",
      [BOOKING_STATUS.COMPLETED]: "completed"
    };
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        <div
          className={`py-[110px] items-center flex flex-col gap-4 px-4 lg:px-10 w-full ${instrumentSans.className}`}
        >
          <div className="flex items-center justify-center">
            {booking.status === BOOKING_STATUS.RESERVED ? (
              <CheckIcon className="w-16 h-16 p-2 text-white bg-red-600 rounded-full" />
            ) : (
              <XIcon className="w-16 h-16 p-2 text-white bg-red-600 rounded-full" />
            )}
          </div>
          <h1
            className={`text-6xl text-center font-bold mb-4 leading-[1.2] uppercase ${staatliches.className}`}
          >
            Order {statusMap[booking.status]}!
          </h1>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen text-white bg-black">
      <Navbar />

      <div className={`py-[110px] px-4 lg:px-10 ${instrumentSans.className}`}>
        <ProgressStepper bookingId={id} stepIdx={1} onBack={onBack} />

        {booking.expiredAt && (
          <PaymentCountdown expiredAt={booking.expiredAt} />
        )}

        <div className="flex flex-row gap-32 mt-10">
          <div className="w-full space-y-10">
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
      </div>
    </main>
  );
}
