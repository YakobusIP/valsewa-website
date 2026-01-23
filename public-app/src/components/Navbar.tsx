"use client";

import { useState } from "react";

import { useActiveBooking } from "@/hooks/useActiveBooking";
import { useAuth } from "@/hooks/useAuth";

import { calculateDaysRented, calculateTimeRemaining } from "@/lib/utils";

import { ListPlus, MoreHorizontal, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import LoginPage from "./LoginPage";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

type SearchModalProps = React.ComponentProps<"div"> & {
  onOpenChange: (open: boolean) => void;
};

const Navbar = ({ onOpenChange }: SearchModalProps) => {
  const [isComponentOpen, setIsComponentOpen] = useState(false);

  const handleLoginClick = () => {
    setIsComponentOpen(true); // open login modal
  };

  const handleSearchClick = () => {
    onOpenChange(true);
  };
  const { isAuthenticated, username, customerId } = useAuth();
  const { booking } = useActiveBooking(customerId?.toString() ?? "");

  const bookingReserved = booking?.find(
    (i) =>
      i.status == "RESERVED" && (i.endAt?.getTime() ?? Date.now()) > Date.now()
  );
  const accountCode = bookingReserved?.account.accountCode;
  const rentedDays = calculateDaysRented(
    bookingReserved?.startAt ?? null,
    bookingReserved?.endAt ?? null
  );
  const remainingTime = calculateTimeRemaining(bookingReserved?.endAt ?? null);

  return (
    <div className="fixed top-0 z-50 w-full bg-[#000000] shadow-md shadow-black/5">
      <div className="mx-auto max-w-[1920px] pt-5 h-[84px] md:h-[80px] flex items-center justify-between px-5 md:px-14">
        {/* LOGO */}
        <div className="relative md:pl-14">
          <figure className="relative top-0 lg:max-w-[200px] sm:max-w-[150px] max-w-[150px] left-5">
            <Image
              src="/logo/Logo Valsewa 6 SVG.svg"
              alt="logo"
              height={300}
              width={200}
              className="object-contain"
            />
          </figure>
        </div>

        {/* NAV RIGHT SIDE */}
        <div className="md:pr-14 pr-7 flex items-center gap-4">
          {/* SEARCH */}
          <button onClick={handleSearchClick}>
            <div className="flex items-center justify-center border border-white/30 rounded-xl w-10 h-10 hover:border-white transition">
              <Image
                src="/header/Search Icon.svg"
                alt="Search"
                width={16}
                height={16}
              />
            </div>
          </button>

          {/* TOP UP */}
          <Link href="https://valforum.com/top-up">
            <div className="flex items-center gap-2 px-4 py-2 border border-white/30 rounded-xl hover:border-white transition cursor-pointer">
              <Image
                src="/header/Diamond.svg"
                alt="Top Up"
                width={18}
                height={18}
              />
              <span className="text-white text-sm font-bold font-instrumentSans">
                Top Up
              </span>
            </div>
          </Link>

          {/* SIGN IN */}
          {!isAuthenticated && (
            <button
              onClick={handleLoginClick}
              className="flex items-center gap-2 px-4 py-2 border border-black rounded-xl bg-white hover:bg-gray-100 transition"
            >
              <Image
                src="/header/SignUp Icon.svg"
                alt="Sign In"
                width={18}
                height={18}
                className="filter invert"
              />
              <span className="text-black text-sm font-semibold">
                Login/Sign Up
              </span>
            </button>
          )}

          {isAuthenticated && (
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <div className="flex items-center gap-2 px-4 py-2 border border-white/30 rounded-xl bg-[#C70515] hover:bg-[#a90411] transition cursor-pointer">
                  <Image
                    src="/header/SignUp Icon.svg"
                    alt="User"
                    width={18}
                    height={18}
                  />
                  <span className="text-white text-xs md:text-sm font-semibold">
                    {username}
                  </span>
                </div>
              </HoverCardTrigger>

              <HoverCardContent
                className="w-72 p-4 bg-[#C70515] border border-white/30 text-white"
                align="end"
                sideOffset={8}
              >
                <div className="space-y-4">
                  {/* User Info */}
                  <div className="flex items-center gap-3 cursor-default">
                    <User className="w-8 h-8" />
                    <span className="font-semibold text-xl">{username}</span>
                  </div>

                  {/* Ongoing Order */}
                  {bookingReserved && (
                    <div className="space-y-2 cursor-default">
                      <div className="flex items-center gap-3">
                        <ListPlus className="w-5 h-5" />
                        <span className="font-semibold">On Going Order</span>
                      </div>

                      {/* Order Details */}
                      <div className="space-y-1 cursor-default px-8">
                        <div className="text-sm font-medium text-white/70">
                          {accountCode} (Rented {rentedDays} days)
                        </div>
                        <div className="text-sm font-medium text-white/70">
                          {remainingTime} left
                        </div>
                      </div>
                    </div>
                  )}

                  {/* See More */}
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 w-full rounded-lg transition"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                    <span className="font-semibold">See More</span>
                  </Link>
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
      </div>

      {/* LOGIN POPUP */}
      {isComponentOpen && (
        <LoginPage onClose={() => setIsComponentOpen(false)} />
      )}
    </div>
  );
};

export default Navbar;
