"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth";

import Image from "next/image";
import Link from "next/link";

import LoginPage from "./LoginPage";

const NavbarHomeMobile = () => {
  const [isComponentOpen, setIsComponentOpen] = useState(false);

  const handleLoginClick = () => {
    setIsComponentOpen(true); // open login modal
  };
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 z-50 w-full transition-all duration-300 pt-3 pb-3 ${
        isScrolled ? "bg-black shadow-md shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1920px] h-[64px] flex items-center px-3 sm:px-6 lg:px-12">
        {/* LEFT */}
        <div className="flex items-center flex-1">
          <Link href="#">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 transition">
              <Image
                src="/header/Frame.svg"
                alt="Search"
                width={18}
                height={18}
              />
            </div>
          </Link>
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
            <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#C70515] hover:bg-[#a90411] transition">
              <Image
                src="/header/SignUp Icon.svg"
                alt="User"
                width={18}
                height={18}
              />
            </button>
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

export default NavbarHomeMobile;
