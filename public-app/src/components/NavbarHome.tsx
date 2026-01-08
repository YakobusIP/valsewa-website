"use client";

import { Goldman } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LoginPage from "./LoginPage";
import { useAuth } from "@/hooks/useAuth";

const goldman = Goldman({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap"
});

const Navbar = () => {
  const [isComponentOpen, setIsComponentOpen] = useState(false);

  const handleLoginClick = () => {
    setIsComponentOpen(true); // open login modal
  };
  const { isAuthenticated, username } = useAuth();

  return (
    <div className="fixed top-0 z-50 w-full bg-[#000000] shadow-md shadow-black/5">
      <div className="mx-auto max-w-[1920px] h-[84px] md:h-[80px] flex items-center justify-between px-5 md:px-14">
        <div className="flex items-center gap-16">
          <div className="relative md:pl-14">
            <figure className="relative top-0 lg:max-w-[130px] sm:max-w-[130px] max-w-[130px] left-5">
              <Image
                src="/header/Logo Header Valforum.png"
                alt="logo"
                height={50}
                width={130}
                className="object-contain"
              />
            </figure>
          </div>
          {/* BRAND SWITCHER */}
          <div className="relative ml-6">
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-gradient-to-r from-[#5a5a5a] to-[#2f2f2f] border border-white/20 shadow-inner">

              {/* ACTIVE - VALSEWA */}
              <div className="flex items-center justify-center px-6 py-2 rounded-xl shadow-md cursor-pointer">
                <Image
                  src="/header/VALSEWA.png"
                  alt="VALSEWA"
                  width={130}
                  height={28}
                  className="object-contain"
                />
              </div>

              {/* VALJUBEL */}
              <div className="flex items-center justify-center px-6 py-2 rounded-xl hover:bg-white/10 transition cursor-pointer">
                <Image
                  src="/header/VALJUBEL.png"
                  alt="VALJUBEL"
                  width={130}
                  height={28}
                  className="object-contain"
                />
              </div>

              {/* VALJOKI */}
              <div className="flex items-center justify-center px-6 py-2 rounded-xl hover:bg-white/10 transition cursor-pointer">
                <Image
                  src="/header/VALJOKI.png"
                  alt="VALJOKI"
                  width={130}
                  height={28}
                  className="object-contain"
                />
              </div>

            </div>
          </div>

          
        </div>
        {/* NAV RIGHT SIDE */}
        <div className="md:pr-14 pr-7 flex items-center gap-4">

          {/* SEARCH */}
          <Link href="https://valforum.com/top-up">
            <div className="flex items-center justify-center border border-white/30 rounded-xl w-10 h-10 hover:border-white transition">
              <Image src="/header/Search Icon.svg" alt="Search" width={16} height={16} />
            </div>
          </Link>

          {/* TOP UP */}
          <Link href="https://valforum.com/top-up">
            <div className="flex items-center gap-2 px-4 py-2 border border-white/30 rounded-xl hover:border-white transition cursor-pointer">
              <Image src="/header/Diamond.svg" alt="Top Up" width={18} height={18} />
              <span className={`text-white text-sm font-bold ${goldman.className}`}>Top Up</span>
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
              <span className="text-black text-sm font-semibold">Login/Sign Up</span>
            </button>
          )}


          {isAuthenticated && (
            <div className="flex items-center gap-2 px-4 py-2 border border-white/30 rounded-xl bg-[#C70515] hover:bg-[#a90411] transition">
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
