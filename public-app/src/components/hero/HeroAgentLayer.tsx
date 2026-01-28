import { cn } from "@/lib/utils";
import Image from "next/image";

export default function HeroAgentLayer({
  activeBrand = "valsewa"
}: {
  activeBrand?: "valsewa" | "valjubel" | "valjoki";
}) {
  const getImage = () => {
    switch (activeBrand) {
      case "valjubel":
        return "/NewHero/Agent Reyna.png";
      case "valjoki":
        return "/NewHero/Agent Gekko.png";
      case "valsewa":
      default:
        return "/NewHero/Agent Neon.png";
    }
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ clipPath: "inset(-50% 0 0 0)" }}
    >
      <div className={cn(activeBrand === "valjoki" ? "xl:top-[50%] top-[60%]" : "top-[110%] sm:top-[95%] md:top-[80%] xl:top-[100%]", activeBrand === "valjubel" ? "left-[10%] sm:left-[10%] xl:left-1/2" : "left-[10%] sm:left-[20%] xl:left-1/2", ` absolute xl:-translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] md:w-[1000px] xl:w-[880px] select-none opacity-100`)}>
        <Image
          key={activeBrand} // Force re-render for animation if needed, or just proper image switch
          src={getImage()}
          alt={`${activeBrand} Agent`}
          width={900}
          height={900}
          className="object-top drop-shadow-[0_0_40px_rgba(0,200,255,0.35)]"
          priority
        />
      </div>
    </div>
  );
}
