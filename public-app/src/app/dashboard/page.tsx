"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";

import { bookingService } from "@/services/booking.service";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { useActiveBooking } from "@/hooks/useActiveBooking";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/useToast";

import { BOOKING_STATUS, BookingWithAccountEntity } from "@/types/booking.type";

import {
  logClientEvent,
  setLastKnownActionId
} from "@/lib/client-event-logger";
import { calculateTimeRemaining, cn, formatRentalPeriod } from "@/lib/utils";

import {
  AlertTriangleIcon,
  CopyIcon,
  ExternalLink,
  LogOut
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function generateActionId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export default function Dashboard() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 5;
  const { username, customerId, logout, isAuthenticated, isAuthChecked } =
    useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [finishingAccountId, setFinishingAccountId] = useState<number | null>(
    null
  );

  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const dialogOpenedAtRef = useRef<number | null>(null);
  const dashboardViewedRef = useRef(false);
  const ordersLoadedKeyRef = useRef<string | null>(null);

  const now = new Date();

  const { booking, totalPages, refetch } = useActiveBooking(
    customerId?.toString() ?? "",
    page,
    limit
  );

  const isOnGoingOrder = (booking: BookingWithAccountEntity): boolean => {
    if (!booking.startAt || !booking.endAt) return false;

    return (
      booking.status === "RESERVED" &&
      now.getTime() >= booking.startAt.getTime() &&
      now.getTime() <= booking.endAt.getTime() &&
      calculateTimeRemaining(booking.endAt) !== "N/A" &&
      calculateTimeRemaining(booking.endAt) !== "Expired"
    );
  };

  useEffect(() => {
    document.title = "Dashboard | Valsewa";
  }, []);

  useEffect(() => {
    if (!isAuthChecked) return;

    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthChecked, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthChecked || !isAuthenticated) return;
    if (dashboardViewedRef.current) return;
    dashboardViewedRef.current = true;

    void logClientEvent({
      eventName: "dashboard_viewed",
      metadata: { page, limit }
    });
  }, [isAuthChecked, isAuthenticated, page, limit]);

  useEffect(() => {
    if (!booking || !isAuthenticated) return;

    const MAX_IDS = 10;
    const currentTime = Date.now();
    const ids = booking.map((b) => b.id).slice(0, MAX_IDS);
    const ongoingIds = booking
      .filter((b) => {
        if (!b.startAt || !b.endAt) return false;
        return (
          b.status === "RESERVED" &&
          currentTime >= b.startAt.getTime() &&
          currentTime <= b.endAt.getTime() &&
          calculateTimeRemaining(b.endAt) !== "N/A" &&
          calculateTimeRemaining(b.endAt) !== "Expired"
        );
      })
      .map((b) => b.id)
      .slice(0, MAX_IDS);
    const holdIds = booking
      .filter((b) => b.status === BOOKING_STATUS.HOLD)
      .map((b) => b.id)
      .slice(0, MAX_IDS);
    const reservedIds = booking
      .filter((b) => b.status === BOOKING_STATUS.RESERVED)
      .map((b) => b.id)
      .slice(0, MAX_IDS);

    const key = `${page}:${ids.join(",")}`;
    if (ordersLoadedKeyRef.current === key) return;
    ordersLoadedKeyRef.current = key;

    void logClientEvent({
      eventName: "dashboard_orders_loaded",
      metadata: {
        page,
        limit,
        bookingCount: booking.length,
        bookingIds: ids,
        ongoingBookingIds: ongoingIds,
        holdBookingIds: holdIds,
        reservedBookingIds: reservedIds
      }
    });
  }, [booking, isAuthenticated, page, limit]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getStatusStyle = (booking: BookingWithAccountEntity) => {
    if (isOnGoingOrder(booking)) {
      return "bg-[#C70515] text-white";
    }
    return "bg-white text-black";
  };

  const copyToClipboard = async (object: string) => {
    await navigator.clipboard.writeText(object);

    toast({
      title: "Copied",
      description: "Copied to Clipboard!"
    });
  };

  const resumeHoldBooking = (booking: BookingWithAccountEntity) => {
    const payments = booking.payments;
    if (payments?.length) {
      router.push(`/payments/${payments[0].id}`);
    } else {
      router.push(`/bookings/${booking.id}`);
    }
  };

  const getOngoingOrderConfirmationPath = (
    booking: BookingWithAccountEntity
  ): string | null => {
    if (!isOnGoingOrder(booking)) return null;
    const paymentId = booking.payments?.[0]?.id;
    if (!paymentId) return null;
    return `/payments/${paymentId}/success`;
  };

  const handleDialogOpen = useCallback(
    (booking: BookingWithAccountEntity) => {
      const actionId = generateActionId();
      setActiveActionId(actionId);
      dialogOpenedAtRef.current = Date.now();
      setLastKnownActionId(actionId);

      void logClientEvent({
        eventName: "force_finish_dialog_opened",
        actionId,
        bookingId: booking.id,
        accountId: booking.accountId
      });
    },
    []
  );

  const handleForceFinish = useCallback(
    async (booking: BookingWithAccountEntity) => {
      if (finishingAccountId !== null) return;

      const actionId = activeActionId;
      const confirmDelayMs = dialogOpenedAtRef.current
        ? Date.now() - dialogOpenedAtRef.current
        : undefined;

      void logClientEvent({
        eventName: "force_finish_confirm_clicked",
        actionId: actionId ?? undefined,
        bookingId: booking.id,
        accountId: booking.accountId,
        confirmDelayMs
      });

      setFinishingAccountId(booking.accountId);

      void logClientEvent({
        eventName: "force_finish_request_started",
        actionId: actionId ?? undefined,
        bookingId: booking.id,
        accountId: booking.accountId
      });

      try {
        await bookingService.forceFinishBooking(
          booking.accountId,
          actionId ?? undefined
        );
        toast({
          title: "Booking finished",
          description: `Order for ${booking.account.accountCode} has been finished. Status will update shortly.`
        });

        void logClientEvent({
          eventName: "force_finish_request_completed",
          actionId: actionId ?? undefined,
          bookingId: booking.id,
          accountId: booking.accountId
        });

        refetch();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to finish booking";
        toast({
          variant: "destructive",
          title: "Could not finish booking",
          description: message
        });

        void logClientEvent({
          eventName: "force_finish_request_failed",
          actionId: actionId ?? undefined,
          bookingId: booking.id,
          accountId: booking.accountId,
          metadata: {
            errorName: error instanceof Error ? error.name : "Unknown",
            errorMessage: message
          }
        });
      } finally {
        setFinishingAccountId(null);
        setActiveActionId(null);
        dialogOpenedAtRef.current = null;
      }
    },
    [finishingAccountId, activeActionId, refetch]
  );

  if (!isAuthChecked || !isAuthenticated) {
    return null;
  }

  return (
    <Fragment>
      <main className="min-h-[100dvh] bg-[#0F0F0F] md:pb-8 pb-4">
        <div className="container flex flex-col mx-auto p-4 md:p-8 gap-4">
          <div
            className={`fixed top-0 z-50 w-full transition-all duration-300 pt-3 pb-3 ${
              isScrolled
                ? "bg-[#0F0F0F] shadow-md shadow-[#0F0F0F]"
                : "bg-transparent"
            }`}
          >
            <div className="mx-auto max-w-[1920px] h-[64px] flex items-center px-3 sm:px-6 lg:px-12">
              {/* LEFT */}
              <div className="absolute left-3 pl-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  aria-label="Go back"
                  className="inline-flex items-center gap-2 w-fit rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C70515] focus:ring-offset-2 focus:ring-offset-black transition"
                >
                  <Image
                    src="/arrow-back.svg"
                    alt="Back"
                    width={24}
                    height={24}
                  />
                </button>
              </div>

              {/* CENTER */}
              <div className="flex items-center justify-center flex-1 lg:hidden">
                <figure className="sm:w-[210px] w-[150px]">
                  <Image
                    src="/header/VALSEWA.svg"
                    alt="logo"
                    height={80}
                    width={210}
                    className="object-contain"
                    priority
                  />
                </figure>
              </div>

              <div className="flex-1 hidden lg:flex" />
            </div>
          </div>

          <div className="pt-20 pb-5 flex items-center justify-between gap-4">
            <h1 className="text-white lg:text-5xl text-2xl font-bold">
              {username?.toUpperCase()}&apos;S DASHBOARD
            </h1>

            <button
              type="button"
              onClick={logout}
              className="inline-flex text-sm lg:text-xl items-center gap-2 rounded-md bg-[#C70515] px-4 py-2 text-white font-semibold hover:bg-[#a90412] transition focus:outline-none focus:ring-2 focus:ring-[#C70515] focus:ring-offset-2 focus:ring-offset-black"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>

          <h1 className="text-white lg:text-5xl text-2xl font-bold lg:pt-10">
            MY ORDER
          </h1>

          <div className="rounded-sn overflow-hidden py-4">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#C70515] border-b border-neutral-800 hover:bg-[#C70515] lg:h-20 h-14">
                  <TableHead className="text-white text-center lg:text-lg text-sm">
                    Purchase Date
                  </TableHead>
                  <TableHead className="text-white text-center lg:text-lg text-sm">
                    Order
                  </TableHead>
                  <TableHead className="text-white text-center lg:text-lg text-sm">
                    Rental Period
                  </TableHead>
                  <TableHead className="text-white text-center lg:text-lg text-sm">
                    Status
                  </TableHead>
                  <TableHead className="text-white text-center lg:text-lg text-sm">
                    Username
                  </TableHead>
                  <TableHead className="text-white text-center lg:text-lg text-sm">
                    Password
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {booking &&
                  booking.map((booking) => (
                    <TableRow
                      key={booking.id}
                      className="bg-[#F9FAFB1A] border-b border-neutral-800 hover:bg-[#F9FAFB1A] h-20"
                    >
                      <TableCell className="text-white text-center lg:text-lg text-sm px-12">
                        {booking.createdAt?.toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-white text-center lg:text-lg text-sm text-nowrap px-12">
                        {(() => {
                          const confirmationPath =
                            getOngoingOrderConfirmationPath(booking);
                          if (confirmationPath) {
                            return (
                              <Link
                                href={confirmationPath}
                                className="inline-flex items-center justify-center gap-1.5 hover:text-[#C70515] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C70515] rounded"
                              >
                                {booking.account.accountCode}
                                <ExternalLink
                                  className="w-4 h-4 shrink-0"
                                  aria-hidden
                                />
                                <span className="sr-only">
                                  View order confirmation
                                </span>
                              </Link>
                            );
                          }
                          return booking.account.accountCode;
                        })()}
                      </TableCell>
                      <TableCell className="text-white text-center lg:text-lg text-sm text-nowrap px-12">
                        {isOnGoingOrder(booking)
                          ? calculateTimeRemaining(booking.endAt) + " Left"
                          : formatRentalPeriod(booking.startAt, booking.endAt)}
                      </TableCell>
                      <TableCell className="text-center lg:text-lg text-sm whitespace-nowrap px-12 text-nowrap">
                        {booking.status === BOOKING_STATUS.HOLD ? (
                          <button
                            type="button"
                            onClick={() => resumeHoldBooking(booking)}
                            className={cn(
                              "inline-flex items-center self-center justify-center px-3 py-2 rounded-md lg:text-lg text-sm cursor-pointer hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C70515] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F0F]",
                              getStatusStyle(booking)
                            )}
                          >
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1).toLowerCase()}
                          </button>
                        ) : isOnGoingOrder(booking) ? (
                          <AlertDialog
                            onOpenChange={(open) => {
                              if (open) handleDialogOpen(booking);
                            }}
                          >
                            <AlertDialogTrigger asChild>
                              <button
                                type="button"
                                disabled={
                                  finishingAccountId === booking.accountId
                                }
                                className={cn(
                                  "group inline-flex items-center self-center justify-center px-3 py-2 rounded-md lg:text-lg text-sm cursor-pointer hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C70515] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F0F] disabled:opacity-60 disabled:cursor-wait",
                                  getStatusStyle(booking)
                                )}
                              >
                                {finishingAccountId === booking.accountId ? (
                                  "Finishing..."
                                ) : (
                                  <>
                                    <span className="group-hover:hidden">
                                      On Going Order
                                    </span>
                                    <span className="hidden group-hover:inline">
                                      Finish Booking
                                    </span>
                                  </>
                                )}
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-black border border-[#C70515]">
                              <AlertDialogHeader className="items-center text-center sm:text-center">
                                <div className="flex flex-col items-center gap-3 mb-4">
                                  <AlertTriangleIcon className="w-20 h-20 text-[#C70515]" />
                                  <AlertDialogTitle className="text-2xl text-white uppercase">
                                    Selesaikan Booking?
                                  </AlertDialogTitle>
                                </div>
                                <AlertDialogDescription className="text-white">
                                  Apakah kamu yakin ingin menyelesaikan booking
                                  untuk {booking.account.accountCode}? Akunmu
                                  tidak akan bisa diakses lagi.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="text-white bg-black">
                                  Kembali
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-[#C70515] text-white"
                                  onClick={() => handleForceFinish(booking)}
                                >
                                  Selesaikan Booking
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        ) : (
                          <span
                            className={cn(
                              "inline-flex items-center self-center justify-center px-3 py-2 rounded-md lg:text-lg text-sm",
                              getStatusStyle(booking)
                            )}
                          >
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1).toLowerCase()}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-white text-center lg:text-lg text-sm px-12 text-nowrap">
                        {isOnGoingOrder(booking) &&
                          booking.account.username && (
                            <div className="relative inline-flex items-center gap-2">
                              <span>{booking.account.username}</span>
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="px-2"
                                onClick={() =>
                                  copyToClipboard(
                                    booking.account.username ?? ""
                                  )
                                }
                              >
                                <CopyIcon className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                      </TableCell>
                      <TableCell className="text-white text-center lg:text-lg text-sm text-nowrap px-10">
                        {isOnGoingOrder(booking) &&
                          booking.account.password && (
                            <div className="relative inline-flex items-center gap-2">
                              <span>{booking.account.password}</span>
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="px-2"
                                onClick={() =>
                                  copyToClipboard(
                                    booking.account.password ?? ""
                                  )
                                }
                              >
                                <CopyIcon className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex lg:justify-end justify-center items-center gap-2 mt-6">
            {/* ⬅⬅ First page */}
            <button
              disabled={page === 1}
              onClick={() => setPage(1)}
              className="py-2 rounded-md text-white disabled:opacity-40"
            >
              <Image
                src="/double-arrow-left.svg"
                alt="Back"
                height={24}
                width={24}
              />
            </button>

            {/* ⬅ Previous */}
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="pl-2 pr-3 py-2 rounded-md text-white disabled:opacity-40"
            >
              <Image
                src="/arrow-left.svg"
                alt="previous"
                height={24}
                width={14}
              />
            </button>

            {/* Page number */}
            <span className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold">
              {page}
            </span>

            {/* ➡ Next */}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="pl-3 pr-2 py-2 rounded-md text-white disabled:opacity-40"
            >
              <Image src="/arrow-right.svg" alt="next" height={24} width={14} />
            </button>

            {/* ➡➡ Last page */}
            <button
              disabled={page === totalPages}
              onClick={() => setPage(totalPages)}
              className="py-2 rounded-md text-white disabled:opacity-40"
            >
              <Image
                src="/double-arrow-right.svg"
                alt="forward"
                height={24}
                width={24}
              />
            </button>
          </div>
        </div>
      </main>
    </Fragment>
  );
}