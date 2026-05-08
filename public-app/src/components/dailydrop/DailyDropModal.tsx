"use client";

import { useCallback, useEffect, useState } from "react";

import { fetchPublicDailyDrops } from "@/services/dailydrop.service";
import { fetchOperationalHours } from "@/services/setting.service";

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";

import { PublicDailyDrop } from "@/types/dailydrop.type";
import { OperationalHoursEntity } from "@/types/setting.type";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

import { DailyDropCard } from "./DailyDropCard";

// ── TZ-aware date helpers ──────────────────────────────────────────────────────
function getDateInTz(
  tz: string,
  when: Date
): { y: string; mo: string; d: string } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(when);
  return {
    y: parts.find((p) => p.type === "year")?.value ?? "",
    mo: parts.find((p) => p.type === "month")?.value ?? "",
    d: parts.find((p) => p.type === "day")?.value ?? ""
  };
}

function getOpenMsForDate(
  tz: string,
  y: string,
  mo: string,
  d: string,
  openH: number,
  openM: number
): number {
  const naiveUtcMs = Date.UTC(
    Number(y),
    Number(mo) - 1,
    Number(d),
    openH,
    openM,
    0
  );
  const offsetParts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    timeZoneName: "shortOffset",
    hour: "2-digit"
  }).formatToParts(new Date(naiveUtcMs));
  const offsetStr =
    offsetParts.find((p) => p.type === "timeZoneName")?.value ?? "GMT+0";
  const match = offsetStr.match(/GMT([+-]?)(\d{1,2})(?::?(\d{2}))?/);
  let offsetMin = 0;
  if (match) {
    const sign = match[1] === "-" ? -1 : 1;
    const hh = Number(match[2] ?? 0);
    const mm = Number(match[3] ?? 0);
    offsetMin = sign * (hh * 60 + mm);
  }
  return naiveUtcMs - offsetMin * 60_000;
}

// ── Countdown hook ─────────────────────────────────────────────────────────────
function useDailyDropCountdown(
  operationalHours: OperationalHoursEntity | null
): string {
  const [display, setDisplay] = useState("--:--:--");

  useEffect(() => {
    const hours = operationalHours;
    if (!hours) return;

    const tz = hours.timezone || "Asia/Jakarta";
    const [openH, openM] = hours.open.split(":").map(Number);

    function getTargetMs(): number {
      const now = new Date();
      const { y, mo, d } = getDateInTz(tz, now);
      const todayOpenMs = getOpenMsForDate(tz, y, mo, d, openH, openM);
      if (Date.now() < todayOpenMs) return todayOpenMs;
      return todayOpenMs + 24 * 3_600_000;
    }

    const tick = () => {
      const diff = getTargetMs() - Date.now();
      if (diff <= 0) {
        setDisplay("00:00:00");
        return;
      }
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1000);
      setDisplay(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      );
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [operationalHours]);

  return display;
}

function FlipClockUnit({ value }: { value: string }) {
  return (
    <span
      className="relative inline-flex h-[36px] w-[42px] overflow-hidden rounded-[6px] bg-[#3C31C1] text-white md:h-[42px] md:w-[48px]"
      style={{ perspective: "120px" }}
    >
      <span className="absolute inset-x-0 top-0 h-1/2 bg-white/8" />
      <span className="absolute inset-x-0 bottom-0 h-1/2 bg-black/12" />
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: "-100%", rotateX: 90, filter: "brightness(0.6)" }}
          animate={{ y: "0%", rotateX: 0, filter: "brightness(1)" }}
          exit={{ y: "100%", rotateX: -90, filter: "brightness(0.6)" }}
          transition={{
            duration: 0.38,
            ease: [0.4, 0.0, 0.15, 1]
          }}
          className="absolute inset-0 z-20 flex items-center justify-center font-antonio text-[26px] font-black leading-none md:text-[32px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
      <span className="absolute inset-x-0 top-1/2 z-30 h-px bg-black/40" />
      <span className="absolute inset-x-0 top-1/2 z-30 mt-px h-px bg-white/10" />
    </span>
  );
}

function FlipCountdown({ countdown }: { countdown: string }) {
  const [hours = "--", minutes = "--", seconds = "--"] = countdown.split(":");

  return (
    <div className="mb-[30px] flex items-center justify-center gap-3 text-white md:mb-9">
      <span className="font-antonio text-[28px] font-black uppercase leading-none tracking-normal md:text-[34px]">
        Ends In
      </span>
      <div className="flex items-center gap-[5px] [perspective:900px]">
        <FlipClockUnit value={hours} />
        <FlipClockUnit value={minutes} />
        <FlipClockUnit value={seconds} />
      </div>
    </div>
  );
}

