"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth";

import Image from "next/image";
import Link from "next/link";

import LoginPage from "./LoginPage";
import SearchPage from "./SearchPage";
import { ListPlus, MoreHorizontal, User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useActiveBooking } from "@/hooks/useActiveBooking";
import { calculateDaysRented, calculateTimeRemaining } from "@/lib/utils";

const NavbarHomeMobile = () => {
  const [isComponentOpen, setIsComponentOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLoginClick = () => {
    setIsComponentOpen(true); // open login modal
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };
  const { isAuthenticated, username, customerId } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { booking } = useActiveBooking(customerId?.toString() ?? "");

  const bookingReserved = booking?.find((i) => i.status == "RESERVED" && (i.endAt?.getTime() ?? Date.now()) > Date.now());
  const accountCode = bookingReserved?.account.accountCode;
  const rentedDays = calculateDaysRented(bookingReserved?.startAt ?? null, bookingReserved?.endAt ?? null);
  const remainingTime = calculateTimeRemaining(bookingReserved?.endAt ?? null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 z-50 w-full transition-all duration-300 pt-3 pb-3 ${isScrolled ? "bg-black shadow-md shadow-black/20" : "bg-transparent"
        }`}
    >
      <div className="mx-auto max-w-[1920px] h-[64px] flex items-center px-3 sm:px-6 lg:px-12">
        {/* LEFT */}
        <div className="flex items-center flex-1">
          <button onClick={handleSearchClick}>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 transition">
              <Image
                src="/header/Frame.svg"
                alt="Search"
                width={18}
                height={18}
              />
            </div>
          </button>
        </div>

        {/* CENTER */}
        <div className="flex items-center justify-center flex-1">
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

        {/* RIGHT */}
        <div className="flex items-center justify-end gap-2 flex-1">
          {/* TOP UP */}
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

          {/* SIGN IN */}
          {!isAuthenticated && (
            <button
              onClick={handleLoginClick}
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
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  onMouseEnter={() => setIsOpen(true)}
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
                  {/* User Info */}
                  <div className="flex items-center gap-3 cursor-default">
                    <User className="w-5 h-5" />
                    <span className="font-semibold text-l">{username}</span>
                  </div>

                  {/* Ongoing Order */}
                  {bookingReserved && <div className="space-y-2 cursor-default">
                    <div className="flex items-center gap-3">
                      <ListPlus className="w-4 h-4" />
                      <span className="font-semibold text-sm">On Going Order</span>
                    </div>

                    {/* Order Details */}
                    <div className="space-y-1 cursor-default px-8">
                      <div className="text-xs font-medium text-white/70">
                        {accountCode} (Rented {rentedDays} days)
                      </div>
                      <div className="text-xs font-medium text-white/70">
                        {remainingTime} left
                      </div>
                    </div>
                  </div>}

                  {/* See More */}
                  <Link href="/dashboard" className="flex items-center gap-3 w-full rounded-lg transition" onClick={() => setIsOpen(false)}>
                    <MoreHorizontal className="w-4 h-4" />
                    <span className="font-semibold text-sm">See More</span>
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* LOGIN POPUP */}
        {isComponentOpen && (
          <LoginPage onClose={() => setIsComponentOpen(false)} />
        )}

        {isSearchOpen && <SearchPage onClose={() => setIsSearchOpen(false)} />}
      </div>
    </div>
  );
};

export default NavbarHomeMobile;
