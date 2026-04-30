import Image from "next/image";

type BrandType = "valsewa" | "valjubel" | "valjoki";

const BRANDS: BrandType[] = ["valsewa", "valjubel", "valjoki"];

interface DesktopBrandSwitcherProps {
  activeBrand: BrandType;
  setActiveBrand: (brand: BrandType) => void;
}

export default function DesktopBrandSwitcher({
  activeBrand,
  setActiveBrand
}: DesktopBrandSwitcherProps) {
  return (
    <div className="flex min-h-[44px] -translate-y-1 items-center gap-1 lg:gap-2 px-[var(--hero-switcher-shell-padding-x)] py-2 rounded-2xl bg-gradient-to-r from-[#5a5a5a] to-[#2f2f2f] border border-white/20 shadow-inner">
      {BRANDS.map((brand) => {
        const isActive = activeBrand === brand;

        return (
          <button
            key={brand}
            type="button"
            onClick={() => setActiveBrand(brand)}
            className={`flex items-center justify-center px-[var(--hero-switcher-item-padding-x)] py-2.5 rounded-xl cursor-pointer transition ${
              isActive ? "bg-black shadow-md" : "hover:bg-white/10"
            }`}
          >
            <Image
              src={`/header/${brand.toUpperCase()}.png`}
              alt={brand.toUpperCase()}
              width={130}
              height={28}
              className="object-contain w-[var(--hero-switcher-logo-width)] h-auto"
            />
          </button>
        );
      })}
    </div>
  );
}
