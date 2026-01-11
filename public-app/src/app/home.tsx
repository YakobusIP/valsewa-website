"use client";

import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Navbar1 from "@/components/Navbar1";
import SearchBar from "@/components/SearchBar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

import { AccountEntity, CarouselSlide } from "@/types/account.type";

import { useAccountController } from "@/controllers/useAccountController";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { FaArrowUp } from "react-icons/fa";
import NavbarHome from "@/components/NavbarHome";
import { useEffect, useState, useRef } from "react";
// import Navbar3 from "@/components/Navbar3";
// import Hero from "@/components/Hero";

interface Props {
  initialAccount: AccountEntity[];
  initialCarousel: CarouselSlide[];
}
export default function Home({ initialAccount, initialCarousel }: Props) {
  const {
    accountList,
    setSearchAccount,
    sortAccount,
    sortDirection,
    changeDirection,
    getSortLabel
  } = useAccountController(initialAccount);

  const [api, setApi] = useState<CarouselApi>();

  const scrollToTop = () => {
    window.scrollTo({ top: 300, behavior: "smooth" });
  };
  const autoplay = useRef(
    Autoplay({
      delay: () => initialCarousel.map((slide) => slide.duration * 1000),
      stopOnInteraction: false
    })
  ).current;
  return (
    <section className="bg-[#101822] md:pb-64 pb-32 relative ">
      <div className="relative w-full max-w-[1920px] h-auto min-h-[720px] rounded-2xl bg-[radial-gradient(circle_at_left,#210004_0%,#000_50%)] border border-white/10 shadow-2xl overflow-hidden px-4 sm:px-6 lg:px-12 py-8">

        {/* <Navbar3 />
        <Hero /> */}

      </div>
      <div className="relative max-lg:hidden">
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
        <div className="relative w-full h-screen flex flex-col">
          {/* Hero Background with Breakpoints */}
          <div className="absolute inset-0 w-full h-full">
            {/* 2XL Screens */}
            <figure className="absolute w-full h-full max-2xl:hidden">
              <Image
                src="/NewHero/SVG/Picture for Hero_VS_Hero_1280x560px.svg"
                fill
                alt="Hero"
                className="object-cover object-center"
              />
            </figure>

            {/* XL and Large Screens */}
            <figure className="absolute w-full h-full max-lg:hidden 2xl:hidden">
              <Image
                src="/NewHero/SVG/Picture for Hero_VS_Hero_1280x720px.svg"
                fill
                alt="Hero"
                className="object-cover object-center"
              />
            </figure>

            {/* Medium Screens */}
            <figure className="absolute w-full h-full max-md:hidden lg:hidden">
              <Image
                src="/NewHero/SVG/Picture for Hero_VS_Hero_1280x800px.svg"
                fill
                alt="Hero"
                className="object-cover object-center"
              />
            </figure>

            {/* Small Screens */}
            <figure className="absolute w-full h-full">
              <Image
                src="/NewHero/SVG/Picture for Hero_VS_Hero_1280x1200px.svg"
                fill
                alt="Hero"
                className="object-cover object-center"
              />
            </figure>

            {/* Extra Small Screens */}
            <figure className="absolute w-full h-full sm:hidden">
              <Image
                src="/NewHero/SVG/Picture for Hero_VS_Hero_1280x1760px.svg"
                fill
                alt="Hero"
                className="object-cover object-center"
              />
            </figure>

            {/* Dark Overlay for better readability */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Content Section */}
          <div className="relative z-20 flex flex-col items-center justify-center flex-grow -translate-y-[50px]">
            {/* Carousel */}
            <div className="w-full md:px-14 px-7">
              <Carousel
                setApi={setApi}
                className="shadow-lg rounded-2xl overflow-hidden"
                plugins={[autoplay]}
                opts={{ loop: true }}
              >
                <CarouselContent>
                  {initialCarousel?.map((slide, index) => (
                    <CarouselItem key={index}>
                      <div className="h-full w-full relative max-lg:hidden">
                        <AspectRatio ratio={12 / 3}>
                          {slide.image123.type === "VIDEO" ? (
                            <video
                              src={slide.image123.imageUrl}
                              className="object-cover rounded-2xl w-full h-full"
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          ) : (
                            <Image
                              loading="lazy"
                              src={slide.image123.imageUrl}
                              alt="Carousel Image"
                              fill
                              className="object-cover rounded-2xl"
                              unoptimized
                            />
                          )}
                        </AspectRatio>
                      </div>
                      <div className="h-full w-full relative max-sm:hidden lg:hidden">
                        <AspectRatio ratio={12 / 6}>
                          {slide.image126.type === "VIDEO" ? (
                            <video
                              src={slide.image126.imageUrl}
                              className="object-cover rounded-2xl w-full h-full"
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          ) : (
                            <Image
                              loading="lazy"
                              src={slide.image126.imageUrl}
                              alt="Carousel Image"
                              fill
                              className="object-cover rounded-2xl"
                              unoptimized
                            />
                          )}
                        </AspectRatio>
                      </div>
                      <div className="h-full w-full relative sm:hidden">
                        <AspectRatio ratio={12 / 9}>
                          {slide.image129.type === "VIDEO" ? (
                            <video
                              src={slide.image129.imageUrl}
                              className="object-cover rounded-2xl w-full h-full"
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          ) : (
                            <Image
                              loading="lazy"
                              src={slide.image129.imageUrl}
                              alt="Carousel Image"
                              fill
                              className="object-cover rounded-2xl"
                              unoptimized
                            />
                          )}
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
