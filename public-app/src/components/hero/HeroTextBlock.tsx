import Image from "next/image";

export default function HeroTextBlock({
  className = "",
  activeBrand = "valsewa"
}: {
  className?: string;
  activeBrand?: "valsewa" | "valjubel" | "valjoki";
}) {
  const getTitle = () => {
    switch (activeBrand) {
      case "valjubel":
      case "valsewa":
        return "WORLD'S #1";
      case "valjoki":
        return "MOST TRUSTED";
      default:
        return "WORLD'S #1";
    }
  };
  const getSubtitle = () => {
    switch (activeBrand) {
      case "valjubel":
        return "FOR BUYING AND SELLING VALORANT ACCOUNTS";
      case "valjoki":
        return "VALORANT ACCOUNT BOOSTING SERVICE";
      case "valsewa":
      default:
        return "VALORANT ACCOUNT RENTAL SITE";
    }
  };

  return (
    <div
      className={`relative z-20 flex flex-col justify-center pt-16 sm:pt-20 xl:pt-0 px-4 sm:px-6 xl:px-8 ${className}`}
    >
      {/* Logo - Desktop only */}
      <div className="hidden xl:flex items-center gap-3 mb-4">
        <Image
          src="/header/VALSEWA.png"
          alt="VALSEWA"
          width={200}
          height={70}
          className="object-contain"
        />
      </div>

      {/* Headline */}
      <h1 className="text-white text-4xl md:text-6xl xl:text-4xl font-extrabold leading-tight font-antonio">
        {getTitle()} <br />
        <span className="text-white text-5xl md:text-8xl xl:text-8xl font-extrabold leading-tight font-antonio">
          {getSubtitle()}
        </span>
      </h1>

      {/* MOBILE: Powered By */}
      <div className="xl:hidden flex items-center gap-2 mt-4">
        <span className="text-[#F9FAFB] text-xl font-semibold tracking-wider font-antonio">
          POWERED BY
        </span>
        <Image
          src="/header/Logo Header Valforum.png"
          alt="VALFORUM"
          width={100}
          height={24}
          className="object-contain w-[80px] sm:w-[100px] h-auto"
        />
      </div>
    </div>
  );
}
