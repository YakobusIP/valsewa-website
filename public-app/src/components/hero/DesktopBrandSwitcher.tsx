"use client";

import {
  type BrandSlug,
  SWITCHER_BRANDS,
  getBrandLogoPath,
  handleBrandSelection
} from "@/lib/brand";

import { motion } from "framer-motion";
import Image from "next/image";

interface DesktopBrandSwitcherProps {
  activeBrand: BrandSlug;
  setActiveBrand: (brand: BrandSlug) => void;
}

export default function DesktopBrandSwitcher({
  activeBrand,
  setActiveBrand
}: DesktopBrandSwitcherProps) {
  return (
    <div className="flex min-h-[44px] items-center gap-1 lg:gap-2 px-[var(--hero-switcher-shell-padding-x)] py-2 rounded-2xl bg-gradient-to-r from-[#5a5a5a] to-[#2f2f2f] border border-white/20 shadow-inner">
      {SWITCHER_BRANDS.map((brand) => {
        const isActive = activeBrand === brand;

        return (
          <button
            key={brand}
            type="button"
            onClick={() => handleBrandSelection(brand, setActiveBrand)}
            className="relative flex items-center justify-center px-[var(--hero-switcher-item-padding-x)] py-2.5 rounded-xl cursor-pointer transition hover:bg-white/10"
          >
            {isActive && (
              <motion.span
                layoutId="desktop-brand-switcher-active"
                className="absolute inset-0 rounded-xl bg-black shadow-md"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <Image
              src={getBrandLogoPath(brand)}
              alt={brand.toUpperCase()}
              width={130}
              height={28}
              className="relative z-10 object-contain w-[var(--hero-switcher-logo-width)] h-auto"
            />
          </button>
        );
      })}
    </div>
  );
}
