"use client";

import { fetchPublicDailyDrops } from "@/services/dailydrop.service";
import { fetchOperationalHours } from "@/services/setting.service";
import { PublicDailyDrop } from "@/types/dailydrop.type";
import { OperationalHoursEntity } from "@/types/setting.type";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { DailyDropCard } from "./DailyDropCard";

// ── Countdown hook ─────────────────────────────────────────────────────────────
function useDailyDropCountdown(operationalHours: OperationalHoursEntity | null): string {
  const [display, setDisplay] = useState("--:--:--");

  useEffect(() => {
    if (!operationalHours) return;

    const tz = operationalHours.timezone || "Asia/Jakarta";
    const buffer = operationalHours.lastOrderBufferInMinutes ?? 30;

    function getTargetMs(): number {
      const now = new Date();
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).formatToParts(now);
      const year = parts.find((p) => p.type === "year")?.value ?? "";
      const month = parts.find((p) => p.type === "month")?.value ?? "";
      const day = parts.find((p) => p.type === "day")?.value ?? "";
      const [closeH, closeM] = operationalHours.close.split(":").map(Number);
      const closeMinutes = closeH * 60 + closeM - buffer;
      const targetH = Math.floor(closeMinutes / 60);
      const targetM = closeMinutes % 60;
      const targetStr = `${year}-${month}-${day}T${String(targetH).padStart(2, "0")}:${String(targetM).padStart(2, "0")}:00`;
      return new Date(targetStr).getTime();
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

// ── LocalStorage helpers ───────────────────────────────────────────────────────
function getTodayKey(tz = "Asia/Jakarta"): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());
  const y = parts.find((p) => p.type === "year")?.value ?? "";
  const mo = parts.find((p) => p.type === "month")?.value ?? "";
  const d = parts.find((p) => p.type === "day")?.value ?? "";
  return `dailydrop_opened_${y}-${mo}-${d}`;
}

function loadOpenedSlots(tz?: string): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(getTodayKey(tz));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveOpenedSlot(slot: number, tz?: string) {
  if (typeof window === "undefined") return;
  try {
    const key = getTodayKey(tz);
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

function useCardRowDimensions(rowRef: RefObject<HTMLDivElement | null>, numCards = 3, gap = 20) {
  const [dims, setDims] = useState({ w: 220, h: 340 });
  useEffect(() => {
    if (!rowRef.current) return;
    const update = () => {
      const rowW = rowRef.current?.offsetWidth ?? 660;
      const w = Math.floor((rowW - gap * (numCards - 1)) / numCards);
      setDims({ w, h: Math.round(w * 1.55) });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(rowRef.current);
    return () => ro.disconnect();
  }, [rowRef, numCards, gap]);
  return dims;
}

// ── Modal ──────────────────────────────────────────────────────────────────────
interface DailyDropModalProps {
  open: boolean;
  onClose: () => void;
}

export function DailyDropModal({ open, onClose }: DailyDropModalProps) {
  const [drops, setDrops] = useState<PublicDailyDrop[]>([]);
  const [operationalHours, setOperationalHours] = useState<OperationalHoursEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [openedSlots, setOpenedSlots] = useState<number[]>([]);
  const cardRowRef = useRef<HTMLDivElement>(null);
  const { w: cardW, h: cardH } = useCardRowDimensions(cardRowRef);
  const { w: mobileW, h: mobileH } = useMobileCardSize();

  const width = useWindowSize();

  const countdown = useDailyDropCountdown(operationalHours);
  const tz = operationalHours?.timezone ?? "Asia/Jakarta";

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
        setOpenedSlots(loadOpenedSlots(hours?.timezone));
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [open]);

  const handleFlip = useCallback(
    (slot: number) => {
      saveOpenedSlot(slot, tz);
      setOpenedSlots((prev) => (prev.includes(slot) ? prev : [...prev, slot]));
    },
    [tz]
  );

  const sortedDrops = [...drops].sort((a, b) => a.slot - b.slot);
  const displayDrops: (PublicDailyDrop | null)[] =
    loading ? [null, null, null] : sortedDrops.length >= 3 ? sortedDrops : [null, null, null];

  const headerSvgH = width/7.5;
  const headerOverlapH = headerSvgH / 2;

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
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
          <DialogPrimitive.Title className="sr-only">Daily Drop</DialogPrimitive.Title>

          {/* ── DESKTOP / TABLET (md+) ──────────────────────────────────────── */}
          <div className="hidden md:flex flex-col items-center w-3/4 3xl:w-2/3 max-h-[90vh]">
            {/*
              Header SVG:
              - z-[2] so it renders ABOVE the modal box (z-[1]) in the stacking context
              - negative bottom margin pulls the modal box up so the header overlaps it
              - pointer-events-none so clicks pass through to the modal box beneath
            */}
            <div
              className="relative z-[2] flex justify-center w-full shrink-0 pointer-events-none"
              style={{ height: headerSvgH, marginBottom: -headerOverlapH-10 }}
            >
              <Image
                src="/daily-drop/daily-drop-header.svg"
                alt="Daily Drop"
                width={850}
                height={400}
                className="object-contain"
                priority
              />
            </div>

            {/* Modal rectangle — z-[1] so the header SVG overlaps it on top */}
            <div
              className="relative z-[1] w-full rounded-2xl overflow-hidden border border-white/30"
              style={{ paddingTop: headerOverlapH + 32 }}
            >
              {/* Background SVG */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/daily-drop/daily-drop-background.svg')",
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
              <div className="relative z-10 flex flex-col items-center px-6 pb-8">
                {/* Countdown */}
                <p className="font-instrumentSans text-white mb-2 flex items-center gap-2">
                  <span style={{ fontWeight: 600, fontSize: 16 }}>OFFER ENDS IN</span>
                  <span style={{ fontWeight: 800, fontSize: 16 }}>{countdown}</span>
                </p>

                {/* Cards — each ~1/4 modal width */}
                <div ref={cardRowRef} className="flex items-center justify-center gap-5 w-full">
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
                        height={cardH}
                        initiallyFlipped={isOpened}
                        onFlip={() => handleFlip(drop.slot)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── MOBILE (< md) ───────────────────────────────────────────────── */}
          <div
            className="md:hidden relative rounded-2xl overflow-hidden"
            style={{
              width: "95vw",
              minHeight: "80vh",
              height: "auto",
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
            <div className="relative z-10 flex flex-col items-center h-full pt-4">
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
              <p className="font-instrumentSans text-white mb-5 flex items-center gap-2 shrink-0">
                <span style={{ fontWeight: 400, fontSize: 14 }}>OFFER ENDS IN</span>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{countdown}</span>
              </p>

              {/* Cards carousel */}
              <div className="w-full flex-1 flex items-center overflow-visible md:overflow-hidden">
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
                          <CarouselItem key={drop.slot} className="pl-3 basis-[85%] sm:basis-[78%]">
                            <div className="flex justify-center">
                              <DailyDropCard
                                drop={drop}
                                width={mobileW}
                                height={mobileH}
                                initiallyFlipped={isOpened}
                                onFlip={() => handleFlip(drop.slot)}
                              />
                            </div>
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