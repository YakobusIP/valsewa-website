// import { Logo, TextLogo } from "@/data/data";
import Image from "next/image";
import { FC } from "react";



const Whatsapp: FC = () => {
  const whatsappUrl = "https://wa.me/6285162917789"; // Replace with your actual number in international format

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-20 my-auto flex h-[36px] w-[140px] flex-row items-center justify-center overflow-visible rounded-full bg-success-600 p-10 px-4 py-2 pb-3 pt-3 text-white bg-green-600"
    >
      <figure className="relative h-[24px] w-[24px]">
        <Image
          src="/whatsapp.svg"
          alt="WhatsApp"
          className="rounded-[12px] object-contain dark:hidden"
          fill
        />
      </figure>

      <span className="relative pl-[10px] text-sm font-medium ipad-mini:text-base">
        Contact Us
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-all duration-[1000ms] ease-out hover:translate-x-full hover:opacity-100"></div>
    </a>
  );
};

export default Whatsapp;
