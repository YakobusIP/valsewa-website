// import { Logo, TextLogo } from "@/data/data";
import Image from "next/image";
import { FC } from "react";
import { Button } from "./ui/button";


const Whatsapp: FC = () => {
  const whatsappUrl =
    "https://wa.me/6285175343447?text=Halo admin VALSEWA aku mau SEWA akun nih"; 

  return (
    <Button className="bg-green-600 hover:bg-green-700">
<a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className=" w-auto flex items-center "
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
    </Button>
    
  );
};

export default Whatsapp;
