import Image from "next/image";
import React from "react";
import { FaFire } from "react-icons/fa";

type DailyDropProps = {
  onOpen: () => void;
};

export default function DailyDrop({ onOpen }: DailyDropProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full relative z-10 my-4 pt-10 pb-10 cursor-pointer text-left"
    >
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
            <Image
              src="/home/dailydrop2.png"
              alt="Daily Drop"
              width={1200}
              height={600}
              className="rounded-lg w-full h-auto"
              sizes="(max-width: 1920px) 100vw, 1920px"
            />
          </div>
        </div>
      </div>
    </button>
  );
}
