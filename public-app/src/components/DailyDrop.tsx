import Link from "next/link";
import React from "react";
import { FaFire } from "react-icons/fa";

export default function DailyDrop() {
  return (
    <Link href={`#`} className="w-full relative z-10 my-4 pt-10 pb-10 cursor-pointer">
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
            <img src="/home/dailydrop2.png" alt="Daily Drop" className="rounded-lg w-full" />
          </div>
        </div>
      </div>
    </Link>
  );
}