// ── LocalStorage helpers ───────────────────────────────────────────────────────
function getDropDayKey(hours: OperationalHoursEntity | null): string {
  const tz = hours?.timezone || "Asia/Jakarta";
  const openStr = hours?.open ?? "09:00";
  const [openH, openM] = openStr.split(":").map(Number);

  const now = new Date();
  const today = getDateInTz(tz, now);
  const todayOpenMs = getOpenMsForDate(
    tz,
    today.y,
    today.mo,
    today.d,
    openH,
    openM
  );

  const anchor =
    Date.now() < todayOpenMs
      ? getDateInTz(tz, new Date(Date.now() - 24 * 3_600_000))
      : today;

  return `dailydrop_opened_${anchor.y}-${anchor.mo}-${anchor.d}`;
}

function loadOpenedSlots(hours: OperationalHoursEntity | null): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(getDropDayKey(hours));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveOpenedSlot(slot: number, hours: OperationalHoursEntity | null) {
  if (typeof window === "undefined") return;
  try {
    const key = getDropDayKey(hours);
    const existing: number[] = JSON.parse(localStorage.getItem(key) ?? "[]");
    if (!existing.includes(slot)) {
      localStorage.setItem(key, JSON.stringify([...existing, slot]));
    }
  } catch {
    /* ignore */
  }
}

