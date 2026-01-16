"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Autoplay from "embla-carousel-autoplay";
import { CarouselSlide } from "@/types/account.type";
import { useRef } from "react";

interface HeroProps {
  initialCarousel: CarouselSlide[];
}

export default function Hero({ initialCarousel }: HeroProps) {
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  return (
    <section className="relative w-full top-20 mb-20">
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-12">
        <div className="relative w-full min-h-[500px] md:min-h-[600px] rounded-2xl overflow-hidden bg-[radial-gradient(circle_at_left,#210004_0%,#000_50%)] border border-white/10 shadow-2xl">

          <div className="relative z-10 flex h-full w-full items-center justify-between py-10 px-5">

            {/* LEFT – TEXT + AGENT */}
            <div className="relative z-20 flex flex-col justify-center w-full lg:w-[50%] pt-8 lg:pt-0">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/header/VALSEWA.png"
                  alt="VALSEWA"
                  width={200}
                  height={70}
                  className="object-contain"
                />
              </div>

              {/* Headline */}
              <h1 className="text-white text-xl sm:text-3xl md:text-5xl lg:text-4xl font-extrabold leading-tight font-antonio">
                WORLD’S #1 <br />
                <span className="text-white text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight font-antonio">VALORANT ACCOUNT</span> <br />
                <span className="text-white text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight font-antonio">RENTAL SITE</span>
              </h1>



            </div>
            <div className="absolute left-1/2 top-[60%] sm:top-[200%] lg:top-[150%] -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[600px] md:w-[780px] lg:w-[880px] pointer-events-none select-none opacity-50 lg:opacity-100">
              <Image
                src="/NewHero/Agent Neon.png"
                alt="Neon Agent"
                width={900}
                height={900}
                className="object-top drop-shadow-[0_0_40px_rgba(0,200,255,0.35)]"
                priority
              />
            </div>


            {/* RIGHT – CAROUSEL */}
            <div className="relative w-full lg:w-[25%] flex justify-center lg:justify-end mt-8 lg:mt-0 hidden lg:flex">
              <div className="w-full max-w-[520px] rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
                <Carousel
                  className="w-full"
                  plugins={[autoplay.current]}
                  opts={{ loop: true }}
                >
                  <CarouselContent>
                    {initialCarousel?.map((item, index) => (
                      <CarouselItem key={index}>
                        <AspectRatio ratio={4 / 5}>
                          <Image
                            src={item.image123.imageUrl}
                            alt="Featured Account"
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </AspectRatio>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious className="left-2 bg-black/60 text-white hover:bg-black" />
                  <CarouselNext className="right-2 bg-black/60 text-white hover:bg-black" />
                </Carousel>
              </div>
            </div>

          </div>

          {/* Red Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-700/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
