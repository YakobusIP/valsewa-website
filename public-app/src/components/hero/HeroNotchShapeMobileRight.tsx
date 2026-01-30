// Mobile SVG Notch Shape Component (for screens below xl)
// The notch covers ~1/3 of the width for the VALSEWA button
export default function HeroNotchShapeMobileRight() {
  const W = 400;
  const H = 600;

  // Outer body
  const r = 12; // outer corner radius
  const topY = 65; // main body top edge (lower than the tab)

  // Tab (the raised part on the right)
  const tabW = 120; // width of the tab
  const tabH = 65; // how much it sticks up above topY
  const tabR = 12; // roundness of the tab's top-left corner

  const tabTopY = topY - tabH;

  // Tab touches the right corner, so it ends at (W - r) before the rounded corner
  const tabEndX = W - r;
  const tabStartX = tabEndX - tabW;

  const safeTabR = Math.min(tabR, tabW / 2 - 1);

  const path = `
    M ${r} ${H}
    Q 0 ${H} 0 ${H - r}
    L 0 ${topY + r}
    Q 0 ${topY} ${r} ${topY}

    L ${tabStartX} ${topY}

    L ${tabStartX} ${tabTopY + safeTabR}
    Q ${tabStartX} ${tabTopY} ${tabStartX + safeTabR} ${tabTopY}

    L ${tabEndX} ${tabTopY}
    Q ${W} ${tabTopY} ${W} ${tabTopY + r}

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
          id="heroGradientMobileRightTab"
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

      <path d={path} fill="url(#heroGradientMobileRightTab)" />
      <path
        d={path}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}
