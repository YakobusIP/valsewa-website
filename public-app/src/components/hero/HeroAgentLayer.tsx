import Image from "next/image";

export default function HeroAgentLayer() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ clipPath: "inset(-50% 0 0 0)" }}
    >
      <div className="absolute left-[10%] sm:left-[20%] xl:left-1/2 top-[110%] sm:top-[95%] md:top-[80%] xl:top-[100%] xl:-translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] md:w-[1000px] xl:w-[880px] select-none opacity-100">
        <Image
          src="/NewHero/Agent Neon.png"
          alt="Neon Agent"
          width={900}
          height={900}
          className="object-top drop-shadow-[0_0_40px_rgba(0,200,255,0.35)]"
          priority
        />
      </div>
    </div>
  );
}
