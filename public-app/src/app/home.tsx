"use client";


import DiscoverSection from "@/components/DiscoverSection";
import Card from "@/components/Card";
import Navbar1 from "@/components/Navbar1";

import { AccountEntity, CarouselSlide } from "@/types/account.type";

import { useAccountController } from "@/controllers/useAccountController";
import Image from "next/image";
import { FaArrowUp } from "react-icons/fa";
import NavbarHome from "@/components/NavbarHome";
import Hero from "@/components/Hero";
// import Navbar3 from "@/components/Navbar3";
// import Hero from "@/components/Hero";

interface Props {
  initialAccount: AccountEntity[];
  initialCarousel: CarouselSlide[];
}
export default function Home({ initialAccount, initialCarousel }: Props) {
  const {
    accountList,
  } = useAccountController(initialAccount);

  const scrollToTop = () => {
    window.scrollTo({ top: 300, behavior: "smooth" });
  };
  return (
    <section className="bg-[#0F0F0F] md:pb-64 pb-32 relative ">
      <div className="relative w-full max-w-[1920px] h-auto min-h-[720px] rounded-2xl bg-[#0F0F0F] overflow-hidden px-4 sm:px-6 lg:px-12 py-8">

        <Hero initialCarousel={initialCarousel} />

      </div>
      <div className="relative max-lg:hidden pt-4">
        <NavbarHome />
      </div>
      <div className="lg:hidden">
        <Navbar1 />
      </div>
      <a
        href="https://wa.me/6285175343447?text=Halo admin VALSEWA aku butuh bantuan dong"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50"
      >
        <figure className="w-[120px] h-[120px] fixed bottom-4 right-4 z-50">
          <Image src="/home/kananbawah.png" fill alt="Iconic" />
        </figure>
      </a>
      <div
        className="fixed bottom-4 left-4 z-50 cursor-pointer text-[#DDDDDD] bg-[#A6A6A6B2] p-3 rounded-full"
        onClick={scrollToTop}
      >
        <FaArrowUp size={30} />
      </div>
      <div>

        <div className="lg:mx-14 sm:mx-7 mx-2 pt-10 ">

          <div className="mt-20">
            <DiscoverSection />
          </div>
          {accountList.length > 0 ? (
            <div className="mt-9 mx-0 pt-10">
              <Card data={accountList} />
            </div>
          ) : (
            <div className=" mt-48">
              <div className="flex items-center ps-3 pointer-events-none justify-center">
                <svg
                  className="w-16 h-16 text-roseWhite font-bold  dark:text-gray-400 p-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <p className="text-roseWhite text-3xl font-semibold text-center">
                Mohon maaf Akun tidak ditemukan
              </p>
              <p className="text-roseWhite text-xl font-normal text-center max-w-[300px] mx-auto">
                Coba lakukan pencarian untuk skin / preferensi yang lain
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
