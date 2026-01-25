"use client";

import { Fragment, useEffect, useState } from "react";

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

import { BookingWithAccountEntity } from "@/types/booking.type";

import { calculateDaysRented, calculateTimeRemaining, cn } from "@/lib/utils";

import { CopyIcon, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setAccessToken } from "@/lib/axios";

export default function Dashboard() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 5;
  const { username, customerId, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  const now = new Date();

  const { booking, totalPages } = useActiveBooking(
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

  return (
    <Fragment>
      <main className="min-h-[100dvh] bg-[#0F0F0F] md:pb-64 pb-32">
        <div className="container flex flex-col mx-auto p-4 xl:p-8 gap-4">
          <div
            className={`fixed top-0 z-50 w-full transition-all duration-300 pt-3 pb-3 ${
              isScrolled
                ? "bg-black shadow-md shadow-black/20"
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
                    src="/header/VALSEWA.png"
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
              className="inline-flex text-sm lg:text-xl font-normal items-center gap-2 rounded-md bg-[#C70515] px-4 py-2 text-white font-semibold hover:bg-[#a90412] transition focus:outline-none focus:ring-2 focus:ring-[#C70515] focus:ring-offset-2 focus:ring-offset-black"
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
                        {booking.account.accountCode}
                      </TableCell>
                      <TableCell className="text-white text-center lg:text-lg text-sm text-nowrap px-12">
                        {isOnGoingOrder(booking)
                          ? calculateTimeRemaining(booking.endAt) + " Left"
                          : calculateDaysRented(
                              booking.startAt,
                              booking.endAt
                            ) +
                            " Day" +
                            (calculateDaysRented(
                              booking.startAt,
                              booking.endAt
                            ) > 1
                              ? "s"
                              : "")}
                      </TableCell>
                      <TableCell className="text-center lg:text-lg text-sm whitespace-nowrap px-12 text-nowrap">
                        <span
                          className={cn(
                            "inline-flex items-center self-center justify-center px-3 py-2 rounded-md lg:text-lg text-sm",
                            getStatusStyle(booking)
                          )}
                        >
                          {isOnGoingOrder(booking)
                            ? "On Going Order"
                            : booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1).toLowerCase()}
                        </span>
                      </TableCell>
                      <TableCell className="text-white text-center lg:text-lg text-sm px-12 text-nowrap">
                        <div className="relative inline-flex items-center gap-2">
                          <span>{booking.account.nickname}</span>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="px-2"
                            onClick={() =>
                              copyToClipboard(booking.account.nickname ?? "")
                            }
                          >
                            <CopyIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-white text-center lg:text-lg text-sm text-nowrap px-10">
                        {booking.status == "RESERVED" &&
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
