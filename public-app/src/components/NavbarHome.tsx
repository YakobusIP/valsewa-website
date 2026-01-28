"use client";

import { useEffect, useState } from "react";

import { useActiveBooking } from "@/hooks/useActiveBooking";
import { useAuth } from "@/hooks/useAuth";

import { calculateDaysRented, calculateTimeRemaining } from "@/lib/utils";

import { ListPlus, MoreHorizontal, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import LoginPage from "./LoginPage";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { SearchModal } from "./SearchModal";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const [isComponentOpen, setIsComponentOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeBrand, setActiveBrand] = useState<
    "valsewa" | "valjubel" | "valjoki"
  >("valsewa");

  const handleLoginClick = () => {
    setIsComponentOpen(true); // open login modal
  };
  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };
  const { isAuthenticated, username, customerId } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
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
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCardClick = (id: string) => {
    router?.push(`/details/${id}`);
  };

  return (
    <div
      className={`fixed top-0 z-50 w-full transition-all duration-300 pt-3 pb-3 ${isScrolled ? "bg-black shadow-md shadow-black/20" : "bg-transparent"
        }`}
    >
      <div className="mx-auto max-w-[1920px] h-[84px] md:h-[80px] flex items-center justify-between px-8 sm:px-12 xl:px-24 large:px-16">
        <div className="flex items-center gap-4 lg:gap-6 xl:gap-10 pl-4 lg:pl-6 xl:pl-8">
          {/* Logo wrapper - positioned to align with hero notch on desktop, scales down on lg */}
          <div className="relative">
            {!isScrolled && (
              <figure className="relative w-[70px] xl:w-[80px] 2xl:w-[130px]">
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
              <figure className="relative xl:max-w-[170px] sm:max-w-[170px] max-w-[170px]">
                <Image
                  src="/header/VALSEWA.png"
                  alt="logo"
                  height={80}
                  width={170}
                  className="object-contain"
                />
              </figure>
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
                className={`flex items-center justify-center px-3 lg:px-4 xl:px-6 py-2 rounded-xl cursor-pointer transition ${activeBrand === "valsewa"
                  ? "bg-black shadow-md"
                  : "hover:bg-white/10"
                  }`}
              >
                <Image
                  src="/header/VALSEWA.png"
                  alt="VALSEWA"
                  width={130}
                  height={28}
                  className="object-contain w-[80px] xl:w-[80px] 2xl:w-[130px] h-auto"
                />
              </div>

              {/* VALJUBEL */}
              <div
                onClick={() => setActiveBrand("valjubel")}
                className={`flex items-center justify-center px-3 lg:px-4 xl:px-6 py-2 rounded-xl cursor-pointer transition ${activeBrand === "valjubel"
                  ? "bg-black shadow-md"
                  : "hover:bg-white/10"
                  }`}
              >
                <Image
                  src="/header/VALJUBEL.png"
                  alt="VALJUBEL"
                  width={130}
                  height={28}
                  className="object-contain w-[80px] xl:w-[80px] 2xl:w-[130px] h-auto"
                />
              </div>

              {/* VALJOKI */}
              <div
                onClick={() => setActiveBrand("valjoki")}
                className={`flex items-center justify-center px-3 lg:px-4 xl:px-6 py-2 rounded-xl cursor-pointer transition ${activeBrand === "valjoki"
                  ? "bg-black shadow-md"
                  : "hover:bg-white/10"
                  }`}
              >
                <Image
                  src="/header/VALJOKI.png"
                  alt="VALJOKI"
                  width={130}
                  height={28}
                  className="object-contain w-[80px] xl:w-[80px] 2xl:w-[130px] h-auto"
                />
              </div>
            </div>
          </div>
        </div>
        {/* NAV RIGHT SIDE */}
        <div className="flex items-center gap-4">
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
              <span className="text-white text-xs md:text-sm font-bold font-instrumentSans">
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
              <span className="text-black text-xs md:text-sm font-semibold">
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

        {/* LOGIN POPUP */}
        {isComponentOpen && (
          <LoginPage onClose={() => setIsComponentOpen(false)} />
        )}

        {isSearchOpen && (
          <SearchModal
            onSelectAccount={handleCardClick}
            onOpenChange={setIsSearchOpen}
            open
          />
        )}
      </div>
    </div>
  );
}

export default Navbar;
