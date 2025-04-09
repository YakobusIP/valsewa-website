// import { Logo, TextLogo } from "@/data/data";
import { FC } from "react";

import Image from "next/image";

import { Button } from "./ui/button";

interface Props {
  id: string;
}
const Whatsapp: FC<Props> = ({ id }) => {
  const whatsappUrl = `https://wa.me/6285175343447?text=Halo admin VALSEWA aku mau SEWA akun ${id}`;

  return (
    <Button className="bg-green-600 hover:bg-green-700 rounded-[16px]">
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
            className="object-contain dark:hidden"
            fill
          />
        </figure>

        <span className="relative pl-[10px] text-sm font-medium ipad-mini:text-base">
          Order Now
        </span>
      </a>
    </Button>
  );
};

export default Whatsapp;
