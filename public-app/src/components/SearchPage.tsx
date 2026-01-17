"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { SearchModal } from "./SearchModal";
import { SearchModalMobile } from "./SearchModalMobile";

type SearchPageProps = {
  onClose: () => void;
};

export default function SearchPage({ onClose }: SearchPageProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCardClick = (id: string) => {
    router?.push(`/details/${id}`);
  };

  // Close on ESC key
  useEffect(() => {
    if (!mounted) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0)
      document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[999]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="absolute inset-0 flex items-center justify-center p-3 lg:p-4"
        onClick={onClose}
      >
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          className="
            w-full max-w-screen-2xl
            h-dvh lg:h-[75vh] overflow-y-auto
          "
        >
          <div className="relative pt-4">
            <SearchModal
              onSelectAccount={handleCardClick}
              className="h-full w-full"
            />
          </div>
          <div className="lg:hidden">
            <SearchModalMobile
              onSelectAccount={handleCardClick}
              onClose={onClose}
              open
            ></SearchModalMobile>
          </div>
        </div>
      </div>
    </div>
  );
}
