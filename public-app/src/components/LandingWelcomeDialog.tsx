"use client";

import { type ReactNode, useEffect, useState } from "react";

import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";

import { instrumentSans } from "@/lib/fonts";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  ArrowUpRight,
  Banknote,
  KeyRound,
  type LucideIcon,
  MessageCircle,
  ShoppingBag,
  Users,
  X,
  Zap
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const VALFORUM_TOPUP_URL = "https://valforum.com/top-up";
const VALJUBEL_URL = "https://www.valjubel.com";
const ADMIN_WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=628891234599&text&type=phone_number&app_absent=0";
const WHATSAPP_COMMUNITY_URL =
  "https://whatsapp.com/channel/0029VbCWZbpL7UVUiAkkQR2s";

// Shown on every visit to the home page; opting out hides it for a day.
const OPTED_OUT_KEY = "vf_landing_welcome:opted_out";
const OPT_OUT_MS = 24 * 60 * 60 * 1000;

function hasOptedOut(): boolean {
  try {
    const optedOutAt = Number(window.localStorage.getItem(OPTED_OUT_KEY));
    // A missing or unreadable value comes out as 0 or NaN, so it shows.
    return Date.now() - optedOutAt < OPT_OUT_MS;
  } catch {
    return false;
  }
}

function rememberOptOut(): void {
  try {
    window.localStorage.setItem(OPTED_OUT_KEY, String(Date.now()));
  } catch {
    // Private mode or blocked storage: it just shows again next time.
  }
}

// Monochrome at rest (unless `colored`); hovering the option lights the pill
// up in the logo's own colour. Class names stay literal so Tailwind sees them.
const BRANDS = {
  valforum: {
    src: "/header/Valforum.svg",
    alt: "Valforum",
    glowClassName:
      "group-hover:border-[#cbb459] group-hover:shadow-[0_0_0.875em_rgb(203_180_89/0.45)] group-focus-visible:border-[#cbb459]",
    logoGlowClassName:
      "group-hover:drop-shadow-[0_0_0.375em_rgb(203_180_89/0.6)]"
  },
  valjubel: {
    src: "/header/VALJUBEL.svg",
    alt: "Valjubel",
    glowClassName:
      "group-hover:border-[#b723c5] group-hover:shadow-[0_0_0.875em_rgb(183_35_197/0.5)] group-focus-visible:border-[#b723c5]",
    logoGlowClassName:
      "group-hover:drop-shadow-[0_0_0.375em_rgb(183_35_197/0.6)]"
  },
  valsewa: {
    src: "/header/VALSEWA.svg",
    alt: "Valsewa",
    glowClassName:
      "group-hover:border-[#d61a1a] group-hover:shadow-[0_0_0.875em_rgb(214_26_26/0.5)] group-focus-visible:border-[#d61a1a]",
    logoGlowClassName:
      "group-hover:drop-shadow-[0_0_0.375em_rgb(214_26_26/0.6)]"
  }
} as const;

const monochromeLogoClassName =
  "brightness-[1.6] grayscale group-hover:brightness-100 group-hover:grayscale-0 group-focus-visible:brightness-100 group-focus-visible:grayscale-0";

function BrandPill({
  brand,
  colored = false
}: {
  brand: keyof typeof BRANDS;
  colored?: boolean;
}) {
  const { src, alt, glowClassName, logoGlowClassName } = BRANDS[brand];

  return (
    <span
      className={`flex h-[1.75em] w-[7.25em] shrink-0 items-center justify-center rounded-[0.5em] border border-[#222226] bg-[#17171b] transition duration-300 ${glowClassName}`}
    >
      <Image
        src={src}
        width={3945}
        height={935}
        alt={alt}
        className={`h-[1.25em] w-auto transition duration-300 ${colored ? "" : monochromeLogoClassName} ${logoGlowClassName}`}
      />
    </span>
  );
}

const OPTIONS: Array<{
  label: string;
  href: string;
  icon: LucideIcon;
  trailing: ReactNode;
  // This site's own service: highlighted and listed first.
  featured?: boolean;
}> = [
  {
    label: "Sewa Akun",
    href: "/search",
    icon: KeyRound,
    trailing: <BrandPill brand="valsewa" colored />,
    featured: true
  },
  {
    label: "Top Up",
    href: VALFORUM_TOPUP_URL,
    icon: Zap,
    trailing: <BrandPill brand="valforum" />
  },
  {
    label: "Jual Akun",
    href: ADMIN_WHATSAPP_URL,
    icon: Banknote,
    trailing: <BrandPill brand="valjubel" />
  },
  {
    label: "Beli Akun",
    href: VALJUBEL_URL,
    icon: ShoppingBag,
    trailing: <BrandPill brand="valjubel" />
  },
  {
    label: "Join Komunitas WhatsApp",
    href: WHATSAPP_COMMUNITY_URL,
    icon: Users,
    trailing: <ArrowUpRight aria-hidden className="size-[1em] text-white/45" />
  },
  {
    label: "Hubungi Admin",
    href: ADMIN_WHATSAPP_URL,
    icon: MessageCircle,
    trailing: <span className="text-[0.8125em] text-[#8a8a8c]">24 jam</span>
  }
];

// The options rise in one by one, starting once the card has scaled in.
const riseDelay = (index: number) => `${250 + index * 90}ms`;

