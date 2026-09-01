import {
  type BrandSlug,
  getBrandLogoPath,
  handleBrandSelection
} from "@/lib/brand";
import { cn } from "@/lib/utils";

import Image from "next/image";

interface Props {
  activeBrand: BrandSlug;
  setActiveBrand: (brand: BrandSlug) => void;
  className?: string;
}

const logoClassName =
  "h-auto w-[clamp(5.3625rem,24.2vw,6.6rem)] object-contain";

export default function MobileBrandSwitcher({
  activeBrand,
  setActiveBrand,
  className
}: Props) {
  const baseButtonClass =
    "flex h-full min-w-0 flex-1 items-center justify-center rounded-md transition";

  return (
    <div
      className={cn("flex h-full w-full items-center gap-6 px-2", className)}
    >
      <button
        onClick={() => handleBrandSelection("valsewa", setActiveBrand)}
        aria-pressed={activeBrand === "valsewa"}
        className={baseButtonClass}
      >
        <Image
          src={getBrandLogoPath("valsewa")}
          alt="VALSEWA"
          width={3945}
          height={935}
          sizes="40vw"
          className={logoClassName}
        />
      </button>

      <button
        onClick={() => handleBrandSelection("valjubel", setActiveBrand)}
        aria-pressed={activeBrand === "valjubel"}
        className={baseButtonClass}
      >
        <Image
          src={getBrandLogoPath("valjubel")}
          alt="VALJUBEL"
          width={3945}
          height={935}
          sizes="40vw"
          className={logoClassName}
        />
      </button>
    </div>
  );
}
