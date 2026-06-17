import React from "react";

import Image from "next/image";
import { FaFire } from "react-icons/fa";

type DailyDropProps = {
  onOpen: () => void;
};

export default function DailyDrop({ onOpen }: DailyDropProps) {
  return (
    <div className="w-full relative z-10 my-4 pt-10 pb-10 text-left">
      <div className="w-full max-w-[1920px] mx-auto">
        <div className=" rounded-2xl relative overflow-hidden ">
          <div>
            <h2 className="text-3xl md:text-5xl font-antonio font-black text-white tracking-tighter uppercase relative pb-6 desktop:pb-5">
              Daily Drop
              <span className="inline-block ml-3 text-[#C70515] animate-pulse">
                <FaFire />
              </span>
            </h2>
            <p className="text-white/70 text-xs tablet:text-lg desktop:pb-10 pb-12">
              3 accounts. 20% off. Gone by midnight. Get it now!
            </p>
          </div>

          <div className="flex flex-row md:flex-row md:items-center items-start justify-between gap-1 sm:gap-8 md:gap-4 relative">
            <button
              type="button"
              onClick={onOpen}
              className="block w-full p-0 border-0 bg-transparent cursor-pointer rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Image
                src="/home/daily-drop-desktop.svg"
                alt="Daily Drop"
                width={1200}
                height={600}
                className="hidden tablet:block rounded-lg w-full h-auto pointer-events-none"
                sizes="(max-width: 1920px) 100vw, 1920px"
              />
              <Image
                src="/home/daily-drop-mobile.svg"
                alt="Daily Drop"
                width={600}
                height={600}
                className="block tablet:hidden rounded-lg w-full h-auto pointer-events-none"
                sizes="(max-width: 1920px) 100vw, 1920px"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