// A 1px border that runs gold at the top into red at the bottom, over a dark
// card with a faint red glow in the bottom-right corner.
const cardBackground = [
  "radial-gradient(90% 40% at 100% 100%, rgb(130 18 28 / 0.3), transparent 75%) padding-box",
  "linear-gradient(#0f0f11, #0f0f11) padding-box",
  "linear-gradient(to bottom, #6e6538, #2a2216 45%, #3d1311 75%, #7a0f15) border-box"
].join(", ");

export default function LandingWelcomeDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!hasOptedOut()) setOpen(true);
  }, []);

  const optOut = () => {
    rememberOptOut();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogOverlay />
        {/* Everything inside is sized in em of the card's font size, so the
            whole card scales as one: 1.3x the 16px design (22.5em wide, about
            33em tall), shrinking to fit narrower or shorter screens.
            The -translate centring shares `transform` with the zoom keyframes,
            so the slide-in/out-1/2 offsets keep the card zooming in place.
            The rise-in briefly pushes the last row past the bottom edge, so the
            scrollbar stays hidden; short screens can still scroll the card. */}
        <DialogPrimitive.Content
          // Focus the card itself rather than its first control, so no focus
          // ring appears on a dialog the visitor didn't open.
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            (event.currentTarget as HTMLElement).focus();
          }}
          style={{ background: cardBackground }}
          className={`${instrumentSans.className} fixed top-1/2 left-1/2 z-50 max-h-[calc(100svh-2rem)] w-[22.5em] -translate-x-1/2 -translate-y-1/2 no-scrollbar overflow-x-hidden overflow-y-auto rounded-[1.125em] border border-transparent text-[length:min(1.3rem,calc((100vw_-_2rem)/22.5),calc((100svh_-_2rem)/34))] text-white shadow-[0_24px_80px_rgb(0_0_0/0.6)] duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-1/2 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-1/2`}
        >
          <div className="relative border-b border-[#45412b] bg-[radial-gradient(75%_100%_at_0%_0%,rgb(120_105_55/0.55),transparent_70%)] px-[1.375em] py-[1.5em]">
            <div className="flex items-center gap-[0.625em]">
              <Image
                src={BRANDS.valsewa.src}
                width={3945}
                height={935}
                alt="Valsewa"
                className="h-[1.5em] w-auto"
              />
              <span className="text-[0.8125em] text-white/45">by</span>
              <Image
                src={BRANDS.valforum.src}
                width={3945}
                height={935}
                alt="Valforum"
                className="h-[0.8em] w-auto"
              />
            </div>
            {/* Radix renders an h2, which the base styles set in Antonio. */}
            <DialogPrimitive.Title
              className={`${instrumentSans.className} landing-welcome-focus mt-[1em] text-[1.25em] font-semibold text-[#d9d9d9]`}
            >
              Forum butuh apa?
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              Pilih layanan Valforum yang kamu butuhkan.
            </DialogPrimitive.Description>
            <DialogPrimitive.Close
              aria-label="Tutup"
              className="absolute top-[0.75em] right-[0.75em] flex size-[2.5em] items-center justify-center rounded-[0.75em] bg-black/30 text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <X aria-hidden className="size-[1em]" />
            </DialogPrimitive.Close>
          </div>

          <nav className="flex flex-col gap-[0.5em] p-[1.25em]">
            {OPTIONS.map(
              ({ label, href, icon: Icon, trailing, featured }, index) => (
                <Link
                  key={label}
                  href={href}
                  style={{ animationDelay: riseDelay(index) }}
                  className={`landing-welcome-rise group relative flex h-[3em] items-center gap-[0.75em] rounded-[0.75em] border pr-[0.625em] pl-[1.125em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d6c56a] ${
                    featured
                      ? "border-[#6b6438] bg-gradient-to-r from-[#120e11] to-[#2a1217] shadow-[0_0_1.5em_0.3em_rgb(140_20_30/0.45)]"
                      : "border-[#28282d] bg-[#171719] hover:border-[#6b6438] hover:bg-[#1c1b1e]"
                  }`}
                >
                  <Icon
                    aria-hidden
                    strokeWidth={1.75}
                    className={`size-[1.125em] shrink-0 ${featured ? "text-[#d6c56a]" : "text-white/85 transition-colors duration-300 group-hover:text-[#d6c56a] group-focus-visible:text-[#d6c56a]"}`}
                  />
                  {/* Slides right on hover to read as "selected"; padding
                      rather than a transform keeps the ellipsis honest. */}
                  <span className="flex-1 truncate text-[0.9375em] font-bold transition-[padding-left] duration-300 ease-out group-hover:pl-[0.5em] group-focus-visible:pl-[0.5em] motion-reduce:transition-none">
                    {label}
                  </span>
                  {trailing}
                  {/* Clipped on its own layer so the brand pill's glow isn't. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
                  >
                    <span className="landing-welcome-shine absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  </span>
                </Link>
              )
            )}
          </nav>

          <div
            className="landing-welcome-rise flex justify-center pb-[1.25em]"
            style={{ animationDelay: riseDelay(OPTIONS.length) }}
          >
            <button
              type="button"
              onClick={optOut}
              className="text-[0.8125em] text-[#8f8f8f] underline decoration-white/25 underline-offset-[0.3em] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              Jangan tampilkan lagi
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
