"use client";

import { RefObject } from "react";

import HeroNotchCutoutMask from "@/components/hero/HeroNotchCutoutMask";
import MobileBrandSwitcher from "@/components/hero/MobileBranchSwitcher";
import {
  MOBILE_NOTCH_VIEWBOX,
  getMobileNotchPath
} from "@/components/hero/mobile-notch-paths";

import type { BrandSlug } from "@/lib/brand";

import Image from "next/image";

interface CatalogueHeroProps {
  activeBrand: BrandSlug;
  setActiveBrand: (brand: BrandSlug) => void;
  sentinelRef: RefObject<HTMLDivElement | null>;
}

const OUTER_BG = "#000000";

export function CatalogueHero({
  activeBrand,
  setActiveBrand,
  sentinelRef
}: CatalogueHeroProps) {
  const mobilePath = getMobileNotchPath(activeBrand);
  const { width: viewWidth, height: viewHeight } = MOBILE_NOTCH_VIEWBOX;

  return (
    <section className="relative h-[600px] md:h-screen bg-black">
      <div className="relative h-full w-full px-4 md:px-5 lg:px-8">
        <div className="relative mx-auto h-full w-full max-w-[1920px]">
          {/* ── Hero image + gradient + notch masks (clipped layer) ─────────── */}
          <div className="absolute top-[68px] md:top-[18px] inset-x-0 bottom-0 overflow-hidden pointer-events-none">
            <Image
              src="/hero-catalogue.svg"
              fill
              priority
              alt="Catalogue Hero"
              className="object-cover object-center"
            />

            {/* Desktop / tablet gradient */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-black/100 via-black/60 to-[#C70515]/50 pointer-events-none" />

            {/* Mobile red overlay (over bg image, inside notch body) */}
            <div className="md:hidden absolute inset-0 bg-[#571010]/80 pointer-events-none" />

            <HeroNotchCutoutMask
              className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
              maskId="catalogueDesktopTabletMask"
            />

            {/* Mobile notch mask (<md) — paints OUTER_BG outside the notch body
            so the bg image + red overlay show through inside */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none md:hidden"
              viewBox={`0 0 ${viewWidth} ${viewHeight}`}
              preserveAspectRatio="none"
            >
              <defs>
                <mask id="catalogueMobileMask">
                  <rect width={viewWidth} height={viewHeight} fill="white" />
                  <path d={mobilePath} fill="black" />
                </mask>
              </defs>
              <rect
                width={viewWidth}
                height={viewHeight}
                fill={OUTER_BG}
                mask="url(#catalogueMobileMask)"
              />
              <path
                d={mobilePath}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>

            {/* Centered foreground content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pointer-events-none">
              <Image
                src="/header/VALSEWA.svg"
                alt="VALSEWA"
                width={200}
                height={60}
                className="object-contain mb-6 md:mb-8"
                priority
              />
              <h1 className="font-antonio font-bold uppercase text-white text-4xl md:text-5xl xl:text-6xl leading-tight">
                WIDEST SELECTION
                <br />
                IN THE GAME.
              </h1>
              <p className="font-instrumentSans font-normal text-white text-base md:text-lg mt-4">
                Explore our evergrowing
                <br />
                account catalog
              </p>
            </div>
          </div>

          {/* MOBILE: Brand Switcher - sits in the raised half-width tab */}
          <div className="md:hidden absolute top-[68px] inset-x-0 z-40 h-[calc(65/600*100%)] flex items-center pointer-events-auto">
            <MobileBrandSwitcher
              activeBrand={activeBrand}
              setActiveBrand={setActiveBrand}
            />
          </div>
        </div>
      </div>

      {/* Sentinel for IntersectionObserver */}
      <div
        ref={sentinelRef}
        className="absolute bottom-0 left-0 right-0 h-px"
      />
    </section>
  );
}
