"use client";

import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

import { AccountEntity } from "@/types/account.type";

import { useAccountController } from "@/controllers/useAccountController";
import Image from "next/image";
import { FaArrowUp } from "react-icons/fa";

interface Props {
  initialAccount: AccountEntity[];
}
export default function Home({ initialAccount }: Props) {
  const {
    accountList,
    setSearchAccount,
    sortAccount,
    sortDirection,
    changeDirection,
    getSortLabel
  } = useAccountController(initialAccount);

  const images = ["/hero/Hero1.png", "/hero/Hero2.png", "/hero/Hero3.png"];

  const scrollToTop = () => {
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <section className="bg-[#101822] md:pb-64 pb-32 relative ">
      <div className="relative ">
        <Navbar />
      </div>
      <a
        href="https://wa.me/6285175343447?text=Halo admin VALSEWA aku mau SEWA akun nih"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50"
      >
        <figure className="w-[80px] h-[80px] fixed bottom-4 right-4 z-50">
          <Image src="/home/penanda.svg" fill alt="Iconic" />
        </figure>
      </a>
      <div
        className="fixed bottom-4 left-4 z-50 cursor-pointer text-[#DDDDDD] bg-[#A6A6A6B2] p-3 rounded-full"
        onClick={scrollToTop}
      >
        <FaArrowUp size={30} />
      </div>
      <div>
        <div className="relative w-full h-screen flex flex-col">
          {/* Hero Background with Breakpoints */}
          <div className="absolute inset-0 w-full h-full">
            {/* 2XL Screens */}
            <figure className="absolute w-full h-full max-2xl:hidden">
              <Image
                src="/hero/Hero9.png"
                fill
                alt="Hero"
                className="object-cover object-top"
              />
            </figure>

            {/* XL and Large Screens */}
            <figure className="absolute w-full h-full max-lg:hidden 2xl:hidden">
              <Image
                src="/hero/Hero9.png"
                fill
                alt="Hero"
                className="object-cover object-top"
              />
            </figure>

            {/* Medium Screens */}
            <figure className="absolute w-full h-full max-md:hidden lg:hidden">
              <Image
                src="/hero/Hero9.png"
                fill
                alt="Hero"
                className="object-cover object-top"
              />
            </figure>

            {/* Small Screens */}
            <figure className="absolute w-full h-full">
              <Image
                src="/hero/Hero9.png"
                fill
                alt="Hero"
                className="object-cover object-top"
              />
            </figure>

            {/* Extra Small Screens */}
            <figure className="absolute w-full h-full sm:hidden">
              <Image
                src="/hero/Hero9.png"
                fill
                alt="Hero"
                className="object-cover object-top"
              />
            </figure>

            {/* Dark Overlay for better readability */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Content Section */}
          <div className="relative z-20 flex flex-col items-center justify-center flex-grow -translate-y-[50px]">
            {/* Carousel */}
            <div className="w-full md:px-14 px-7">
              <Carousel className="shadow-lg rounded-2xl overflow-hidden">
                <CarouselContent>
                  {images?.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="h-full w-full relative max-md:hidden">
                        <AspectRatio ratio={12 / 3}>
                          <Image
                            src={image}
                            alt="Carousel Image"
                            fill
                            className="object-cover rounded-2xl"
                            unoptimized
                          />
                        </AspectRatio>
                      </div>
                      <div className="h-full w-full relative max-sm:hidden md:hidden">
                        <AspectRatio ratio={12 / 6}>
                          <Image
                            src={image}
                            alt="Carousel Image"
                            fill
                            className="object-cover rounded-2xl"
                            unoptimized
                          />
                        </AspectRatio>
                      </div>
                      <div className="h-full w-full relative sm:hidden">
                        <AspectRatio ratio={12 / 9}>
                          <Image
                            src={image}
                            alt="Carousel Image"
                            fill
                            className="object-cover rounded-2xl"
                            unoptimized
                          />
                        </AspectRatio>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30" />
              </Carousel>
            </div>
          </div>

          {/* Search Bar Fixed at Bottom */}
          <div className="absolute bottom-[-70px] w-full flex justify-center z-30 pb-4">
            <div className="w-full">
              <SearchBar
                accountList={accountList || []}
                setSearchAccount={setSearchAccount}
                changeDirection={changeDirection}
                getSortLabel={getSortLabel}
                sortAccount={sortAccount}
                sortDirection={sortDirection}
              />
            </div>
          </div>
        </div>

        <div className="lg:mx-14 sm:mx-7 mx-2 pt-10 ">
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
