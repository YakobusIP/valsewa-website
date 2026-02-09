// Tablet SVG Notch Shape Component (for screens between md and xl)
// The notch covers ~1/3 of the width for the VALSEWA button
export default function HeroNotchShapeTablet() {
  // ViewBox: 768 wide x 1280 tall (tablet proportions)
  // Notch: ~130px wide (1/3 of width), 65px tall, at top-left
  // This covers the VALSEWA button in the brand switcher
  const W = 768;
  const H = 1280;

  // Keep radius consistent with desktop feel (mobile used 12, desktop 16)
  const r = 16;

  const notchW = 100; // <-- this is what you actually control
  const curveW = 22; // same curve softness as before
  const topPad = 32; // space before notch starts

  const notchFlatX = topPad + (notchW - curveW);
  const notchX = topPad + notchW;
  const innerCurveX = notchX + curveW;

  const innerVertY = 143; // 43 * 1.92 ≈ 82.6 -> 0.65 * notchH
  const notchH = 220; // 65 * 1.92 = 124.8
  const topRightY = notchH + 4; // mobile had +2 (67 vs 65), scaled-ish

  const notchPath = `
    M ${r} ${H}
    Q 0 ${H} 0 ${H - r}
    L 0 ${r}
    Q 0 0 ${r} 0
    L ${notchFlatX} 0
    Q ${notchX} 0 ${notchX} ${r}
    L ${notchX} ${innerVertY}
    Q ${notchX} ${notchH} ${innerCurveX} ${notchH}
    L ${W - r} ${notchH}
    Q ${W} ${notchH} ${W} ${topRightY}
    L ${W} ${H - r}
    Q ${W} ${H} ${W - r} ${H}
    Z
  `;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none hidden md:block xl:hidden"
      viewBox="0 0 768 1280"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient
          id="heroGradientMobile"
          cx="0%"
          cy="50%"
          r="100%"
          fx="0%"
          fy="50%"
        >
          <stop offset="0%" stopColor="#210004" />
          <stop offset="70%" stopColor="#000000" />
        </radialGradient>
      </defs>

      {/* Background fill */}
      <path d={notchPath} fill="url(#heroGradientMobile)" />

      {/* Border stroke */}
      <path
        d={notchPath}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}
