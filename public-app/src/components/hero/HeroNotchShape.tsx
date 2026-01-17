// SVG Notch Shape Component for the Hero container
// The shape has a notch at top-left that extends upward for the Valforum logo
export default function HeroNotchShape() {
  // ViewBox: 1920 wide x 690 tall
  // Notch: ~220px wide, 75px tall, at top-left extending from y=0 to y=75
  // Main container: from y=75 to y=690, full width with rounded corners
  // Path traced clockwise starting from bottom-left
  const notchPath = `
      M 16 690
      Q 0 690 0 674
      L 0 16
      Q 0 0 16 0
      L 200 0
      Q 216 0 216 16
      L 216 54
      Q 216 75 232 75
      L 1904 75
      Q 1920 75 1920 86
      L 1920 674
      Q 1920 690 1904 690
      Z
    `;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none hidden xl:block sm:px-6 xl:px-12 large:px-0"
      viewBox="0 0 1920 690"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradient definition for the background */}
      <defs>
        <radialGradient
          id="heroGradient"
          cx="0%"
          cy="50%"
          r="80%"
          fx="0%"
          fy="50%"
        >
          <stop offset="0%" stopColor="#210004" />
          <stop offset="60%" stopColor="#000000" />
        </radialGradient>
      </defs>

      {/* Background fill */}
      <path d={notchPath} fill="url(#heroGradient)" />

      {/* Border stroke */}
      <path
        d={notchPath}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
