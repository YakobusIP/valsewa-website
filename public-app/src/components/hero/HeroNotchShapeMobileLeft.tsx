// Mobile SVG Notch Shape Component (for screens below xl)
// The notch covers ~1/3 of the width for the VALSEWA button
export default function HeroNotchShapeMobileLeft() {
  const W = 400;
  const H = 600;

  // Outer corner radius (matches your path: 12 + 588/388 usage)
  const r = 12;

  // Notch geometry (unchanged)
  const notchFlatX = 118;
  const notchX = 130;
  const innerCurveX = 142;

  const innerVertY = 43;
  const notchH = 65;

  // Right-side top transition (unchanged)
  const rightCornerX = 388; // W - r
  const topRightY = 67; // little step you had after 65

  const notchPath = `
    M ${r} ${H}
    Q 0 ${H} 0 ${H - r}
    L 0 ${r}
    Q 0 0 ${r} 0

    L ${notchFlatX} 0
    Q ${notchX} 0 ${notchX} ${r}
    L ${notchX} ${innerVertY}
    Q ${notchX} ${notchH} ${innerCurveX} ${notchH}

    L ${rightCornerX} ${notchH}
    Q ${W} ${notchH} ${W} ${topRightY}
    L ${W} ${H - r}
    Q ${W} ${H} ${rightCornerX} ${H}
    Z
  `;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none md:hidden pt-16"
      viewBox={`0 0 ${W} ${H}`}
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

      <path d={notchPath} fill="url(#heroGradientMobile)" />
      <path
        d={notchPath}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}
