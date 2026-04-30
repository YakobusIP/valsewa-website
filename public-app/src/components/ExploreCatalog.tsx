"use client";

import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import CTAbackground from "./CTAbackground";
import router from "next/router";
import Link from "next/link";

export default function ExploreCatalog() {
  return (
    <section className="relative w-full h-[95vh] xl:h-[95vh] flex items-center justify-center overflow-hidden max-w-[1920px] mx-auto">

      {/* Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_#b30000,_#000_90%)] tablet:bg-[radial-gradient(circle_at_bottom,_#b30000,_#000_80%)] desktop:bg-[radial-gradient(circle_at_bottom,_#b30000,_#000_55%)] opacity-90" />
        <CTAbackground />
      </div>

      {/* CENTER CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-7xl">

        <Image
          src="/header/VALSEWA.png"
          alt="Valsewa Logo"
          width={220}
          height={80}
          className="mb-6"
        />

        <h1 className="text-white font-bold uppercase leading-tight text-4xl tablet:text-5xl desktop:text-7xl pb-8">
          Widest Selection <br /> In The Game.
        </h1>
        <Link href="/search" target="_blank" className="cursor-pointer">
          <button
            className="group mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg transition-all duration-300 hover:scale-105"
          >
            <span className="text-sm tablet:text-base block">
              Explore our evergrowing
            </span>
            <span className="flex items-center justify-center gap-2 text-sm tablet:text-base">
              account catalog
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-45" />
            </span>
          </button>
        </Link>

      </div>

      {/* BOTTOM CONTENT */}
      <div className="absolute bottom-6 w-full flex flex-col items-center text-center z-10 px-4">
        <p className="text-white text-xs">
          Don’t miss out our updates:
        </p>

        <div className="flex gap-6 mt-3 text-white text-[9px] tablet:text-xs flex-wrap justify-center">
          <span className="flex items-center gap-2">
            <img src="/home/instagram.svg" />
            VALSEWA
          </span>
          <span className="flex items-center gap-2">
            <img src="/home/instagram.svg" />
            VALFORUM
          </span>
          <span className="flex items-center gap-2">
            <img src="/home/instagram.svg" />
            VALJUBEL
          </span>
          <span className="flex items-center gap-2">
            <img src="/home/instagram.svg" />
            VALJOKI
          </span>
        </div>
      </div>
    </section>
  );
}