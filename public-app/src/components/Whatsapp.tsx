// import { Logo, TextLogo } from "@/data/data";
import Image from "next/image";
import { FC } from "react";



const Whatsapp: FC = () => {
  const whatsappUrl =
    "https://wa.me/6285176983434?text=Halo admin VALFORUM aku mau JUAL BELI akun nih"; 

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-20 my-auto flex h-[36px] w-[140px] flex-row items-center justify-center overflow-visible rounded-full bg-success-600 p-10 px-4 py-2 pb-3 pt-3 text-white bg-green-600 hover:opacity-80"
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
      
    </a>
  );
};

export default Whatsapp;
