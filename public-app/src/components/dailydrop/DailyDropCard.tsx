"use client";

import {
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState
} from "react";

import { PublicDailyDrop } from "@/types/dailydrop.type";

import { getRankImageUrl } from "@/lib/utils";

import Image from "next/image";

// ── Lightweight spring interpolator ──────────────────────────────────────────
function useSpringValue(stiffness = 300, damping = 40) {
  const state = useRef({ pos: 0, vel: 0, target: 0 });
  const raf = useRef<number | null>(null);
  const listeners = useRef(new Set<(v: number) => void>());

  const tick = useCallback(() => {
    const s = state.current;
    const force = stiffness * (s.target - s.pos) - damping * s.vel;
    const dt = 1 / 60;
    s.vel += force * dt;
    s.pos += s.vel * dt;
    listeners.current.forEach((fn) => fn(s.pos));
    if (Math.abs(s.vel) > 0.001 || Math.abs(s.target - s.pos) > 0.001) {
      raf.current = requestAnimationFrame(tick);
    } else {
      s.pos = s.target;
      s.vel = 0;
      listeners.current.forEach((fn) => fn(s.pos));
    }
  }, [stiffness, damping]);

  const setTarget = useCallback(
    (target: number) => {
      state.current.target = target;
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(tick);
    },
    [tick]
  );

  const subscribe = useCallback((fn: (v: number) => void) => {
    listeners.current.add(fn);
    return () => listeners.current.delete(fn);
  }, []);

  useEffect(
    () => () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    },
    []
  );

  return [subscribe, setTarget] as const;
}

function buildTransform(rx: number, ry: number) {
  return `rotateX(${rx}deg) rotateY(${ry}deg)`;
}

const FLIP_DURATION_MS = 1650;
const GLOW_DELAY_MS = FLIP_DURATION_MS + 200;
const GLOW_DURATION_MS = 1000;

// ── Triangle SVG with gradient for discount corner ────────────────────────────
function GoldTriangle({ size }: { size: number }) {
  const gradientId = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute top-0 left-0"
      style={{ pointerEvents: "none" }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFE481" />
          <stop offset="50%" stopColor="#9E8D4E" />
          <stop offset="100%" stopColor="#FFE481" />
        </linearGradient>
      </defs>
      <polygon points={`0,0 ${size},0 0,${size}`} fill={`url(#${gradientId})`} />
    </svg>
  );
}

// ── Card back face ────────────────────────────────────────────────────────────
interface CardBackProps {
  drop: PublicDailyDrop;
  cardWidth: number;
  cardHeight: number;
}