// ── Card dimensions ────────────────────────────────────────────────────────────
function useMobileCardSize() {
  const [size, setSize] = useState({ w: 220, h: 340 });

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;

      // leave padding + carousel spacing
      const maxW = vw * 0.75;

      const w = Math.min(260, Math.max(160, maxW));
      const h = Math.round(w * 1.55);

      setSize({ w, h });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

const MAX_CARD_WIDTH = 350;
const CARD_GAP = 16;
const CARD_COUNT = 3;
const CONTENT_PADDING = 50;
const CARD_ASPECT_RATIO = 1.25;
const DESKTOP_HEADER_CONTENT_GAP = 15;
const DESKTOP_TIMER_CARD_GAP = 36;
const DESKTOP_MODAL_BOTTOM_PADDING = 44;

function useCardRowDimensions() {
  const compute = (vw: number, vh: number) => {
    let containerW: number;
    if (vw >= 1920) containerW = vw * (2 / 3);
    else if (vw >= 1280) containerW = vw * (3 / 4);
    else containerW = vw * (11 / 12);

    const rowW = containerW - CONTENT_PADDING;
    const wFromWidth = Math.min(
      MAX_CARD_WIDTH,
      Math.floor((rowW - CARD_GAP * (CARD_COUNT - 1)) / CARD_COUNT)
    );

    const maxModalH = vh * 0.95;
    const headerSvgH = vw / 5;
    const headerOverlapH = headerSvgH / 2;
    const verticalOverhead =
      headerSvgH -
      headerOverlapH -
      10 +
      (headerOverlapH + DESKTOP_HEADER_CONTENT_GAP) +
      DESKTOP_TIMER_CARD_GAP +
      DESKTOP_MODAL_BOTTOM_PADDING;
    const maxCardH = maxModalH - verticalOverhead;
    const wFromHeight = Math.floor(maxCardH / CARD_ASPECT_RATIO);

    const w = Math.max(160, Math.min(wFromWidth, wFromHeight));
    return { w, h: Math.round(w * CARD_ASPECT_RATIO) };
  };

  const [dims, setDims] = useState(() =>
    typeof window !== "undefined"
      ? compute(window.innerWidth, window.innerHeight)
      : { w: 200, h: 310 }
  );

  useEffect(() => {
    const update = () =>
      setDims(compute(window.innerWidth, window.innerHeight));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return dims;
}

// ── Modal ──────────────────────────────────────────────────────────────────────
interface DailyDropModalProps {
  open: boolean;
  onClose: () => void;
}

export function DailyDropModal({ open, onClose }: DailyDropModalProps) {
  const [drops, setDrops] = useState<PublicDailyDrop[]>([]);
  const [operationalHours, setOperationalHours] =
    useState<OperationalHoursEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [openedSlots, setOpenedSlots] = useState<number[]>([]);
  const { w: cardW, h: cardH } = useCardRowDimensions();
  const { w: mobileW, h: mobileH } = useMobileCardSize();

  const width = useWindowSize() ?? 1024;

  const countdown = useDailyDropCountdown(operationalHours);

  // Load data each time the modal opens
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    async function load() {
      setLoading(true);
      const [dropsData, hours] = await Promise.all([
        fetchPublicDailyDrops(),
        fetchOperationalHours()
      ]);
      if (!cancelled) {
        setDrops(dropsData);
        setOperationalHours(hours);
        setOpenedSlots(loadOpenedSlots(hours));
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [open]);

  const handleFlip = useCallback(
    (slot: number) => {
      saveOpenedSlot(slot, operationalHours);
      setOpenedSlots((prev) => (prev.includes(slot) ? prev : [...prev, slot]));
    },
    [operationalHours]
  );

  const sortedDrops = [...drops].sort((a, b) => a.slot - b.slot);
  const displayDrops: (PublicDailyDrop | null)[] = loading
    ? [null, null, null]
    : sortedDrops.length >= 3
      ? sortedDrops
      : [null, null, null];

  const headerSvgH = width / 5;
  const headerOverlapH = headerSvgH / 2;

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <DialogPortal>
        {/* Dark overlay — Radix handles Escape + outside-click via the Content */}
        <DialogOverlay className="backdrop-blur-sm" />

        {/*
          Full-screen content container.
          DialogPrimitive.Content is used directly to avoid shadcn's default
          max-w/translate styles. It handles focus-trap, aria, and Escape natively.
        */}
        <DialogPrimitive.Content className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Hidden accessible title required by Radix */}
          <DialogPrimitive.Title className="sr-only">
            Daily Drop
          </DialogPrimitive.Title>

          {/* ── DESKTOP / TABLET (md+) ──────────────────────────────────────── */}
          <div className="hidden md:flex flex-col items-center md:w-11/12 xl:w-3/4 3xl:w-2/3 max-h-[95vh]">
            {/*
              Header SVG:
              - z-[2] so it renders ABOVE the modal box (z-[1]) in the stacking context
              - negative bottom margin pulls the modal box up so the header overlaps it
              - pointer-events-none so clicks pass through to the modal box beneath
            */}
            <div
              className="relative z-[2] flex justify-center w-full shrink-0 pointer-events-none"
              style={{ height: headerSvgH, marginBottom: -headerOverlapH - 10 }}
            >
              <Image
                src="/daily-drop/daily-drop-header.svg"
                alt="Daily Drop"
                width={850}
                height={400}
                className="object-contain h-full w-auto max-w-full"
                priority
              />
            </div>

            {/* Modal rectangle — z-[1] so the header SVG overlaps it on top */}
            <div
              className="relative z-[1] w-full rounded-2xl overflow-hidden border border-white/30"
              style={{
                paddingTop: headerOverlapH + DESKTOP_HEADER_CONTENT_GAP
              }}
            >
              {/* Background SVG */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "url('/daily-drop/daily-drop-background.svg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />
              {/* Gradient overlay — red 80%, fade to black */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at top center, rgba(199,5,21,0.4) 0%, rgba(199,5,21,0.6) 30%, rgba(0,0,0,1) 100%)"
                }}
              />

              {/* X close button */}
              <DialogPrimitive.Close
                className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </DialogPrimitive.Close>

              {/* Content */}
              <div
                className="relative z-10 flex flex-col items-center px-6"
                style={{ paddingBottom: DESKTOP_MODAL_BOTTOM_PADDING }}
              >
                {/* Countdown */}
                <FlipCountdown countdown={countdown} />

                {/* Cards — each ~1/4 modal width */}
                <div className="flex items-center justify-center gap-4 w-full">
                  {displayDrops.map((drop, i) => {
                    if (!drop) {
                      return (
                        <div
                          key={i}
                          className="rounded-[13px] bg-white/10 animate-pulse shrink-0"
                          style={{ width: cardW, height: cardH }}
                        />
                      );
                    }
                    const isOpened = openedSlots.includes(drop.slot);
                    return (
                      <DailyDropCard
                        key={drop.slot}
                        drop={drop}
                        width={cardW}
                        initiallyFlipped={isOpened}
                        onFlip={() => handleFlip(drop.slot)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── MOBILE (< md) — carousel ───────────────────────────────────── */}
          <div
            className="md:hidden relative rounded-2xl overflow-hidden"
            style={{
              width: "95vw",
              maxHeight: "90vh",
              backgroundImage: "url('/daily-drop/daily-drop-background.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at top center, rgba(199,5,21,0.8) 0%, rgba(199,5,21,0.6) 30%, rgba(0,0,0,1) 100%)"
              }}
            />

            {/* X close button */}
            <DialogPrimitive.Close
              className="absolute top-3 right-3 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </DialogPrimitive.Close>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center pt-4 pb-8">
              {/* Header SVG — contained inside the mobile modal */}
              <div className="flex justify-center w-full shrink-0 mb-3">
                <Image
                  src="/daily-drop/daily-drop-header.svg"
                  alt="Daily Drop"
                  width={280}
                  height={90}
                  className="object-contain"
                  priority
                />
              </div>

              {/* Countdown */}
              <div className="shrink-0">
                <FlipCountdown countdown={countdown} />
              </div>

              {/* Cards carousel */}
              <div className="w-full flex items-center overflow-hidden">
                {loading ? (
                  <div className="flex gap-3 w-full justify-center">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="rounded-[13px] bg-white/10 animate-pulse shrink-0"
                        style={{ width: mobileW, height: mobileH }}
                      />
                    ))}
                  </div>
                ) : (
                  <Carousel
                    opts={{ align: "center", loop: true, startIndex: 1 }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-3">
                      {displayDrops.map((drop) => {
                        if (!drop) return null;
                        const isOpened = openedSlots.includes(drop.slot);
                        return (
                          <CarouselItem
                            key={drop.slot}
                            className="min-w-min shrink-0 grow-0 basis-auto pl-3 w-max py-4"
                          >
                            <DailyDropCard
                              drop={drop}
                              width={mobileW}
                              initiallyFlipped={isOpened}
                              onFlip={() => handleFlip(drop.slot)}
                            />
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    {/* No arrows per spec */}
                  </Carousel>
                )}
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

function useWindowSize() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    handleResize(); // initial
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
