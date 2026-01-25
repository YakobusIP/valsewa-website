"use client";

import { Fragment, useEffect, useState } from "react";

import Card from "@/components/Card";
import DiscoverSection from "@/components/DiscoverSection";
import Hero from "@/components/Hero";
import HowToOrder from "@/components/HowToOrder";
import NavbarHome from "@/components/NavbarHome";
import NavbarHomeMobile from "@/components/NavbarHomeMobile";
import RecommendedSection from "@/components/RecommendedSection";
import { SearchModal } from "@/components/SearchModal";

import { AccountEntity, CarouselSlide } from "@/types/account.type";

import { useAccountController } from "@/controllers/useAccountController";
import { useRouter } from "next/navigation";

interface Props {
  initialAccount: AccountEntity[];
  initialCarousel: CarouselSlide[];
}
export default function Home({ initialAccount, initialCarousel }: Props) {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);
  const { accountList, loading, selectTier, selectRank } =
    useAccountController(initialAccount);

  const handleCardClick = (id: string) => {
    router?.push(`/details/${id}`);
  };

  const handleSelectTier = (tierId: string, isLowTier: string) => {
    selectTier(tierId, isLowTier);
    setShouldScroll(true);
  };

  const handleSelectRank = (rank: string) => {
    selectRank(rank);
    setShouldScroll(true);
  };

  const handleSeeMore = () => {
    setShouldScroll(true);
  };

  useEffect(() => {
    if (!loading && shouldScroll) {
      setTimeout(() => {
        if (accountList.length > 0) {
          document.getElementById("card-section")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        } else {
          document.getElementById("results-section")?.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }
        setShouldScroll(false);
      }, 100);
    }
  }, [loading, shouldScroll, accountList.length]);

  return (
    <Fragment>
      <main>
        <section className="bg-[#0F0F0F] md:pb-64 pb-32 relative ">
          {/* Hero wrapper - overflow-visible to allow notch to show, pt for navbar space */}
          <div className="relative w-full max-w-[1920px] mx-auto h-auto xl:min-h-[720px] bg-[#0F0F0F] overflow-visible px-4 sm:px-6 xl:px-12 pt-4">
            <Hero initialCarousel={initialCarousel} />
          </div>
          <div className="relative max-xl:hidden pt-4">
            <NavbarHome onOpenChange={setIsSearchOpen} />
          </div>
          <div className="xl:hidden">
            <NavbarHomeMobile />
          </div>
          {/* <a
        href="https://wa.me/6285175343447?text=Halo admin VALSEWA aku butuh bantuan dong"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50"
      >
        <figure className="w-[120px] h-[120px] fixed bottom-4 right-4 z-50">
          <Image src="/home/kananbawah.png" fill alt="Iconic" />
        </figure>
      </a> */}
          {/* <div
        className="fixed bottom-4 left-4 z-50 cursor-pointer text-[#DDDDDD] bg-[#A6A6A6B2] p-3 rounded-full"
        onClick={scrollToTop}
      >
        <FaArrowUp size={30} />
      </div> */}
          <div>
            <div className="xl:mx-12 sm:mx-6 mx-4 pt-4">
              <div>
                <HowToOrder />
                <RecommendedSection onSeeMore={handleSeeMore} />
              </div>
              <div className="mt-32">
                <DiscoverSection
                  onSelectTier={handleSelectTier}
                  onSelectRank={handleSelectRank}
                  loading={loading}
                />
              </div>
              {accountList.length > 0 ? (
                <div id="card-section" className="mt-9 mx-0 pt-10">
                  <Card data={accountList} />
                </div>
              ) : (
                <div id="results-section" className=" mt-48">
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
            </div>
          </div>
        </section>
      </main>
      <SearchModal
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        onSelectAccount={handleCardClick}
      />
    </Fragment>
  );
}
