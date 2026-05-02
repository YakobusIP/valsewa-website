"use client";

import { RefObject } from "react";

import HeroNotchCutoutMask from "@/components/hero/HeroNotchCutoutMask";
import MobileBrandSwitcher from "@/components/hero/MobileBranchSwitcher";

import Image from "next/image";

type BrandType = "valsewa" | "valjubel" | "valjoki";

interface CatalogueHeroProps {
  activeBrand: BrandType;
  setActiveBrand: (brand: BrandType) => void;
  sentinelRef: RefObject<HTMLDivElement | null>;
}

// ── Mobile paths (viewBox 400×600, <md) ──────────────────────────────────────
// Geometry mirrors HeroNotchShapeMobileLeft/Middle/Right so the cutout matches
// the home page chrome, but rendered as a mask so the bg image shows through.

const MOBILE_LEFT_PATH = `
  M 12 600 Q 0 600 0 588
  L 0 12 Q 0 0 12 0
  L 118 0 Q 130 0 130 12
  L 130 43 Q 130 65 142 65
  L 388 65 Q 400 65 400 67
  L 400 588 Q 400 600 388 600 Z
`;

const MOBILE_MIDDLE_PATH = `
  M 16 600 Q 0 600 0 584
  L 0 81 Q 0 65 16 65
  L 135 65
  L 135 16 Q 135 0 151 0
  L 249 0 Q 265 0 265 16
  L 265 65
  L 384 65 Q 400 65 400 81
  L 400 584 Q 400 600 384 600 Z
`;

const MOBILE_RIGHT_PATH = `
  M 12 600 Q 0 600 0 588
  L 0 77 Q 0 65 12 65
  L 268 65
  L 268 12 Q 268 0 280 0
  L 388 0 Q 400 0 400 12
  L 400 588 Q 400 600 388 600 Z
`;

function getMobilePath(brand: BrandType) {
  if (brand === "valjubel") return MOBILE_MIDDLE_PATH;
  if (brand === "valjoki") return MOBILE_RIGHT_PATH;
  return MOBILE_LEFT_PATH;
}

const OUTER_BG = "#000000";

export function CatalogueHero({
  activeBrand,
  setActiveBrand,
  sentinelRef
}: CatalogueHeroProps) {
  const mobilePath = getMobilePath(activeBrand);

  return (
    <section className="relative h-[600px] md:h-screen bg-black">
      {/* ── Hero image + gradient + notch masks (clipped layer) ─────────── */}
      <div className="absolute top-[68px] md:top-[18px] inset-x-4 md:inset-x-5 lg:inset-x-8 bottom-0 overflow-hidden pointer-events-none">
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
          viewBox="0 0 400 600"
          preserveAspectRatio="none"
        >
          <defs>
            <mask id="catalogueMobileMask">
              <rect width="400" height="600" fill="white" />
              <path d={mobilePath} fill="black" />
            </mask>
          </defs>
          <rect
            width="400"
            height="600"
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
            src="/header/VALSEWA.png"
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

      {/* MOBILE: Brand Switcher - absolutely positioned at top to align with notch */}
      <div className="md:hidden absolute top-0 left-0 right-0 z-40 px-4 pt-2">
        <MobileBrandSwitcher
          activeBrand={activeBrand}
          setActiveBrand={setActiveBrand}
        />
      </div>

      {/* Sentinel for IntersectionObserver */}
      <div
        ref={sentinelRef}
        className="absolute bottom-0 left-0 right-0 h-px"
      />
    </section>
  );
}
