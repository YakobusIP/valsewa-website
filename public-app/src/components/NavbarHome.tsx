"use client";

import { Fragment, useEffect, useState } from "react";

import { useActiveBooking } from "@/hooks/useActiveBooking";
import { useAuth } from "@/hooks/useAuth";

import { calculateDaysRented, calculateTimeRemaining } from "@/lib/utils";

import { customerService } from "@/services/customer.service";

import { ListPlus, MoreHorizontal, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import LoginPage from "./LoginPage";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

interface NavbarProps {
  activeBrand: "valsewa" | "valjubel" | "valjoki";
  setActiveBrand: (brand: "valsewa" | "valjubel" | "valjoki") => void;
  isScrolled: boolean;
}

function NavbarHome({ activeBrand, setActiveBrand, isScrolled }: NavbarProps) {
  const router = useRouter();
  const [isComponentOpen, setIsComponentOpen] = useState(false);

  const handleLoginClick = () => {
    setIsComponentOpen(true); // open login modal
  };
  const handleSearchClick = () => {
    router.push("/search");
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

  const [, setTick] = useState(0);
  const [streak, setStreak] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setStreak(null);
      return;
    }

    customerService
      .getMyStreak()
      .then((data) => setStreak(data.currentStreak))
      .catch(() => setStreak(null));
  }, [isAuthenticated]);

  const handleCardClick = (id: string) => {
    router?.push(`/details/${id}`);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-[var(--scrollbar-width,0px)] z-50 transition-all duration-300 lg:pt-3 px-8 lg:px-16 ${isScrolled ? "bg-black shadow-md shadow-black/20" : "bg-transparent"
        }`}
    >
      <div className="mx-auto max-w-[1920px] h-[84px] tablet:h-[80px] flex items-center justify-between">
        <div className="flex items-center gap-4 tablet:gap-8 md-lg:gap-11 lg:gap-12 xl:gap-8 2xl:gap-12 2xl-large:gap-12 large:gap-14 pl-7 tablet:pl-6 lg:pl-9 xl:pl-7">
          {/* Logo wrapper - positioned to align with hero notch on desktop, scales down on lg */}
          <div className="relative">
            {!isScrolled && (
              <figure className="relative w-[70px] tablet:w-[80px] lg:w-[100px] 2xl:w-[130px]">
                <Image
                  src="/header/Logo Header Valforum.png"
                  alt="logo"
                  height={50}
                  width={130}
                  className="object-contain w-full h-auto"
                />
              </figure>
            )}
            {isScrolled && (
              <Link href="/">
                <figure className="relative tablet:max-w-[170px] sm:max-w-[170px] max-w-[170px]">
                  <Image
                    src="/header/VALSEWA.png"
                    alt="logo"
                    height={80}
                    width={170}
                    className="object-contain"
                  />
                </figure>
              </Link>
            )}
          </div>
          {/* BRAND SWITCHER - scales down on lg, full size on xl+ */}
          <div
            className={`relative transition-all duration-300 ${isScrolled
              ? "opacity-0 translate-y-[-10px] pointer-events-none"
              : "opacity-100 translate-y-0"
              }`}
          >
            <div className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-2 rounded-2xl bg-gradient-to-r from-[#5a5a5a] to-[#2f2f2f] border border-white/20 shadow-inner">
              {/* VALSEWA */}
              <div
                onClick={() => setActiveBrand("valsewa")}
                className={`flex items-center justify-center px-3 tablet:px-2 py-2 rounded-xl cursor-pointer transition ${activeBrand === "valsewa"
                  ? "bg-black shadow-md"
                  : "hover:bg-white/10"
                  }`}
              >
                <Image
                  src="/header/VALSEWA.png"
                  alt="VALSEWA"
                  width={130}
                  height={28}
                  className="object-contain w-[80px] tablet:w-[80px] 2xl:w-[130px] h-auto"
                />
              </div>

              {/* VALJUBEL */}
              <div
                onClick={() => setActiveBrand("valjubel")}
                className={`flex items-center justify-center px-3 tablet:px-2 py-2 rounded-xl cursor-pointer transition ${activeBrand === "valjubel"
                  ? "bg-black shadow-md"
                  : "hover:bg-white/10"
                  }`}
              >
                <Image
                  src="/header/VALJUBEL.png"
                  alt="VALJUBEL"
                  width={130}
                  height={28}
                  className="object-contain w-[80px] tablet:w-[80px] 2xl:w-[130px] h-auto"
                />
              </div>

              {/* VALJOKI */}
              <div
                onClick={() => setActiveBrand("valjoki")}
                className={`flex items-center justify-center px-3 tablet:px-2 py-2 rounded-xl cursor-pointer transition ${activeBrand === "valjoki"
                  ? "bg-black shadow-md"
                  : "hover:bg-white/10"
                  }`}
              >
                <Image
                  src="/header/VALJOKI.png"
                  alt="VALJOKI"
                  width={130}
                  height={28}
                  className="object-contain w-[80px] tablet:w-[80px] 2xl:w-[130px] h-auto"
                />
              </div>
            </div>
          </div>
        </div>
        {/* NAV RIGHT SIDE */}
        <div className="flex items-center desktop:gap-4 gap-2">
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
              <Image
                src="/header/streak icon.svg"
                alt="Streak"
                width={40}
                height={40}
              />
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
                  <div className="flex items-center justify-center gap-3 cursor-default">
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

        {/* LOGIN POPUP */}
        {isComponentOpen && (
          <LoginPage onClose={() => setIsComponentOpen(false)} />
        )}

      </div>
    </div>
  );
}

export default NavbarHome;
