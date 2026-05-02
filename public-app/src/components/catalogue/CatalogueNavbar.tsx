"use client";

import { type CSSProperties, Fragment, useEffect, useState } from "react";

import { customerService } from "@/services/customer.service";

import LoginPage from "@/components/LoginPage";
import DesktopBrandSwitcher from "@/components/hero/DesktopBrandSwitcher";
import { heroChromeVars } from "@/components/hero/heroChromeMetrics";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import { useActiveBooking } from "@/hooks/useActiveBooking";
import { useAuth } from "@/hooks/useAuth";

import { calculateDaysRented, calculateTimeRemaining } from "@/lib/utils";

import { ListPlus, MoreHorizontal, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import StreakCountdown from "../StreakCountdown";

type BrandType = "valsewa" | "valjubel" | "valjoki";

interface CatalogueNavbarProps {
  activeBrand: BrandType;
  setActiveBrand: (brand: BrandType) => void;
  isScrolled: boolean;
}

function getMobileLogo(activeBrand: BrandType) {
  switch (activeBrand) {
    case "valjubel":
      return "/header/VALJUBEL.png";
    case "valjoki":
      return "/header/VALJOKI.png";
    default:
      return "/header/VALSEWA.png";
  }
}

export function CatalogueNavbar({
  activeBrand,
  setActiveBrand,
  isScrolled
}: CatalogueNavbarProps) {
  const [isComponentOpen, setIsComponentOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isAuthenticated, username, customerId } = useAuth();
  const { booking } = useActiveBooking(customerId?.toString() ?? "");

  const [, setTick] = useState(0);
  const [streak, setStreak] = useState<number | null>(null);
  const [lastEligibleRent, setLastEligibleRent] = useState<Date | null>(null);
  const [isCountdownVisible, setIsCountdownVisible] = useState(false);
  const [streakHintOpen, setStreakHintOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const bookingReserved = booking?.find(
    (i) =>
      i.status === "RESERVED" && (i.endAt?.getTime() ?? Date.now()) > Date.now()
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
      setIsCountdownVisible(false);
      setStreakHintOpen(false);
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

  useEffect(() => {
    if (!isCountdownVisible) setStreakHintOpen(false);
  }, [isCountdownVisible]);


  return (
    <>
      {/* ─── DESKTOP / TABLET (md+) ─── */}
      <div
        style={heroChromeVars as CSSProperties}
        className={`hidden tablet:block fixed top-0 left-0 right-[var(--scrollbar-width,0px)] z-50 transition-all duration-300 lg:pt-3 px-8 lg:px-8 ${
          isScrolled ? "bg-black shadow-md shadow-black/20" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-full h-[84px] md:h-[80px] flex items-center justify-between">
          <div className="flex items-center gap-[var(--hero-logo-switcher-gap)] pl-[var(--hero-nav-left-offset)]">
            <figure className="relative w-[var(--hero-valforum-logo-width)] pr-3">
              <Image
                src="/header/Logo Header Valforum.png"
                alt="logo"
                height={50}
                width={130}
                className="object-contain w-full h-auto"
              />
            </figure>

            <div className="relative transition-all duration-300">
              <DesktopBrandSwitcher
                activeBrand={activeBrand}
                setActiveBrand={setActiveBrand}
              />
            </div>
          </div>

          {/* RIGHT: Top Up + Auth */}
          <div className="flex items-center desktop:gap-4 gap-2 pl-2">
            <Link href="https://valforum.com/top-up">
              <Button className="hidden lg:flex border border-white/30 rounded-xl hover:border-white transition">
                <Image
                  src="/header/Diamond.svg"
                  alt="Top Up"
                  width={18}
                  height={18}
                />
                <span className="text-white text-xs md:text-sm font-bold font-instrumentSans">
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

            {!isAuthenticated && (
              <Fragment>
                <Button
                  onClick={() => setIsComponentOpen(true)}
                  className="hidden lg:flex border border-black rounded-xl bg-white hover:bg-gray-100 transition"
                >
                  <Image
                    src="/header/SignUp Icon.svg"
                    alt="Sign In"
                    width={18}
                    height={18}
                    className="filter invert"
                  />
                  <span className="text-black text-xs md:text-sm font-semibold hidden lg:block">
                    Login/Sign Up
                  </span>
                </Button>
                <Button
                  onClick={() => setIsComponentOpen(true)}
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
                  <div className="flex items-center justify-center gap-2 px-4 py-2 border border-white/30 rounded-xl bg-[#C70515] hover:bg-[#a90411] transition cursor-pointer">
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
                    <div className="flex items-center gap-3 cursor-default">
                      <User className="w-8 h-8" />
                      <span className="font-semibold text-xl">{username}</span>
                    </div>
                    {bookingReserved && (
                      <div className="space-y-2 cursor-default">
                        <div className="flex items-center gap-3">
                          <ListPlus className="w-5 h-5" />
                          <span className="font-semibold">On Going Order</span>
                        </div>
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
      </div>

      {/* ─── MOBILE (below md) ─── */}
      <div
        className={`tablet:hidden fixed top-0 left-0 right-[var(--scrollbar-width,0px)] z-50 transition-all duration-300 pt-3 pb-3 ${
          isScrolled ? "bg-black shadow-md shadow-black/20" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1920px] h-[64px] flex items-center px-4 gap-1">
          {/* CENTER: brand logo */}
          <div className="flex items-center justify-center flex-1">
            <figure className="sm:w-[210px] w-[150px]">
              <Image
                src={getMobileLogo(activeBrand)}
                alt={activeBrand}
                height={80}
                width={210}
                className="object-contain"
                priority
              />
            </figure>
          </div>

          {/* RIGHT: Top Up + auth */}
          <div className="flex items-center justify-end gap-1">
            <Link href="https://valforum.com/top-up">
              <div className="flex items-center justify-center w-10 h-10 border border-white/30 rounded-lg hover:border-white transition">
                <Image
                  src="/header/Diamond.svg"
                  alt="Top Up"
                  width={18}
                  height={18}
                />
              </div>
            </Link>

            {/* Streak — popover with timer only while countdown active (mobile) */}
            {isAuthenticated && streak !== null && (
              <>
                {isCountdownVisible ? (
                  <Popover open={streakHintOpen} onOpenChange={setStreakHintOpen}>
                    <StreakCountdown
                      lastEligibleRent={lastEligibleRent}
                      onVisibilityChange={setIsCountdownVisible}
                      className="hidden"
                    />
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        aria-label="Streak timer — tap for details"
                        className="flex items-center justify-center gap-0.5 w-10 h-10 px-1 border border-white/30 rounded-lg hover:border-white transition"
                      >
                        <Image
                          src="/header/time run out icon.svg"
                          alt=""
                          width={16}
                          height={16}
                          className="shrink-0"
                        />
                        <span className="text-white text-xs font-semibold [text-shadow:_-2px_0_0_#bd0c00,_2px_0_0_#bd0c00,_0_-2px_0_#bd0c00,_0_2px_0_#bd0c00]">
                          {streak}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-2 bg-neutral-900 border border-white/30 text-white"
                      align="center"
                      sideOffset={8}
                    >
                      <StreakCountdown
                        lastEligibleRent={lastEligibleRent}
                        className="text-white text-sm font-bold tabular-nums text-center block"
                      />
                    </PopoverContent>
                  </Popover>
                ) : (
                  <div className="flex items-center justify-center w-10 h-10 border border-white/30 rounded-lg hover:border-white transition">
                    <StreakCountdown
                      lastEligibleRent={lastEligibleRent}
                      onVisibilityChange={setIsCountdownVisible}
                      className="hidden"
                    />
                    <Image
                      src="/header/streak icon.svg"
                      alt="Streak"
                      width={18}
                      height={18}
                    />
                    <span className="text-white text-xs tablet:text-sm font-semibold [text-shadow:_-2px_0_0_#bd0c00,_2px_0_0_#bd0c00,_0_-2px_0_#bd0c00,_0_2px_0_#bd0c00]">
                      {streak}
                    </span>
                  </div>
                )}
              </>
            )}

            {!isAuthenticated && (
              <button
                onClick={() => setIsComponentOpen(true)}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white hover:bg-gray-200 transition"
              >
                <Image
                  src="/header/SignUp Icon.svg"
                  alt="Sign In"
                  width={18}
                  height={18}
                  className="filter invert"
                />
              </button>
            )}

            {isAuthenticated && (
              <Popover
                open={isMobileMenuOpen}
                onOpenChange={setIsMobileMenuOpen}
              >
                <PopoverTrigger asChild>
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#C70515] hover:bg-[#a90411] transition"
                  >
                    <Image
                      src="/header/SignUp Icon.svg"
                      alt="User"
                      width={18}
                      height={18}
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-56 p-4 bg-[#C70515] border border-white/30 text-white"
                  align="end"
                  sideOffset={8}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 cursor-default">
                      <User className="w-5 h-5" />
                      <span className="font-semibold text-l">{username}</span>
                    </div>
                    {bookingReserved && (
                      <div className="space-y-2 cursor-default">
                        <div className="flex items-center gap-3">
                          <ListPlus className="w-4 h-4" />
                          <span className="font-semibold text-sm">
                            On Going Order
                          </span>
                        </div>
                        <div className="space-y-1 cursor-default px-8">
                          <div className="text-xs font-medium text-white/70">
                            {accountCode} (Rented {rentedDays} days)
                          </div>
                          <div className="text-xs font-medium text-white/70">
                            {remainingTime} left
                          </div>
                        </div>
                      </div>
                    )}
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 w-full rounded-lg transition"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                      <span className="font-semibold text-sm">See More</span>
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>

      {isComponentOpen && (
        <LoginPage onClose={() => setIsComponentOpen(false)} />
      )}
    </>
  );
}
