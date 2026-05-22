import React from "react";

export default function HowToOrder() {
  return (
    <section className="w-full relative z-10 my-4 pt-4">
      <div className="w-full max-w-[1920px] mx-auto">
        <div className="bg-gradient-to-r from-[#770000] to-[#4A0107] rounded-2xl p-3 sm:p-8 md:p-12 relative overflow-hidden border border-white/10 shadow-2xl">
          <h2 className="text-xl md:text-4xl font-antonio font-black text-white tracking-tighter uppercase mb-4 sm:mb-8">
            HOW TO ORDER?
          </h2>

          <div className="relative z-10 flex w-full flex-row flex-nowrap items-start justify-between gap-2 sm:gap-4 md:items-center md:justify-start md:gap-2 lg:gap-4">
            {/* Step 1 */}
            <div className="flex min-w-0 flex-none items-center gap-1 sm:gap-2 lg:gap-4">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-white shadow-lg sm:h-7 sm:w-7 lg:h-10 lg:w-10">
                <span className="text-[0.5rem] font-black text-[#990000] sm:text-xs lg:text-lg">
                  1
                </span>
              </div>
              <p className="min-w-0 text-[0.5rem] font-medium leading-tight text-white xs:text-[0.7rem] sm:text-xs lg:text-lg max-sm:hidden">
                Explore and Select <br /> Account
              </p>
              <p className="min-w-0 whitespace-nowrap text-[0.5rem] font-medium leading-tight text-white xs:text-[0.7rem] sm:hidden">
                Explore and <br /> Select Account
              </p>
            </div>

            {/* Connecting Line 1 */}
            <div className="mx-1 hidden h-[2px] min-w-[0.5rem] flex-1 self-center border-t-2 border-dashed border-[#E8c545]/50 sm:mx-2 md:block" />

            {/* Step 2 */}
            <div className="flex min-w-0 flex-none items-center gap-1 sm:gap-2 lg:gap-4">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-white shadow-lg sm:h-7 sm:w-7 lg:h-10 lg:w-10">
                <span className="text-[0.5rem] font-black text-[#990000] sm:text-xs lg:text-lg">
                  2
                </span>
              </div>
              <p className="min-w-0 whitespace-nowrap text-[0.5rem] font-medium leading-tight text-white xs:text-[0.7rem] sm:text-xs lg:text-lg">
                Place Your <br /> Order
              </p>
            </div>

            {/* Connecting Line 2 */}
            <div className="mx-1 hidden h-[2px] min-w-[0.5rem] flex-1 self-center border-t-2 border-dashed border-[#E8c545]/50 sm:mx-2 md:block" />

            {/* Step 3 */}
            <div className="flex min-w-0 flex-none items-center gap-1 sm:gap-2 lg:gap-4">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-white shadow-lg sm:h-7 sm:w-7 lg:h-10 lg:w-10">
                <span className="text-[0.5rem] font-black text-[#990000] sm:text-xs lg:text-lg">
                  3
                </span>
              </div>
              <p className="min-w-0 whitespace-nowrap text-[0.5rem] font-medium leading-tight text-white xs:text-[0.7rem] sm:text-xs lg:text-lg">
                Payment & Receive <br /> Account Credentials
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
