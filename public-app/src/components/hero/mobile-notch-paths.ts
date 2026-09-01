import type { BrandSlug } from "@/lib/brand";

export const MOBILE_NOTCH_VIEWBOX = { width: 400, height: 600 } as const;

const W = MOBILE_NOTCH_VIEWBOX.width;
const H = MOBILE_NOTCH_VIEWBOX.height;

export function getMobileLeftNotchPath(): string {
  const r = 12;
  const notchX = W / 2;
  const notchFlatX = notchX - r;
  const innerCurveX = notchX + r;
  const innerVertY = 43;
  const notchH = 65;
  const rightCornerX = W - r;
  const topRightY = 67;

  return `
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
}

export function getMobileRightNotchPath(): string {
  const r = 12;
  const topY = 65;
  const tabW = W / 2;
  const tabH = 65;
  const tabR = 12;
  const tabTopY = topY - tabH;
  const tabEndX = W - r;
  const tabStartX = tabEndX - tabW;
  const safeTabR = Math.min(tabR, tabW / 2 - 1);

  return `
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
}

export function getMobileNotchPath(brand: BrandSlug): string {
  return brand === "valjubel"
    ? getMobileRightNotchPath()
    : getMobileLeftNotchPath();
}