function CardBack({ drop, cardWidth, cardHeight }: CardBackProps) {
  const isSold = drop.isSold;
  const triangleSize = Math.round(cardWidth * 0.42);
  const discountFontSize = triangleSize * 0.22;
  const thumbSize = Math.round(cardWidth * 0.8);
  const offsetY = triangleSize * 0.4;
  const offsetX = triangleSize * -0.4;
  const displayCode = drop.account.priceTier.code.includes("COMP -")
    ?  drop.account.priceTier.code
    : `UNRATED - ${drop.account.priceTier.code}`;

  const handleRent = (e: ReactMouseEvent) => {
    e.stopPropagation();
    const url = new URL(`/details/${drop.account.id}`, window.location.origin);
    url.searchParams.set("mode", "dailydrop");
    url.searchParams.set("priceListId", String(drop.priceList.id));
    url.searchParams.set("discount", String(drop.discount));
    window.open(url.toString(), "_blank");
  };

  return (
    <div
      className="relative w-full h-full rounded-[13px] overflow-hidden flex flex-col"
      style={{ background: "linear-gradient(to bottom, #656565, #000000)", position: "relative", zIndex: 0 }}
    >
      {/* Gold triangle + discount */}
      <div className="absolute top-0 left-0" style={{ zIndex: 49, transform: "translate3d(0,0,1px)" }}>
        <GoldTriangle size={triangleSize} />
        <span
          className="absolute font-antonio leading-none select-none"
          style={{
            fontSize: discountFontSize,
            fontWeight: 1000,
            letterSpacing: "-0.05em",
            color: "#846800",
            lineHeight: 1,

            transform: `rotate(-45deg) translateY(${offsetY}px) translateX(${offsetX}px)`,
            transformOrigin: "left top",
            whiteSpace: "nowrap"
          }}
        >
          {drop.discount}%
        </span>
      </div>

      {/* Skins amount — top right */}
      <div
        className="absolute top-16 right-6 text-white text-[10px] font-instrumentSans font-normal leading-tight text-right"
        style={{ zIndex: 2 }}
      >
        Skins Amount | {drop.account.skinCount}
      </div>

      {/* Thumbnail — centered */}
      <div className="flex items-center justify-center pt-20 pb-1">
        <div
          className="rounded-lg shrink-0"
          style={{
            width: thumbSize + 6,
            height: (thumbSize * 3) / 5 + 6,
            background: "linear-gradient(135deg, #D7D7D7 0%, #000000 100%)",
            padding: 3
          }}
        >
          <div
            className="relative rounded-md overflow-hidden bg-neutral-800"
            style={{ width: thumbSize, height: (thumbSize * 3) / 5 }}
          >
            {drop.account.thumbnail?.imageUrl ? (
              <Image
                src={drop.account.thumbnail.imageUrl}
                fill
                alt={drop.account.nickname}
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-neutral-700" />
            )}
          </div>
        </div>
      </div>

      {/* Info row below thumbnail */}
      <div className="flex items-center justify-between px-5 pb-1 gap-1 shrink-0">
        {/* Left: rank image + name + account code */}
        <div className="flex items-center gap-1 min-w-0 shrink">
          <Image
            src={getRankImageUrl(drop.account.accountRank)}
            alt={drop.account.accountRank}
            width={20}
            height={20}
            className="shrink-0"
            unoptimized
          />
          <span
            className="text-white font-antonio font-normal truncate"
            style={{
              letterSpacing: "-0.005rem",
              fontWeight: "bold",
              fontSize: Math.max(10, Math.round(cardWidth * 0.06))
            }}
          >
            {drop.account.accountRank.toUpperCase()} |{" "}
            {drop.account.accountCode}
          </span>
        </div>
        {/* Right: price tier */}
        <div
          className="relative flex items-center justify-center shrink-0"
          style={{
            width: Math.max(36, Math.round(cardWidth * 0.24)),
            height: Math.max(18, Math.round(cardWidth * 0.12))
          }}
        >
          {/* Background image */}
          <Image
            src={
              drop.account.priceTier.code.includes("COMP")
                ? "/tier-badge-comp.svg"
                : "/tier-badge-unrated.svg"
            }
            alt="tier badge"
            fill
            className="object-contain"
            unoptimized
          />

          {/* Text overlay */}
          <span
            className="relative z-10 text-white font-antonio font-semibold text-right"
            style={{
              fontSize: Math.max(9, Math.round(cardWidth * 0.01)),
              lineHeight: 1
            }}
          >
            {displayCode}
          </span>
        </div>
      </div>

      {/* Rent button */}
      <div className="px-4 pb-4 pt-6 shrink-0">
        <button
          onClick={handleRent}
          disabled={isSold}
          className="w-full bg-[#C70515] hover:bg-[#a50411] disabled:bg-[#C70515]/40 text-white border border-white/70 font-antonio font-normal rounded-lg transition"
          style={{
            fontSize: Math.max(11, Math.round(cardWidth * 0.075)),
            padding: "16px"
          }}
        >
          RENT ACCOUNT
        </button>
      </div>

      {/* SOLD overlay */}
      {isSold && (
        <div className="absolute inset-0 bg-black/70 rounded-[13px] flex items-center justify-center overflow-hidden z-50">
          <span
            className="text-white font-bold tracking-widest select-none"
            style={{
              fontSize: Math.round(cardWidth * 0.22),
              transform: "rotate(-25deg)",
              whiteSpace: "nowrap",
              opacity: 0.9
            }}
          >
            SOLD
          </span>
        </div>
      )}
    </div>
  );
}

// ── Card front face ────────────────────────────────────────────────────────────
function CardFront() {
  return (
    <div className="relative w-full h-full rounded-[13px] overflow-hidden">
      <Image
        src="/daily-drop/daily-drop-card.svg"
        fill
        alt="Daily Drop Card"
        className="object-cover"
        priority
      />
    </div>
  );
}

