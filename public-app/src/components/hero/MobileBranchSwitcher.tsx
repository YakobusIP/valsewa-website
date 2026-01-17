import Image from "next/image";

// Mobile Brand Switcher Component - Full width with equal buttons
export default function MobileBrandSwitcher() {
  const baseButtonClass =
    "flex-1 flex items-center justify-center py-3 rounded-md transition";

  return (
    <div className="flex items-stretch w-full pt-[4.5rem] gap-6 px-2">
      {/* VALSEWA - sits in the notch area */}
      <button className={`${baseButtonClass} bg-[#C70515]`}>
        <Image
          src="/header/VALSEWA.png"
          alt="VALSEWA"
          width={200}
          height={70}
          className="object-contain w-[70px] sm:w-[90px] h-auto"
        />
      </button>

      {/* VALJUBEL */}
      <button className={`${baseButtonClass} bg-white/10 hover:bg-white/20`}>
        <Image
          src="/header/VALJUBEL.png"
          alt="VALJUBEL"
          width={200}
          height={70}
          className="object-contain w-[70px] sm:w-[90px] h-auto"
        />
      </button>

      {/* VALJOKI */}
      <button className={`${baseButtonClass} bg-white/10 hover:bg-white/20`}>
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
