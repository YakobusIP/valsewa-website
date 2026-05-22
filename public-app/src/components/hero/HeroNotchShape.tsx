export default function HeroNotchShape() {
  return (
    <div
      className="absolute inset-0 max-w-[1920px] overflow-x-clip overflow-y-visible pointer-events-none hidden md:block [--hero-panel-bg:radial-gradient(80%_80%_at_0%_50%,#210004_0%,#000000_60%)]"
    >
      {/* Background panels */}
      <div className="absolute left-0 right-0 bottom-0 top-[var(--hero-notch-height)] rounded-b-2xl rounded-tr-2xl bg-[var(--hero-panel-bg)]" />
      <div className="absolute left-0 top-0 h-[var(--hero-notch-height)] w-[var(--hero-valforum-tab-width)] rounded-t-2xl bg-[var(--hero-panel-bg)]" />
      <div className="absolute left-[var(--hero-valforum-tab-width)] top-[calc(var(--hero-notch-height)-var(--hero-tab-curve))] h-[var(--hero-tab-curve)] w-[var(--hero-tab-curve)] bg-[var(--hero-panel-bg)] [mask:radial-gradient(circle_at_100%_0,transparent_calc(var(--hero-tab-curve)-1px),#000_var(--hero-tab-curve))] [-webkit-mask:radial-gradient(circle_at_100%_0,transparent_calc(var(--hero-tab-curve)-1px),#000_var(--hero-tab-curve))]" />

      {/* Outline */}
      <div className="absolute inset-0 z-20">
        {/* Tab: shortened so right border stops where curve begins */}
        <div className="absolute left-0 top-0 h-[calc(var(--hero-notch-height)-var(--hero-tab-curve))] w-[var(--hero-valforum-tab-width)] rounded-t-2xl border border-b-0 border-white/20" />
        {/* Left border fill: bridges tab left border to main body left border */}
        <div className="absolute left-0 top-[calc(var(--hero-notch-height)-var(--hero-tab-curve))] h-[calc(var(--hero-tab-curve)+1px)] w-px bg-white/20" />
        {/* Inverted curve from tab to body */}
        <div className="absolute left-[calc(var(--hero-valforum-tab-width)-1px)] top-[calc(var(--hero-notch-height)-var(--hero-tab-curve))] h-[var(--hero-tab-curve)] w-[var(--hero-tab-curve)] rounded-bl-[var(--hero-tab-curve)] border-l border-b border-white/20" />
        {/* Main body: all borders with rounded tr + b, clip-path hides unwanted top-left portion */}
        <div
          className="absolute left-0 right-0 bottom-0 top-[var(--hero-notch-height)] rounded-tr-2xl rounded-b-2xl border border-white/20"
          style={{
            clipPath: `polygon(0 1px, calc(var(--hero-valforum-tab-width) + var(--hero-tab-curve)) 1px, calc(var(--hero-valforum-tab-width) + var(--hero-tab-curve)) 0, 100% 0, 100% 100%, 0 100%)`
          }}
        />
      </div>
    </div>
  );
}
