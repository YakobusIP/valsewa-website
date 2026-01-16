"use client";

import { useRef, useState } from "react";

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

// Mobile SVG Notch Shape Component (for screens below xl)
// The notch covers ~1/3 of the width for the VALSEWA button
function HeroNotchShapeMobile() {
  // ViewBox: 400 wide x 600 tall (mobile proportions)
  // Notch: ~130px wide (1/3 of width), 65px tall, at top-left
  // This covers the VALSEWA button in the brand switcher
  const notchPath = `
    M 12 600
    Q 0 600 0 588
    L 0 12
    Q 0 0 12 0
    L 118 0
    Q 130 0 130 12
    L 130 43
    Q 130 65 142 65
    L 388 65
    Q 400 65 400 67
    L 400 588
    Q 400 600 388 600
    Z
  `;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none xl:hidden pt-16"
      viewBox="0 0 400 600"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient
          id="heroGradientMobile"
          cx="0%"
          cy="50%"
          r="100%"
          fx="0%"
          fy="50%"
        >
          <stop offset="0%" stopColor="#210004" />
          <stop offset="70%" stopColor="#000000" />
        </radialGradient>
      </defs>

      {/* Background fill */}
      <path d={notchPath} fill="url(#heroGradientMobile)" />

      {/* Border stroke */}
      <path
        d={notchPath}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

// Mobile Brand Switcher Component - Full width with equal buttons
function MobileBrandSwitcher({
  activeBrand,
  setActiveBrand
}: {
  activeBrand: "valsewa" | "valjubel" | "valjoki";
  setActiveBrand: (brand: "valsewa" | "valjubel" | "valjoki") => void;
}) {
  const baseButtonClass =
    "flex-1 flex items-center justify-center py-3 rounded-md transition";
  const activeClass = "bg-[#C70515]";
  const inactiveClass = "bg-white/10 hover:bg-white/20";

  return (
    <div className="flex items-stretch w-full pt-[4.5rem] gap-6 px-2">
      {/* VALSEWA - sits in the notch area */}
      <button
        className={`${baseButtonClass} ${
          activeBrand === "valsewa" ? activeClass : inactiveClass
        }`}
        onClick={() => setActiveBrand("valsewa")}
      >
        <Image
          src="/header/VALSEWA.png"
          alt="VALSEWA"
          width={200}
          height={70}
          className="object-contain w-[70px] sm:w-[90px] h-auto"
        />
      </button>

      {/* VALJUBEL */}
      <button
        className={`${baseButtonClass} ${
          activeBrand === "valjubel" ? activeClass : inactiveClass
        }`}
        onClick={() => setActiveBrand("valjubel")}
      >
        <Image
          src="/header/VALJUBEL.png"
          alt="VALJUBEL"
          width={200}
          height={70}
          className="object-contain w-[70px] sm:w-[90px] h-auto"
        />
      </button>

      {/* VALJOKI */}
      <button
        className={`${baseButtonClass} ${
          activeBrand === "valjoki" ? activeClass : inactiveClass
        }`}
        onClick={() => setActiveBrand("valjoki")}
      >
        <Image
          src="/header/VALJOKI.png"
          alt="VALJOKI"
          width={200}
          height={70}
          className="object-contain w-[70px] sm:w-[90px] h-auto"
        />
      </button>
    </div>
  );
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

function HeroTextBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative z-20 flex flex-col justify-center pt-16 sm:pt-20 xl:pt-0 px-4 sm:px-6 xl:px-8 ${className}`}
    >
      {/* Logo - Desktop only */}
      <div className="hidden xl:flex items-center gap-3 mb-4">
        <Image
          src="/header/VALSEWA.png"
          alt="VALSEWA"
          width={200}
          height={70}
          className="object-contain"
        />
      </div>

      {/* Headline */}
      <h1 className="text-white text-4xl md:text-6xl xl:text-4xl font-extrabold leading-tight font-antonio">
        WORLD&apos;S #1 <br />
        <span className="text-white text-5xl md:text-8xl xl:text-8xl font-extrabold leading-tight font-antonio">
          VALORANT ACCOUNT
        </span>{" "}
        <br />
        <span className="text-white text-5xl md:text-8xl xl:text-8xl font-extrabold leading-tight font-antonio">
          RENTAL SITE
        </span>
      </h1>

      {/* MOBILE: Powered By */}
      <div className="xl:hidden flex items-center gap-2 mt-4">
        <span className="text-[#F9FAFB] text-xl font-semibold tracking-wider font-antonio">
          POWERED BY
        </span>
        <Image
          src="/header/Logo Header Valforum.png"
          alt="VALFORUM"
          width={100}
          height={24}
          className="object-contain w-[80px] sm:w-[100px] h-auto"
        />
      </div>
    </div>
  );
}

function HeroAgentLayer() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ clipPath: "inset(-50% 0 0 0)" }}
    >
      <div className="absolute left-[10%] sm:left-[20%] xl:left-1/2 top-[110%] sm:top-[95%] md:top-[80%] xl:top-[100%] xl:-translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] md:w-[1000px] xl:w-[880px] select-none opacity-100">
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
  );
}

export default function Hero({ initialCarousel }: HeroProps) {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const [activeBrand, setActiveBrand] = useState<
    "valsewa" | "valjubel" | "valjoki"
  >("valsewa");

  return (
    <section className="relative w-full">
      {/* Hero container with notch */}
      <div className="relative w-full min-h-[550px] md:min-h-[620px] overflow-x-hidden overflow-y-hidden xl:overflow-visible">
        {/* Desktop: SVG Notch Shape with fill and border */}
        <HeroNotchShape />

        {/* Mobile/Tablet: SVG Notch Shape */}
        <HeroNotchShapeMobile />

        {/* MOBILE: Brand Switcher - absolutely positioned at top to align with notch */}
        <div className="xl:hidden absolute top-0 left-0 right-0 z-20">
          <MobileBrandSwitcher
            activeBrand={activeBrand}
            setActiveBrand={setActiveBrand}
          />
        </div>

        {/* MOBILE: Hero carousel (includes hardcoded design as slide 1) */}
        <div className="relative z-10 xl:hidden pt-16">
          <div className="w-full pt-12">
            <div className="w-full rounded-lg overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
              <Carousel
                className="w-full"
                plugins={[autoplay.current]}
                opts={{ loop: true }}
              >
                <CarouselContent>
                  <CarouselItem>
                    <AspectRatio ratio={4 / 5}>
                      <div className="relative w-full h-full">
                        <HeroTextBlock className="w-full" />
                        <HeroAgentLayer />
                      </div>
                    </AspectRatio>
                  </CarouselItem>
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

        {/* Content layer - positioned inside the main area (below notch on desktop) */}
        <div className="relative z-10 hidden xl:flex flex-col xl:flex-row h-full max-w-[1920px] mx-auto xl:items-center justify-between xl:px-12 large:px-0 min-h-[550px] md:min-h-[620px] pt-16 xl:pt-20">
          <HeroAgentLayer />
          <HeroTextBlock className="w-full xl:w-[55%]" />

          {/* RIGHT – CAROUSEL (Desktop only) */}
          <div className="relative w-full xl:w-[30%] hidden xl:flex justify-end aspect-[4/5] h-full">
            <div className="w-full rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
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
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#C70515] pointer-events-none rounded-2xl xl:rounded-none xl:mx-12 large:mx-0 mt-16" />
      </div>
    </section>
  );
}
