"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { bookingService } from "@/services/booking.service";

import Navbar from "@/components/Navbar";

import { useErrorHandler } from "@/hooks/useErrorHandler";

import { BOOKING_STATUS, BookingWithAccountEntity } from "@/types/booking.type";

import { formatDateToDateStr } from "@/lib/date-utils";
import { instrumentSans, staatliches } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import { AlertTriangleIcon, CheckIcon, CopyIcon, HomeIcon } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import { FaDiscord } from "react-icons/fa6";

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

export default function PaymentSuccessPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const paymentId = params?.id;

  const [booking, setBooking] = useState<BookingWithAccountEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [passwordCopied, setPasswordCopied] = useState(false);
  const { handleAsyncError } = useErrorHandler();

  useEffect(() => {
    if (!paymentId) return;

    // Fetch payment to get booking ID
    bookingService
      .fetchPaymentById(paymentId)
      .then((payment) => {
        if (payment && payment.bookingId) {
          // Fetch booking details
          return bookingService.fetchBookingById(payment.bookingId);
        }
        return null;
      })
      .then((bookingData) => {
        if (bookingData) {
          setBooking(bookingData);
        } else {
          setBooking(null);
        }
      })
      .catch((error) => {
        handleAsyncError(error, "Fetch booking failed", "Fetch booking failed");
        setBooking(null);
      })
      .finally(() => setLoading(false));
  }, [paymentId, handleAsyncError]);

  const onBackToHome = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleCopyPassword = async (password: string) => {
    await navigator.clipboard.writeText(password.trim());
    setPasswordCopied(true);
    setTimeout(() => setPasswordCopied(false), 1500);
  };

  const startDate = useMemo(() => {
    if (!booking?.startAt) return "";
    return formatDateToDateStr(booking.startAt);
  }, [booking?.startAt]);

  const endDate = useMemo(() => {
    if (!booking?.endAt) return "";
    return formatDateToDateStr(booking.endAt);
  }, [booking?.endAt]);

  const showCredentials = useMemo(() => {
    return (
      booking?.active === true &&
      booking?.account?.username &&
      booking?.account?.password
    );
  }, [booking]);

  if (loading) {
    return <LoadingState />;
  }

  if (!booking || booking.status !== BOOKING_STATUS.RESERVED) {
    return notFound();
  }

  return (
    <main className="min-h-screen text-white bg-black">
      <Navbar />

      <div
        className={cn(
          "py-[110px] px-4 lg:px-10 w-full max-w-7xl mx-auto",
          instrumentSans.className
        )}
      >
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="flex items-center justify-center">
            <CheckIcon className="w-20 h-20 p-3 text-white bg-red-600 rounded-full" />
          </div>
          <h1
            className={cn(
              "text-6xl text-center font-bold leading-[1.2] uppercase",
              staatliches.className
            )}
          >
            ORDER CONFIRMED!
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Attention/Penalty Information */}
          <div className="bg-red-600 rounded-lg p-16 space-y-4">
            <div className="flex items-center gap-4 mb-8">
              <AlertTriangleIcon className="w-12 h-12 text-white" />
              <h2 className={cn("text-3xl text-white", staatliches.className)}>
                ATTENTION
                <br />
                HOW TO AVOID PENALTY?
              </h2>
            </div>

            <div className="space-y-3 text-white flex flex-col gap-2">
              <div className="flex gap-4 items-center">
                <div className="flex flex-shrink-0 items-center justify-center w-6 h-6 rounded-full bg-white border text-black font-bold">
                  1
                </div>
                <p>
                  Logout of your account before rental period ends (
                  <b>{endDate}</b>)
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex flex-shrink-0 items-center justify-center w-6 h-6 rounded-full bg-white border text-black font-bold">
                  2
                </div>
                <p>
                  Ensure the account is logged out on time, or a fine will be
                  charged
                </p>
              </div>
            </div>

            <div className="pt-4 space-y-2 text-sm text-white border-t border-red-500">
              <p>
                This booking is final and cannot be modified after confirmation.
              </p>
              <p>Please note that cancellation is non-refundable.</p>
              <p>
                If you encounter any difficulties or have questions, please
                contact our{" "}
                <span className="font-semibold text-yellow-300 underline">
                  Customer Service
                </span>{" "}
                team for assistance.
              </p>
            </div>
          </div>

          {/* Right Panel - Booking Details */}
          <div className="flex flex-col bg-neutral-800 rounded-lg p-16 space-y-6 gap-2">
            <h2 className="text-xl font-semibold text-white">
              You&apos;re all set! here&apos;s your booking details:
            </h2>

            <div className="space-y-3 text-sm my-4">
              {showCredentials && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Riot Username</span>
                    <span className="font-medium text-white">
                      {booking.account.username}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Riot Password</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyPassword(booking.account.password!)
                      }
                      className="flex items-center gap-2 font-medium text-white hover:text-red-600"
                    >
                      <span className="select-text">
                        {booking.account.password}
                      </span>

                      {passwordCopied ? (
                        <CheckIcon className="w-4 h-4" />
                      ) : (
                        <CopyIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </>
              )}

              <div className="flex justify-between">
                <span className="text-gray-400">Account Code</span>
                <span className="font-medium text-white">
                  {booking.account.accountCode}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Start</span>
                <span className="font-medium text-white">{startDate}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Expiration</span>
                <span className="font-medium text-white">{endDate}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <span
                  className={`inline-block w-fit px-3 py-1 text-sm font-medium ${showCredentials ? "text-neutral-700 bg-white" : "text-white bg-neutral-700"} rounded`}
                >
                  {showCredentials ? "Ready to Use" : "Inactive"}
                </span>
              </div>
            </div>

            {showCredentials && (
              <div className="p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                <p className="text-sm text-yellow-300">
                  After successfully logging in, please consider leaving a
                  review and recommend us to your friends!
                </p>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() =>
                  window.open("https://discord.gg/valsewa", "_blank")
                }
                className="flex items-center justify-center gap-4 w-full py-3 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                <FaDiscord className="w-6 h-6" />
                <div className="flex flex-col items-start">
                  <span className="text-sm">Join Discord Community </span>
                  <span>
                    & Get <b>@Juragan Valsewa</b> Role!
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={onBackToHome}
                className="flex items-center justify-center gap-4 w-full py-3 px-4 text-white bg-neutral-700 rounded-lg hover:bg-neutral-600 transition focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                <HomeIcon className="w-6 h-6" />
                <span>Back to Home Page</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
