import Image from "next/image";

export default function HeroTextBlock({
  className = ""
}: {
  className?: string;
}) {
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
        WORLD&apos;S #1 <br />
        <span className="text-white text-5xl md:text-8xl xl:text-8xl font-extrabold leading-tight font-antonio">
          VALORANT ACCOUNT
        </span>{" "}
        <br />
        <span className="text-white text-5xl md:text-8xl xl:text-8xl font-extrabold leading-tight font-antonio">
          RENTAL SITE
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
