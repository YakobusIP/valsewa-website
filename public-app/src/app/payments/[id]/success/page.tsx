"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { bookingService } from "@/services/booking.service";

import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";

import { useAuth } from "@/hooks/useAuth";
import { useErrorHandler } from "@/hooks/useErrorHandler";

import { BOOKING_STATUS, BookingWithAccountEntity } from "@/types/booking.type";

import { formatDateToDateStr } from "@/lib/date-utils";
import { instrumentSans, staatliches } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import { AlertTriangleIcon, CheckIcon, CopyIcon, HomeIcon } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import { FaDiscord, FaWhatsapp } from "react-icons/fa6";

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

  const WHATSAPP_CONFIG = {
    phoneNumber: "6285175343447",
    mfaMessage: "Halo admin VALSEWA aku mau request MFA dengan booking code: ",
  };

  const auth = useAuth();

  const { handleAsyncError } = useErrorHandler();

  useEffect(() => {
    if (!paymentId) return;

    if (!auth || !auth.isAuthChecked) return;

    if (!auth.isAuthenticated) {
      router.push("/");
    }

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
  }, [paymentId, handleAsyncError, auth, router]);

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
      booking?.account?.username
    );
  }, [booking]);

  const isMfaEnabled = useMemo(() => booking?.account?.isMfa, [booking]);

  const generateMFAWhatsAppLink = () => {
    return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(WHATSAPP_CONFIG.mfaMessage + booking?.id)}`;
  }

  if (loading) {
    return <LoadingState />;
  }

  if (!booking || booking.status !== BOOKING_STATUS.RESERVED) {
    return notFound();
  }

  return (
    <main className="min-h-screen text-white bg-black">
      <div className="relative max-lg:hidden">
        <Navbar />
      </div>
      <div className="lg:hidden">
        <NavbarMobile />
      </div>

      <div
        className={cn(
          "py-[90px] lg:py-[110px] px-4 lg:px-10 w-full max-w-7xl mx-auto",
          instrumentSans.className
        )}
      >
        <div className="flex flex-col items-center gap-2 sm:gap-3 lg:gap-4 mb-12">
          <div className="flex items-center justify-center">
            <CheckIcon className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 p-1 sm:p-3 text-white bg-red-600 rounded-full" />
          </div>
          <h1
            className={cn(
              "text-4xl sm:text-5xl lg:text-6xl text-center font-bold leading-[1.2] uppercase",
              staatliches.className
            )}
          >
            ORDER CONFIRMED!
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          
          {/* LEFT: Booking Details */}
          <div className="flex flex-col items-center text-center space-y-4">

            {/* ✅ WhatsApp CTA (ONLY MFA) */}
            {isMfaEnabled && (
              <button
                onClick={() => window.open(generateMFAWhatsAppLink(), "_blank")}
                className="flex items-center justify-center gap-4 max-w-md px-6 py-4 bg-green-500 hover:bg-green-600 rounded-xl transition"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full">
                  <FaWhatsapp className="w-6 h-6 text-white" />
                </div>

                <div className="flex flex-col text-left leading-tight">
                  <span className="text-sm text-white/80">
                    Send QR code to
                  </span>
                  <span className="text-base font-semibold text-white">
                    Valsewa by Whatsapp
                  </span>
                </div>
              </button>
            )}

            <p className="text-gray-300">
              You&apos;re all set! Here&apos;s your booking details:
            </p>

            {showCredentials && (
              <div className="space-y-4 w-full max-w-md text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Riot Username</span>
                  <span>{booking.account.username}</span>
                </div>

                {booking?.account?.password && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Riot Password</span>
                    <button
                      onClick={() => handleCopyPassword(booking.account.password!)}
                      className="flex items-center gap-2"
                    >
                      {booking.account.password}
                      {passwordCopied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Account Code */}
            <div className="flex justify-between w-full max-w-md text-sm">
              <span className="text-gray-400">Account Code</span>
              <span>{booking.account.accountCode}</span>
            </div>

            {/* Expiration Box */}
            <div className="bg-neutral-800 w-full max-w-md p-5 rounded-lg space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Start Date</span>
                <span className="font-semibold">{startDate}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Expiration</span>
                <span className="font-semibold">{endDate}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status</span>
                <div className="flex items-center gap-2 text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  Ready to Use
                </div>
              </div>
            </div>

            {/* Review Text */}
            <p className="text-yellow-400 text-sm">
              Consider leaving a review and recommend us to your friends!
            </p>

            {/* Discord */}
            <button
              onClick={() => window.open("https://discord.gg/ywqTZSTwRY")}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg flex items-center gap-3"
            >
              <FaDiscord />
              Join Discord Community
            </button>

            {/* Back */}
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 text-gray-300"
            >
              <HomeIcon size={18} />
              Back to Home Page
            </button>
          </div>

          {/* RIGHT: ATTENTION */}
          <div className="border border-white/20 rounded-lg p-8 space-y-5">
            <div className="flex items-center gap-3">
              <AlertTriangleIcon />
              <h2 className="text-2xl font-bold">
                ATTENTION
                <br />
                HOW TO AVOID PENALTY?
              </h2>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <span className="w-6 h-6 flex items-center justify-center bg-white text-black rounded-full">
                  1
                </span>
                <p>
                  Your rental period ends at: <b>{endDate}</b>
                </p>
              </div>

              <div className="flex gap-3">
                <span className="w-6 h-6 flex items-center justify-center bg-white text-black rounded-full">
                  2
                </span>
                <p>
                  Ensure the account is logged out on time, or a fine will be charged.
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-300 border-t pt-4 space-y-2">
              <p>This booking is final and cannot be modified.</p>
              <p>Cancellation is non-refundable.</p>
              <p>
                Contact{" "}
                <span
                  className="text-yellow-400 underline cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://wa.me/6285175343447",
                      "_blank"
                    )
                  }
                >
                  Customer Service
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
