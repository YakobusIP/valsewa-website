"use client";

import Image from "next/image";
import Link from "next/link";

import CancelBookingButton from "./bookings/CancelBookingButton";

type Props = {
  onBack?: () => Promise<void>;
  isLoading?: boolean;
};

const NavbarMobile = ({ onBack, isLoading = false }: Props) => {
  return (
    <div
      className={`fixed top-0 z-50 w-full transition-all duration-300 pt-3 pb-3 
      bg-black shadow-md shadow-black/20
      `}
    >
      <div className="mx-auto max-w-[1920px] h-[64px] flex items-center justify-between px-4 sm:px-6">
        {/* LEFT - Logo*/}
        <Link href="/">
          <figure className="w-[160px] sm:w-[200px]">
            <Image
              src="/header/VALSEWA.png"
              alt="logo"
              height={40}
              width={200}
              className="object-contain"
              priority
            />
          </figure>
        </Link>
        {/* RIGHT - Back Button */}
        {!onBack ? (
          <Link
            href="/"
            className="group flex items-center justify-center gap-3 px-5 py-2 bg-neutral-300/60  backdrop-blur-sm border border-white/20 rounded-lg "
          >
            {/* Solid Left Triangle Custom SVG for precise look */}
            <svg
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=""
            >
              <path d="M0 6L9.75 11.6292L9.75 0.370835L0 6Z" fill="white" />
            </svg>

            <span className="font-semibold text-[0.7rem] sm:text-sm text-white uppercase tracking-wider">
              ALL ACCOUNTS
            </span>
          </Link>
        ) : (
          <CancelBookingButton
            cancelBooking={onBack}
            isLoadingCancelBooking={isLoading}
          />
        )}

      </div>
    </div>
  );
};

export default NavbarMobile;
