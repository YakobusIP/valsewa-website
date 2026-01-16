"use client";

import { useRef } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

import { CarouselSlide } from "@/types/account.type";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

interface HeroProps {
  initialCarousel: CarouselSlide[];
}

// SVG Notch Shape Component for the Hero container
// The shape has a notch at top-left that extends upward for the Valforum logo
function HeroNotchShape() {
  // ViewBox: 1920 wide x 690 tall
  // Notch: ~220px wide, 75px tall, at top-left extending from y=0 to y=75
  // Main container: from y=75 to y=690, full width with rounded corners
  // Path traced clockwise starting from bottom-left
  const notchPath = `
    M 16 690
    Q 0 690 0 674
    L 0 16
    Q 0 0 16 0
    L 200 0
    Q 216 0 216 16
    L 216 54
    Q 216 75 232 75
    L 1904 75
    Q 1920 75 1920 86
    L 1920 674
    Q 1920 690 1904 690
    Z
  `;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none hidden xl:block sm:px-6 xl:px-12 large:px-0"
      viewBox="0 0 1920 690"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradient definition for the background */}
      <defs>
        <radialGradient
          id="heroGradient"
          cx="0%"
          cy="50%"
          r="80%"
          fx="0%"
          fy="50%"
        >
          <stop offset="0%" stopColor="#210004" />
          <stop offset="60%" stopColor="#000000" />
        </radialGradient>
      </defs>

      {/* Background fill */}
      <path d={notchPath} fill="url(#heroGradient)" />

      {/* Border stroke */}
      <path
        d={notchPath}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

export default function Hero({ initialCarousel }: HeroProps) {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  return (
    <section className="relative w-full">
      {/* Hero container with notch */}
      <div className="relative w-full min-h-[550px] md:min-h-[620px] overflow-visible">
        {/* Desktop: SVG Notch Shape with fill and border */}
        <HeroNotchShape />

        {/* Mobile/Tablet: simple rounded container */}
        <div className="xl:hidden absolute inset-0 bg-[radial-gradient(circle_at_left,#210004_0%,#000_60%)] rounded-2xl border border-white/10" />

        {/* Content layer - positioned inside the main area (below notch on desktop) */}
        <div className="relative z-10 flex h-full max-w-[1920px] mx-auto items-center justify-between px-6 xl:px-12 large:px-0 min-h-[550px] md:min-h-[620px] xl:pt-20">
          {/* LEFT – TEXT + AGENT */}
          <div className="relative z-20 flex flex-col justify-center w-full xl:w-[55%] pt-8 xl:pt-0 sm:px-4 xl:px-8">
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
            <h1 className="text-white text-xl sm:text-3xl md:text-5xl xl:text-4xl font-extrabold leading-tight font-antonio">
              WORLD&apos;S #1 <br />
              <span className="text-white text-2xl sm:text-4xl md:text-6xl xl:text-8xl font-extrabold leading-tight font-antonio">
                VALORANT ACCOUNT
              </span>{" "}
              <br />
              <span className="text-white text-2xl sm:text-4xl md:text-6xl xl:text-8xl font-extrabold leading-tight font-antonio">
                RENTAL SITE
              </span>
            </h1>
          </div>

          {/* Agent image wrapper - allows overflow at top, clips at bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ clipPath: "inset(-50% 0 0 0)" }}
          >
            <div className="absolute left-1/2 top-[95%] sm:top-[95%] xl:top-[100%] -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[600px] md:w-[780px] xl:w-[880px] select-none opacity-50 xl:opacity-100">
              <Image
                src="/NewHero/Agent Neon.png"
                alt="Neon Agent"
                width={900}
                height={900}
                className="object-top drop-shadow-[0_0_40px_rgba(0,200,255,0.35)]"
                priority
              />
            </div>
          </div>

          {/* RIGHT – CAROUSEL */}
          <div className="relative w-full xl:w-[30%] hidden xl:flex justify-end aspect-[4/5] h-full">
            <div className="w-full max-w-[380px] rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
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

        {/* Red Glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-transparent pointer-events-none rounded-2xl xl:rounded-none sm:mx-6 xl:mx-12 large:mx-0" />
      </div>
    </section>
  );
}
