// Mobile SVG Notch Shape Component (for screens below xl)
// The notch covers ~1/3 of the width for the VALSEWA button
export default function HeroNotchShapeMobileMiddle() {
  const W = 400;
  const H = 600;

  // Body controls
  const r = 16; // outer corner radius
  const topY = 65; // where the main body top edge sits (lower than tab top)

  // Tab controls (the "notch" in your sketch)
  const tabW = 130; // width of the tab
  const tabH = 65; // how much the tab sticks up above topY
  const tabR = 16; // roundness of tab top corners

  const tabStartX = (W - tabW) / 2;
  const tabEndX = tabStartX + tabW;

  // Safety clamps (prevents impossible geometry)
  const safeTabR = Math.min(tabR, tabW / 2 - 1);
  const safeTopY = Math.max(topY, r); // keep top edge below corner radius

  const path = `
    M ${r} ${H}
    Q 0 ${H} 0 ${H - r}
    L 0 ${safeTopY + r}
    Q 0 ${safeTopY} ${r} ${safeTopY}

    L ${tabStartX} ${safeTopY}

    L ${tabStartX} ${safeTopY - tabH + safeTabR}
    Q ${tabStartX} ${safeTopY - tabH} ${tabStartX + safeTabR} ${safeTopY - tabH}

    L ${tabEndX - safeTabR} ${safeTopY - tabH}
    Q ${tabEndX} ${safeTopY - tabH} ${tabEndX} ${safeTopY - tabH + safeTabR}
    L ${tabEndX} ${safeTopY}

    L ${W - r} ${safeTopY}
    Q ${W} ${safeTopY} ${W} ${safeTopY + r}

    L ${W} ${H - r}
    Q ${W} ${H} ${W - r} ${H}
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
          id="heroGradientMobileTab"
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

      <path d={path} fill="url(#heroGradientMobileTab)" />
      <path
        d={path}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}
