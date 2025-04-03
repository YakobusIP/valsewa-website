"use client";

import Image from "next/image";

const Navbar = () => {
  return (
    <div className="md:h-[120px] h-[84px] flex-no-wrap fixed top-0 flex bg-opacity-40 w-full items-center justify-between bg-[#2b2b2b] py-2 shadow-md shadow-black/5  lg:flex-wrap lg:justify-between lg:py-4 z-50">
      <div className="relative md:pl-14">
        <figure className="relative top-0 lg:max-w-[200px] sm:max-w-[150px] max-w-[120px] left-5">
          <Image
            src="/logo/Logo Valsewa 6 SVG.svg"
            alt="logo"
            height={300}
            width={200}
            className="object-contain"
          />
        </figure>
      </div>
      <div className="md:pr-14 pr-7">
        <figure className="relative top-0 lg:max-w-[40px] sm:max-w-[30px] max-w-[25px]">
          <Image
            src="/instagram.svg"
            alt="logo"
            height={300}
            width={200}
            className="object-contain"
          />
        </figure>
      </div>
    </div>
  );
};

export default Navbar;
