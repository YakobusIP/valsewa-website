"use client";

import { useEffect, useRef, useState } from "react";

import { buildHeroNotchPath } from "@/components/hero/heroChromeMetrics";

interface HeroNotchCutoutMaskProps {
  className?: string;
  maskId: string;
  strokeWidth?: number;
}

export default function HeroNotchCutoutMask({
  className = "",
  maskId,
  strokeWidth = 2
}: HeroNotchCutoutMaskProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [bounds, setBounds] = useState({ width: 1920, height: 690 });

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const updateBounds = () => {
      const rect = svg.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setBounds({ width: rect.width, height: rect.height });
      }
    };

    updateBounds();

    const observer = new ResizeObserver(updateBounds);
    observer.observe(svg);

    return () => observer.disconnect();
  }, []);

  const notchPath = buildHeroNotchPath(bounds.width, bounds.height);

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox={`0 0 ${bounds.width} ${bounds.height}`}
      preserveAspectRatio="none"
    >
      <defs>
        <mask id={maskId}>
          <rect width={bounds.width} height={bounds.height} fill="white" />
          <path d={notchPath} fill="black" />
        </mask>
      </defs>
      <rect
        width={bounds.width}
        height={bounds.height}
        fill="#000000"
        mask={`url(#${maskId})`}
      />
      <path
        d={notchPath}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={strokeWidth}
        fill="none"
      />
    </svg>
  );
}