// ── Tilt inner ref type ────────────────────────────────────────────────────────
interface TiltElement extends HTMLDivElement {
  _rx?: number;
  _ry?: number;
}

// ── Main DailyDropCard — wraps flip + tilt logic ──────────────────────────────
interface DailyDropCardProps {
  drop: PublicDailyDrop;
  width: number;
  height: number;
  /** If true, card starts already flipped (previously opened) */
  initiallyFlipped?: boolean;
  onFlip?: () => void;
}

export function DailyDropCard({
  drop,
  width,
  height,
  initiallyFlipped = false,
  onFlip
}: DailyDropCardProps) {
  const [isFlipped, setIsFlipped] = useState(initiallyFlipped);
  const [glowing, setGlowing] = useState(false);

  const innerRef = useRef<TiltElement>(null);
  const [subscribeX, setTargetX] = useSpringValue(300, 40);
  const [subscribeY, setTargetY] = useSpringValue(300, 40);

  useEffect(
    () =>
      subscribeX((v) => {
        if (innerRef.current) {
          innerRef.current._rx = -v;
          innerRef.current.style.transform = buildTransform(
            -v,
            innerRef.current._ry ?? 0
          );
        }
      }),
    [subscribeX]
  );

  useEffect(
    () =>
      subscribeY((v) => {
        if (innerRef.current) {
          innerRef.current._ry = v;
          innerRef.current.style.transform = buildTransform(
            innerRef.current._rx ?? 0,
            v
          );
        }
      }),
    [subscribeY]
  );

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent) => {
      if (isFlipped) return;
      const el = innerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mx = e.clientY - rect.top - rect.height / 2;
      const my = e.clientX - rect.left - rect.width / 2;
      setTargetX((mx / rect.width) * 20);
      setTargetY((my / rect.height) * 20);
    },
    [isFlipped, setTargetX, setTargetY]
  );

  const handleMouseLeave = useCallback(() => {
    setTargetX(0);
    setTargetY(0);
  }, [setTargetX, setTargetY]);

  const handleClick = useCallback(() => {
    if (isFlipped) return;
    setIsFlipped(true);
    setTargetX(0);
    setTargetY(0);
    onFlip?.();
    setTimeout(() => {
      setGlowing(true);
      setTimeout(() => setGlowing(false), GLOW_DURATION_MS);
    }, GLOW_DELAY_MS);
  }, [isFlipped, setTargetX, setTargetY, onFlip]);

  // Sync if initiallyFlipped changes (e.g. modal re-opened)
  useEffect(() => {
    setIsFlipped(initiallyFlipped);
  }, [initiallyFlipped]);

  const faceStyle = (flipped: boolean): CSSProperties => ({
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    zIndex: flipped === isFlipped ? 1 : 0,
    transition: `transform ${FLIP_DURATION_MS}ms cubic-bezier(0.23,1,0.32,1)`,
    transform: flipped
      ? isFlipped
        ? "rotateY(0deg)"
        : "rotateY(180deg)"
      : isFlipped
        ? "rotateY(-180deg)"
        : "rotateY(0deg)"
  });

  return (
    <div
      onClick={handleClick}
      style={{
        perspective: "1200px",
        width,
        height,
        cursor: isFlipped ? "default" : "pointer",
        flexShrink: 0
      }}
    >
      <div
        ref={innerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          borderRadius: 13,
          transition: glowing
            ? `box-shadow ${GLOW_DURATION_MS}ms ease-in-out`
            : "none",
          boxShadow: glowing
            ? "0 0 18px 6px rgba(255,255,255,0.85)"
            : "0 0 0px 0px rgba(255,255,255,0)"
        }}
      >
        <div
          style={{
            transformStyle: "preserve-3d",
            width: "100%",
            height: "100%",
            position: "relative"
          }}
        >
          {/* Front */}
          <div style={faceStyle(false)}>
            <CardFront />
          </div>
          {/* Back */}
          <div style={faceStyle(true)}>
            <CardBack drop={drop} cardWidth={width} cardHeight={height} />
          </div>
        </div>
      </div>
    </div>
  );
}
