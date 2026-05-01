"use client";

import { Fragment, useEffect, useRef, useState } from "react";

import Hero from "@/components/Hero";
import HowToOrder from "@/components/HowToOrder";
import NavbarHome from "@/components/NavbarHome";
import NavbarHomeMobile from "@/components/NavbarHomeMobile";
import RecommendedSection from "@/components/RecommendedSection";

import { CarouselSlide } from "@/types/account.type";

import { motion } from "framer-motion";
import DailyDrop from "@/components/DailyDrop";
import { DailyDropModal } from "@/components/dailydrop/DailyDropModal";
import ExploreCatalog from "@/components/ExploreCatalog";
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
        className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth bg-[#0F0F0F]"
        onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 1)}
      >
        <motion.section
          id="hero"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          className="snap-start snap-always px-8 lg:px-16"
        >
          {/* Hero wrapper - overflow-visible to allow notch to show, pt for navbar space */}
          <div className="relative w-full max-w-[1920px] mx-auto overflow-visible pt-4">
            <Hero
              initialCarousel={initialCarousel}
              activeBrand={activeBrand}
              setActiveBrand={setActiveBrand}
            />
          </div>
        </motion.section>
        <motion.section
          id="howto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          className="snap-start snap-always px-8 lg:px-16 scroll-mt-12 pt-10"
        >
          <HowToOrder />
        </motion.section>

        <motion.section
          id="daily-drop"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          className="snap-start snap-always px-8 lg:px-16 scroll-mt-12 pt-10"
        >
          <DailyDrop onOpen={() => setIsDailyDropOpen(true)} />
        </motion.section>

        <motion.section
          id="recommended"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          className="snap-start snap-always px-8 lg:px-16 scroll-mt-12 pt-10"
        >
          <RecommendedSection onSeeMore={handleSeeMore} />
        </motion.section>

        <motion.section
          id="explore-catalog"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          className="snap-start snap-always scroll-mt-12 pt-10"
        >
          <ExploreCatalog />
        </motion.section>

        {/* <motion.section
          id="discover"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          className="snap-start snap-always px-8 lg:px-16 scroll-mt-24"
        >
          <DiscoverSection
            onSelectTier={handleSelectTier}
            onSelectRank={handleSelectRank}
            loading={loading}
          />
        </motion.section> */}


        {/* <motion.section
          id="cards"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.001 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          className="snap-start snap-always px-8 lg:px-16 scroll-mt-24"
        >
          {accountList.length > 0 ? (
            <div id="card-section" className="xl:mt-9 mx-0 xl:pt-10">
              <Card data={accountList} />
            </div>
          ) : (
            <div id="results-section" className="mt-48">
              <div className="flex items-center ps-3 pointer-events-none justify-center">
                <svg
                  className="w-16 h-16 text-roseWhite font-bold  dark:text-gray-400 p-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <p className="text-roseWhite text-3xl font-semibold text-center">
                Mohon maaf Akun tidak ditemukan
              </p>
              <p className="text-roseWhite text-xl font-normal text-center max-w-[300px] mx-auto">
                Coba lakukan pencarian untuk skin / preferensi yang lain
              </p>
            </div>
          )}
        </motion.section> */}
      </main>
      <DailyDropModal
        open={isDailyDropOpen}
        onClose={() => setIsDailyDropOpen(false)}
      />
    </Fragment>
  );
}
