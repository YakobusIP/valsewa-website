"use client";

import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";

import Image from "next/image";
import Link from "next/link";

import LoginPage from "./LoginPage";

const Navbar = () => {
  const [isComponentOpen, setIsComponentOpen] = useState(false);

  const handleLoginClick = () => {
    setIsComponentOpen(true); // open login modal
  };
  const { isAuthChecked, username } = useAuth();

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
          <Link href="https://valforum.com/top-up">
            <div className="flex items-center justify-center border border-white/30 rounded-xl w-10 h-10 hover:border-white transition">
              <Image
                src="/header/Search Icon.svg"
                alt="Search"
                width={16}
                height={16}
              />
            </div>
          </Link>

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
          {!isAuthChecked && (
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

          {isAuthChecked && (
            <div className="flex items-center px-4 py-2 border border-white/30 rounded-xl bg-[#C70515] hover:bg-[#a90411] transition">
              <Image
                src="/header/SignUp Icon.svg"
                alt="User"
                width={18}
                height={18}
              />
              <span className="text-white text-sm font-semibold">
                {username}
              </span>
            </div>
          )}
        </div>

        {/* LOGIN POPUP */}
        {isComponentOpen && (
          <LoginPage onClose={() => setIsComponentOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
