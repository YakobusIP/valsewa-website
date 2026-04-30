import { fetchCarousel } from "@/services/accountService";

import type { Metadata } from "next";

import Home from "./home";

export const metadata: Metadata = {
  title: "Valsewa | Sewa akun Valorant terpercaya",
  description:
    "Sewa akun Valorant terpercaya dengan katalog lengkap, termasuk daftar skin eksklusif dan harga sewa kompetitif. Nikmati pengalaman bermain yang maksimal dengan akun berkualitas dan layanan terbaik.",
  keywords: [
    "sewa akun valorant",
    "akun valorant",
    "skin valorant",
    "harga sewa akun",
    "katalog akun",
    "sewa akun game",
    "akun gaming"
  ],
  robots: "index, follow",
  alternates: { canonical: "/" }
};

export default async function Page() {
  const initialCarousel = await fetchCarousel();
  return <Home initialCarousel={initialCarousel} />;
}

export const dynamic = "force-dynamic";
