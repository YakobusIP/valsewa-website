"use client";

import { Goldman } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LoginPage from "./LoginPage";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { UserIcon } from "lucide-react";

const goldman = Goldman({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap"
});

const Navbar = () => {
  const [isComponentOpen, setIsComponentOpen] = useState(false);

  const handleLoginClick = () => {
    setIsComponentOpen(true); // open login modal
  };
  const { isAuthenticated } = useAuth();

  return (
    <div className="md:h-[120px] h-[84px] flex-no-wrap fixed top-0 flex w-full items-center justify-between bg-[#250000] py-2 shadow-md shadow-black/5 lg:flex-wrap lg:justify-between lg:py-4 z-50 font-pressure">

      {/* LOGO */}
      <div className="relative md:pl-14">
        <figure className="relative top-0 lg:max-w-[200px] sm:max-w-[150px] max-w-[150px] left-5">
          <Image
            src="/logo/Logo Valsewa 6 SVG.svg"
            alt="logo"
            height={300}
            width={200}
            className="object-contain"
          />
        </figure>
      </div>

      {/* NAV RIGHT SIDE */}
      <div className="md:pr-14 pr-7 flex gap-x-7">

        {/* TOP UP BUTTON */}
        <Link href="https://valforum.com/top-up">
          <div className="flex justify-center items-center">
            <button
              className={`group border border-[#FFC200] w-fit px-4 py-1 rounded-xl cursor-pointer text-[#8C421D] ${goldman.className} flex items-center space-x-1 bg-[#FFC200] hover:bg-transparent font-bold hover:text-white`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 15"
                fill="currentColor"
                className="w-[30px] h-[30px]"
              >
                <path d="M12.4849 0.435913H8.05996L10.8756 3.97616L12.4849 0.435913ZM3.09991 0.435913L4.70922 3.97616L7.52486 0.435913H3.09991ZM7.79241 1.78156L5.65201 4.47254H9.93281L7.79241 1.78156ZM13.3759 1.03699L11.8144 4.47254H15.5514L13.3759 1.03699ZM2.20896 1.03699L0 4.47254H3.77046L2.20896 1.03699ZM4.13633 5.4817H0.0334438L7.48473 14.5641H7.50245L4.13633 5.4817ZM11.4485 5.4817L8.08237 14.5641H8.10009L15.5514 5.4817H11.4485ZM10.2469 5.4817H5.33797L7.79241 12.0412L10.2469 5.4817Z" />
              </svg>
              <span>TOP UP</span>
            </button>
          </div>
        </Link>

        {/* LINKS */}
        <Link href="https://api.whatsapp.com/send?phone=6285176983434&text=Halo%20admin%20VALJUBEL%2C%20aku%20mau%20JUAL%20akun%20Valorant%20nih!">
          <div className="flex items-center justify-center">
            <Image src="/navbar/Logo - Valforum - White 2.png" alt="Jual Akun" width={35} height={35} />
            <p className="text-lg text-white">Jual Akun</p>
          </div>
        </Link>

        <Link href="https://www.instagram.com/valjubel/">
          <div className="flex items-center justify-center">
            <Image src="/navbar/Logo - Valjubel - White 2.png" alt="Beli Akun" width={35} height={35} />
            <p className="text-lg text-white">Beli Akun</p>
          </div>
        </Link>

        <Link href="https://valforum.com/jokiakun">
          <div className="flex items-center justify-center">
            <Image src="/navbar/Logo - Valjoki - White 2.png" alt="Joki Akun" width={35} height={35} />
            <p className="text-lg text-white">Joki Akun</p>
          </div>
        </Link>

        {!isAuthenticated && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleLoginClick}
            >
              Sign In
            </Button>
          )}
        {isAuthenticated && (
          <Button variant="ghost" className="flex items-center gap-2">
            <UserIcon className="w-5 h-5" />
          </Button>)}
        
      
        
      </div>

      {/* LOGIN POPUP */}
      {isComponentOpen && (
        <LoginPage onClose={() => setIsComponentOpen(false)} />
      )}
    </div>
  );
};

export default Navbar;
