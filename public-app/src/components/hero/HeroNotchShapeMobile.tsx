// Mobile SVG Notch Shape Component (for screens below xl)
// The notch covers ~1/3 of the width for the VALSEWA button
export default function HeroNotchShapeMobile() {
  // ViewBox: 400 wide x 600 tall (mobile proportions)
  // Notch: ~130px wide (1/3 of width), 65px tall, at top-left
  // This covers the VALSEWA button in the brand switcher
  const notchPath = `
      M 12 600
      Q 0 600 0 588
      L 0 12
      Q 0 0 12 0
      L 118 0
      Q 130 0 130 12
      L 130 43
      Q 130 65 142 65
      L 388 65
      Q 400 65 400 67
      L 400 588
      Q 400 600 388 600
      Z
    `;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none xl:hidden pt-16"
      viewBox="0 0 400 600"
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
