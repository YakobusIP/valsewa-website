"use client";

import { Fragment, useEffect, useState } from "react";

import { useActiveBooking } from "@/hooks/useActiveBooking";
import { useAuth } from "@/hooks/useAuth";

import { calculateDaysRented, calculateTimeRemaining } from "@/lib/utils";

import { ListPlus, MoreHorizontal, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import LoginPage from "./LoginPage";
import { SearchModal } from "./SearchModal";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { customerService } from "@/services/customer.service";
import { Button } from "./ui/button";

import StreakCountdown from "./StreakCountdown";

interface NavbarProps {
  onLoginModalOpenChange?: (isOpen: boolean) => void;
}

const Navbar = ({ onLoginModalOpenChange }: NavbarProps) => {
  const router = useRouter();
  const [isComponentOpen, setIsComponentOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [, setTick] = useState(0);
  const [streak, setStreak] = useState<number | null>(null);
  const [lastEligibleRent, setLastEligibleRent] = useState<Date | null>(null);
  const [isCountdownVisible, setIsCountdownVisible] = useState(false);

  const handleLoginClick = () => {
    setIsComponentOpen(true); // open login modal
    onLoginModalOpenChange?.(true);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleCardClick = (id: string) => {
    router?.push(`/details/${id}`);
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

  useEffect(() => {
    if (!isAuthenticated) {
      setStreak(null);
      setLastEligibleRent(null);
      return;
    }

    customerService
      .getMyStreak()
      .then((data) => {
        setStreak(data.currentStreak);
        setLastEligibleRent(
          data.lastEligibleRent ? new Date(data.lastEligibleRent) : null
        );
      })
      .catch(() => {
        setStreak(null);
        setLastEligibleRent(null);
      });
  }, [isAuthenticated]);
  return (
    <div className="fixed top-0 z-50 w-full bg-[#000000] shadow-md shadow-black/5">
      <div className="mx-auto max-w-[1920px] pt-5 h-[84px] md:h-[80px] flex items-center justify-between px-5 ">
        {/* LOGO */}
        <Link href="/" className="relative md:pl-14">
          <figure className="relative top-0 lg:max-w-[200px] sm:max-w-[150px] max-w-[150px] left-5">
            <Image
              src="/header/VALSEWA.png"
              alt="logo"
              height={300}
              width={200}
              className="object-contain"
            />
          </figure>
        </Link>

        {/* NAV RIGHT SIDE */}
        <div className="pr-7 flex items-center gap-4">
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
            <Button className="hidden lg:flex border border-white/30 rounded-xl hover:border-white transition">
              <Image
                src="/header/Diamond.svg"
                alt="Top Up"
                width={18}
                height={18}
              />
              <span className="text-white text-xs tablet:text-sm font-bold font-instrumentSans">
                Top Up
              </span>
            </Button>
            <Button
              size="icon"
              className="lg:hidden border border-white/30 rounded-xl hover:border-white transition"
            >
              <Image
                src="/header/Diamond.svg"
                alt="Top Up"
                width={18}
                height={18}
              />
            </Button>
          </Link>

          {/* Streak */}
          {isAuthenticated && streak !== null && (
            <div className="flex items-center px-1 py-2 border border-white/30 rounded-xl transition cursor-pointer w-full justify-center">
              <StreakCountdown
                lastEligibleRent={lastEligibleRent}
                onVisibilityChange={setIsCountdownVisible}
                className="text-white text-xs font-bold mr-1"
              />

              {/* ICON SWITCH */}
              {isCountdownVisible ? (
                <Image
                  src="/header/time run out icon.svg"
                  alt="timer"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src="/header/streak icon.svg"
                  alt="streak"
                  width={40}
                  height={40}
                />
              )}
              <span className="text-white text-xs tablet:text-sm font-semibold [text-shadow:_-2px_0_0_#bd0c00,_2px_0_0_#bd0c00,_0_-2px_0_#bd0c00,_0_2px_0_#bd0c00]">
                {streak}
              </span>
            </div>
          )}

          {/* SIGN IN */}
          {!isAuthenticated && (
            <Fragment>
              <Button
                onClick={handleLoginClick}
                className="hidden lg:flex border border-black rounded-xl bg-white hover:bg-gray-100 transition"
              >
                <Image
                  src="/header/SignUp Icon.svg"
                  alt="Sign In"
                  width={18}
                  height={18}
                  className="filter invert"
                />
                <span className="text-black text-xs tablet:text-sm font-semibold hidden lg:block">
                  Login/Sign Up
                </span>
              </Button>
              <Button
                onClick={handleLoginClick}
                size="icon"
                className="lg:hidden border border-black rounded-xl bg-white hover:bg-gray-100 transition"
              >
                <Image
                  src="/header/SignUp Icon.svg"
                  alt="Sign In"
                  width={18}
                  height={18}
                  className="filter invert"
                />
              </Button>
            </Fragment>
          )}
          {isAuthenticated && (
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <div className="flex items-center justify-center gap-1 desktop:px-4 px-1 py-2 border border-white/30 rounded-xl bg-[#C70515] hover:bg-[#a90411] transition cursor-pointer w-full">
                  <Image
                    src="/header/SignUp Icon.svg"
                    alt="User"
                    width={18}
                    height={18}
                    className="max-desktop:w-[12px] max-desktop:h-[12px]"
                  />
                  <span className="text-white text-xs desktop:text-sm font-semibold">
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
        <LoginPage
          onClose={() => {
            setIsComponentOpen(false);
            onLoginModalOpenChange?.(false);
          }}
        />
      )}

      {isSearchOpen && (
        <SearchModal
          onSelectAccount={handleCardClick}
          onOpenChange={setIsSearchOpen}
          open
        />
      )}
    </div>
  );
};

export default Navbar;
