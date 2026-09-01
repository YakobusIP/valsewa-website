import {
  MOBILE_NOTCH_VIEWBOX,
  getMobileRightNotchPath
} from "@/components/hero/mobile-notch-paths";

export default function HeroNotchShapeMobileRight() {
  const { width: W, height: H } = MOBILE_NOTCH_VIEWBOX;
  const path = getMobileRightNotchPath();

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
