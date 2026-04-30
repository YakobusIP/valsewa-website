export const heroChromeVars = {
  "--hero-nav-left-offset": "clamp(24px, 1.5vw, 28px)",
  "--hero-valforum-logo-width": "clamp(80px, 7vw, 130px)",
  "--hero-logo-switcher-gap": "clamp(16px, 1.8vw, 28px)",
  "--hero-switcher-logo-width": "clamp(76px, 6.8vw, 118px)",
  "--hero-switcher-shell-padding-x": "clamp(8px, 0.9vw, 14px)",
  "--hero-switcher-item-padding-x": "clamp(8px, 1vw, 18px)",
  "--hero-notch-height": "clamp(62px, 3.9vw, 75px)",
  "--hero-tab-curve": "clamp(18px, 1.2vw, 22px)",
  "--hero-valforum-tab-width":
    "calc(var(--hero-nav-left-offset) + var(--hero-valforum-logo-width) + clamp(8px, 0.8vw, 12px))"
} as const;

function clamp(min: number, preferred: number, max: number) {
  return Math.min(Math.max(preferred, min), max);
}

export function getHeroChromeMetrics(width: number) {
  const valforumLogoWidth = clamp(80, width * 0.07, 130);
  const navLeftOffset = clamp(24, width * 0.015, 28);
  const tabRightPadding = clamp(8, width * 0.008, 12);
  const notchHeight = clamp(62, width * 0.039, 75);
  const curveSize = clamp(16, width * 0.012, 20);

  return {
    curveSize,
    navLeftOffset,
    notchHeight,
    tabWidth: navLeftOffset + valforumLogoWidth + tabRightPadding
  };
}

export function buildHeroNotchPath(width: number, height: number) {
  const r = 16;
  const safeWidth = Math.max(width, r * 6);
  const safeHeight = Math.max(height, r * 6);
  const metrics = getHeroChromeMetrics(safeWidth);
  const tabX = Math.min(metrics.tabWidth, safeWidth - r * 4);
  const topY = Math.min(metrics.notchHeight, safeHeight - r * 3);
  const curve = Math.min(metrics.curveSize, safeWidth - tabX - r * 2);
  const tabBottomY = Math.max(r, topY - curve);

  return `
    M ${r} ${safeHeight}
    Q 0 ${safeHeight} 0 ${safeHeight - r}
    L 0 ${r}
    Q 0 0 ${r} 0
    L ${tabX - r} 0
    Q ${tabX} 0 ${tabX} ${r}
    L ${tabX} ${tabBottomY}
    Q ${tabX} ${topY} ${tabX + curve} ${topY}
    L ${safeWidth - r} ${topY}
    Q ${safeWidth} ${topY} ${safeWidth} ${topY + r}
    L ${safeWidth} ${safeHeight - r}
    Q ${safeWidth} ${safeHeight} ${safeWidth - r} ${safeHeight}
    Z
  `;
}
