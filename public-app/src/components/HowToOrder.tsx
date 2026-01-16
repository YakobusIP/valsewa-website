import React from "react";

export default function HowToOrder() {
  return (
    <section className="w-full relative z-10 mb-20">
      <div className="w-full max-w-[1920px] mx-auto lg:px-12">
        <div className="bg-gradient-to-r from-[#770000] to-[#4A0107] rounded-2xl p-3 sm:p-8 md:p-12 relative overflow-hidden border border-white/10 shadow-2xl">
          <h2 className="text-xl md:text-4xl font-antonio font-black text-white tracking-tighter uppercase mb-4 sm:mb-8">
            HOW TO ORDER?
          </h2>

          <div className="flex flex-row md:flex-row md:items-center items-start justify-between gap-1 sm:gap-8 md:gap-4 relative">
            {/* Step 1 */}
            <div className="flex items-center gap-2 md:gap-4 z-10">
              <div className="w-5 h-5 sm:w-7 sm:h-7 lg:w-10 lg:h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-[#990000] font-black text-[0.5rem] sm:text-xs lg:text-lg">
                  1
                </span>
              </div>
              <p className="text-white font-medium text-[0.5rem] sm:text-xs lg:text-lg leading-tight max-sm:hidden">
                Explore and Select <br /> Account
              </p>
              <p className="text-white font-medium text-[0.5rem] sm:text-xs lg:text-lg leading-tight sm:hidden">
                Explore and Select Account
              </p>
            </div>

            {/* Connecting Line 1 */}
            <div className="hidden md:block flex-1 h-[2px] bg-dashed border-t-2 border-dashed border-[#E8c545]/50 mx-4"></div>

            {/* Step 2 */}
            <div className="flex items-center gap-2 md:gap-4 z-10">
              <div className="w-5 h-5 sm:w-7 sm:h-7 lg:w-10 lg:h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-[#990000] font-black text-[0.5rem] sm:text-xs lg:text-lg">
                  2
                </span>
              </div>
              <p className="text-white font-medium text-[0.5rem] sm:text-xs lg:text-lg leading-tight">
                Place Your Order
              </p>
            </div>

            {/* Connecting Line 2 */}
            <div className="hidden md:block flex-1 h-[2px] bg-dashed border-t-2 border-dashed border-[#E8c545]/50 mx-4"></div>

            {/* Step 3 */}
            <div className="flex items-center gap-2 md:gap-4 z-10">
              <div className="w-5 h-5 sm:w-7 sm:h-7 lg:w-10 lg:h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-[#990000] font-black text-[0.5rem] sm:text-xs lg:text-lg">
                  3
                </span>
              </div>
              <p className="text-white font-medium text-[0.5rem] sm:text-xs lg:text-lg leading-tight max-sm:hidden">
                Payment & Receive <br /> Account Credentials
              </p>
              <p className="text-white font-medium text-[0.5rem] sm:text-xs lg:text-lg leading-tight sm:hidden">
                Payment & Receive Account Credentials
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
