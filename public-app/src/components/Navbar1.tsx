"use client";

import React, { useEffect, useState } from "react";

import { Goldman } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaX } from "react-icons/fa6";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

export interface NavbarItem {
  name: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  children?: {
    name: string;
    href: string;
  }[];
}

const goldman = Goldman({
  subsets: ["latin"],
  weight: ["400", "700"], // or just "400" if only regular
  display: "swap"
});

export const navbarItem: NavbarItem[] = [
  {
    name: "Jual Akun",
    icon: (
      <Image
        src="/navbar/Logo - Valforum - White 2.png"
        alt="Jual Akun"
        width={35}
        height={35}
      />
    ),
    href: "https://api.whatsapp.com/send?phone=6285176983434&text=Halo%20admin%20VALJUBEL%2C%20aku%20mau%20JUAL%20akun%20Valorant%20nih!"
  },
  {
    name: "Beli Akun",
    icon: (
      <Image
        src="/navbar/Logo - Valjubel - White 2.png"
        alt="Beli Akun"
        width={35}
        height={35}
      />
    ),
    href: "https://www.instagram.com/valjubel/"
  },
  {
    name: "Joki Akun",
    icon: (
      <Image
        src="/navbar/Logo - Valjoki - White 2.png"
        alt="Joki Akun"
        width={35}
        height={35}
      />
    ),
    href: "https://valforum.com/jokiakun"
  }
];

const Navbar1 = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const [isNavMobileOpen, setIsNavMobileOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-pressure">
      {/* Mobile Navbar */}
      <div
        className={`fixed top-0 w-full flex flex-col lg:hidden z-50 ${
          scrolled
            ? "bg-[#0d0d0d]/80 backdrop-blur-md"
            : "bg-[#0d0d0d]/50 backdrop-blur-md"
        }`}
      >
        <div className="flex items-center w-full justify-between p-4">
          <Link href="/">
            <Image
              src="/logo/Logo Valsewa mobile.png"
              alt="logo"
              width={60}
              height={50}
            />
          </Link>
          <Link href="https://valforum.com/top-up">
            <button
              className={`group border border-[#FFC200] w-fit px-4 py-1 rounded-xl cursor-pointer text-[#8C421D] ${goldman.className} flex items-center space-x-1 bg-[#FFC200] hover:bg-transparent font-bold hover:text-white`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 15"
                fill="currentColor"
                className="w-[30px] h-[30px] fill-current transition-colors"
              >
                <path d="M12.4849 0.435913H8.05996L10.8756 3.97616L12.4849 0.435913ZM3.09991 0.435913L4.70922 3.97616L7.52486 0.435913H3.09991ZM7.79241 1.78156L5.65201 4.47254H9.93281L7.79241 1.78156ZM13.3759 1.03699L11.8144 4.47254H15.5514L13.3759 1.03699ZM2.20896 1.03699L0 4.47254H3.77046L2.20896 1.03699ZM4.13633 5.4817H0.0334438L7.48473 14.5641H7.50245L4.13633 5.4817ZM11.4485 5.4817L8.08237 14.5641H8.10009L15.5514 5.4817H11.4485ZM10.2469 5.4817H5.33797L7.79241 12.0412L10.2469 5.4817Z" />
              </svg>
              <span>TOP UP</span>
            </button>
          </Link>
          <button onClick={() => setIsNavMobileOpen((prev) => !prev)}>
            <HiOutlineMenuAlt3 className="text-white" size={24} />
          </button>
        </div>

        {isNavMobileOpen && (
          <div className="fixed top-0 left-0 w-full bg-[#0d0d0d] flex flex-col space-y-3 px-4 py-8 lg:hidden z-50">
            <div className="flex justify-between items-center w-full">
              <Link href="/">
                <div className="relative w-[150px] h-[60px]">
                  <Image
                    src="/logo/Logo Valsewa 6 SVG.svg"
                    alt="logo"
                    className="flex-none object-contain"
                    fill
                  />
                </div>
              </Link>
              <FaX onClick={() => setIsNavMobileOpen(false)} color="white" />
            </div>

            {navbarItem.map((item, index) => (
              <div key={index} className="flex flex-col">
                {item.href ? (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item.href}
                    onClick={() => setIsNavMobileOpen(false)}
                    className={`flex items-center space-x-3 ${
                      pathname === item.href ? "text-[#FFC200]" : "text-white"
                    }`}
                  >
                    <div className="w-auto h-auto">{item.icon}</div>
                    <span className="text-base">{item.name}</span>
                  </Link>
                ) : item.children ? (
                  <div>
                    <button
                      onClick={() =>
                        setOpenDropdownIndex(
                          openDropdownIndex === index ? null : index
                        )
                      }
                      className="flex items-center space-x-3 text-white"
                    >
                      <div className="w-5 h-5">{item.icon}</div>
                      <span className="text-base">{item.name}</span>
                    </button>
                    {openDropdownIndex === index && (
                      <div className="ml-6 mt-2 flex flex-col space-y-2">
                        {item.children.map((sub, subIndex) => (
                          <Link
                            key={subIndex}
                            href={sub.href}
                            className="text-white text-sm"
                            onClick={() => setIsNavMobileOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar1;
