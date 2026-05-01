"use client";

import { Fragment, useEffect, useRef, useState } from "react";

import DailyDrop from "@/components/DailyDrop";
import ExploreCatalog from "@/components/ExploreCatalog";
import Hero from "@/components/Hero";
import HowToOrder from "@/components/HowToOrder";
import NavbarHome from "@/components/NavbarHome";
import NavbarHomeMobile from "@/components/NavbarHomeMobile";
import RecommendedSection from "@/components/RecommendedSection";
import { DailyDropModal } from "@/components/dailydrop/DailyDropModal";

import { CarouselSlide } from "@/types/account.type";

import { useRouter } from "next/navigation";

interface Props {
  initialCarousel: CarouselSlide[];
}
export default function Home({ initialCarousel }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const router = useRouter();

  const [activeBrand, setActiveBrand] = useState<
    "valsewa" | "valjubel" | "valjoki"
  >("valsewa");
  const [isDailyDropOpen, setIsDailyDropOpen] = useState(false);

  // Calculate and set scrollbar width as CSS variable
  useEffect(() => {
    const updateScrollbarWidth = () => {
      if (mainRef.current) {
        const scrollbarWidth =
          mainRef.current.offsetWidth - mainRef.current.clientWidth;
        document.documentElement.style.setProperty(
          "--scrollbar-width",
          `${scrollbarWidth}px`
        );
      }
    };

    updateScrollbarWidth();
    window.addEventListener("resize", updateScrollbarWidth);
    return () => window.removeEventListener("resize", updateScrollbarWidth);
  }, []);

  const handleSeeMore = () => {
    router.push("/search");
  };

  return (
    <Fragment>
      {/* <a
        href="https://wa.me/6285175343447?text=Halo admin VALSEWA aku butuh bantuan dong"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50"
      >
        <figure className="w-[100px] h-[100px] fixed bottom-4 right-4 z-50 rounded-full bg-red-800/50">
          <Image src="/home/kananbawah.png" fill alt="Iconic" />
        </figure>
      </a>*/}
      <div className="max-tablet:hidden">
        <NavbarHome
          activeBrand={activeBrand}
          setActiveBrand={setActiveBrand}
          isScrolled={isScrolled}
        />
      </div>
      <div className="tablet:hidden">
        <NavbarHomeMobile activeBrand={activeBrand} isScrolled={isScrolled} />
      </div>
      <main
        ref={mainRef}
        className="h-screen overflow-y-auto scroll-smooth bg-[#0F0F0F]"
        onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 1)}
      >
        <section id="hero" className="px-8 lg:px-16">
          {/* Hero wrapper - overflow-visible to allow notch to show, pt for navbar space */}
          <div className="relative w-full max-w-[1920px] mx-auto overflow-visible pt-4">
            <Hero
              initialCarousel={initialCarousel}
              activeBrand={activeBrand}
              setActiveBrand={setActiveBrand}
            />
          </div>
        </section>
        <section
          id="howto"
          className="px-8 lg:px-16 scroll-mt-12 pt-10"
        >
          <HowToOrder />
        </section>

        <section
          id="daily-drop"
          className="px-8 lg:px-16 scroll-mt-12 pt-10"
        >
          <DailyDrop onOpen={() => setIsDailyDropOpen(true)} />
        </section>

        <section
          id="recommended"
          className="px-8 lg:px-16 scroll-mt-12 pt-10"
        >
          <RecommendedSection onSeeMore={handleSeeMore} />
        </section>

        <section id="explore-catalog" className="scroll-mt-12 pt-10">
          <ExploreCatalog />
        </section>
      </main>
      <DailyDropModal
        open={isDailyDropOpen}
        onClose={() => setIsDailyDropOpen(false)}
      />
    </Fragment>
  );
}
