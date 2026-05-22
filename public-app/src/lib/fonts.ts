import { Instrument_Sans, Staatliches } from "next/font/google";

export const staatliches = Staatliches({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap"
});

export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});
