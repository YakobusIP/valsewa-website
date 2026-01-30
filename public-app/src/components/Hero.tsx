"use client";

import { useRef } from "react";

import HeroAgentLayer from "@/components/hero/HeroAgentLayer";
import HeroNotchShape from "@/components/hero/HeroNotchShape";
import HeroNotchShapeMobileLeft from "@/components/hero/HeroNotchShapeMobileLeft";
import HeroNotchShapeMobileMiddle from "@/components/hero/HeroNotchShapeMobileMiddle";
import HeroNotchShapeMobileRight from "@/components/hero/HeroNotchShapeMobileRight";
import HeroNotchShapeTablet from "@/components/hero/HeroNotchShapeTablet";
import HeroTextBlock from "@/components/hero/HeroTextBlock";
import MobileBrandSwitcher from "@/components/hero/MobileBranchSwitcher";
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
  activeBrand: "valsewa" | "valjubel" | "valjoki";
  setActiveBrand: (brand: "valsewa" | "valjubel" | "valjoki") => void;
}

const HERO_SLIDE_DURATION = 5000;

export default function Hero({
  initialCarousel,
  activeBrand,
  setActiveBrand
}: HeroProps) {
  const mobileAutoplay = useRef(
    Autoplay({
      delay: () => [
        HERO_SLIDE_DURATION,
        ...initialCarousel.map((slide) => slide.duration * 1000)
      ],
      stopOnInteraction: false
    })
  ).current;

  const desktopAutoplay = useRef(
    Autoplay({
      delay: () => initialCarousel.map((slide) => slide.duration * 1000),
      stopOnInteraction: false
    })
  ).current;

  return (
    <section className="relative w-full">
      {/* Hero container with notch */}
      <div className="relative w-full min-h-[550px] md:min-h-[300px] lg:min-h-[420px] xl:min-h-[620px] overflow-x-hidden overflow-y-hidden md:overflow-y-visible md:overflow-x-clip">
        {/* Desktop: SVG Notch Shape with fill and border */}
        <HeroNotchShape />

        <HeroNotchShapeTablet />

        {/* Mobile/Tablet: SVG Notch Shape */}
        {activeBrand === "valsewa" ? (
          <HeroNotchShapeMobileLeft />
        ) : activeBrand === "valjubel" ? (
          <HeroNotchShapeMobileMiddle />
        ) : (
          <HeroNotchShapeMobileRight />
        )}

        {/* MOBILE: Brand Switcher - absolutely positioned at top to align with notch */}
        <div className="md:hidden absolute top-0 left-0 right-0 z-20">
          <MobileBrandSwitcher
            activeBrand={activeBrand}
            setActiveBrand={setActiveBrand}
          />
        </div>

        {/* MOBILE: Hero carousel (includes hardcoded design as slide 1) */}
        <div className="relative z-10 md:hidden pt-16">
          <div className="w-full pt-12">
            <div className="w-full rounded-lg overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
              <Carousel
                className="w-full"
                plugins={[mobileAutoplay]}
                opts={{ loop: true }}
              >
                <CarouselContent>
                  <CarouselItem>
                    <AspectRatio ratio={4 / 5}>
                      <div className="relative w-full h-full">
                        <HeroTextBlock
                          className="w-full"
                          activeBrand={activeBrand}
                        />
                        <HeroAgentLayer activeBrand={activeBrand} />
                      </div>
                    </AspectRatio>
                  </CarouselItem>
                  {initialCarousel?.map((slide, index) => (
                    <CarouselItem key={index}>
                      <AspectRatio ratio={4 / 5}>
                        {slide.image.type === "VIDEO" ? (
                          <video
                            src={slide.image.imageUrl}
                            className="object-cover rounded-2xl w-full h-full"
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                        ) : (
                          <Image
                            loading="lazy"
                            src={slide.image.imageUrl}
                            alt="Carousel Image"
                            fill
                            className="object-cover rounded-2xl"
                            unoptimized
                          />
                        )}
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
        <div className="relative z-10 hidden md:flex flex-col md:flex-row h-full md:items-center justify-between min-h-[550px] md:min-h-[300px] lg:min-h-[420px] xl:min-h-[620px] pt-16 lg:pt-20">
          <HeroAgentLayer activeBrand={activeBrand} />
          <HeroTextBlock
            className="w-full md:w-[50%]"
            activeBrand={activeBrand}
          />

          {/* RIGHT – CAROUSEL (Desktop only) */}
          <div className="relative w-full md:w-[30%] hidden md:flex justify-end aspect-[4/5] h-full">
            <div className="w-full rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
              <Carousel
                className="w-full"
                plugins={[desktopAutoplay]}
                opts={{ loop: true }}
              >
                <CarouselContent>
                  {initialCarousel?.map((item, index) => (
                    <CarouselItem key={index}>
                      <AspectRatio ratio={4 / 5}>
                        {item.image.type === "VIDEO" ? (
                          <video
                            src={item.image.imageUrl}
                            className="object-cover rounded-2xl w-full h-full"
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                        ) : (
                          <Image
                            loading="lazy"
                            src={item.image.imageUrl}
                            alt="Carousel Image"
                            fill
                            className="object-cover rounded-2xl"
                            unoptimized
                          />
                        )}
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

        {activeBrand === "valsewa" && (
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#C70515] pointer-events-none rounded-2xl mt-32 md:mt-16" />
        )}
        {activeBrand === "valjoki" && (
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#111111] to-[#FDE047]/70 pointer-events-none rounded-2xl mt-32 md:mt-16" />
        )}
        {activeBrand === "valjubel" && (
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#6D28D9]/15 to-[#A855F7]/70 pointer-events-none rounded-2xl mt-32 md:mt-16" />
        )}
      </div>
    </section>
  );
}
