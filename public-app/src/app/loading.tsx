"use client";

// import { useEffect, useState } from "react";
// import { AspectRatio } from "@/components/ui/aspect-ratio";

// import Image from "next/image";

export default function LoadingPage() {
  // const [index, setIndex] = useState(0);
  // const images = [
  //   "loading/loading1.svg",
  //   "loading/loading2.svg",
  //   "loading/loading3.svg",
  //   "loading/loading4.svg"
  // ];
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prev) => (prev + 1) % images.length);
  //   }, 800);

  //   return () => clearInterval(interval);
  // }, [images.length]);

  return (
    <div className="flex flex-col h-screen overflow-hidden items-center justify-center gap-4 relative bg-black h-[100vh] w-[100vw]">
      <video autoPlay muted loop playsInline className="block lg:hidden" width="full" height="full">
        <source src="loading/Mobile.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <video autoPlay muted loop playsInline width="full" height="full" className="hidden lg:block">
        <source src="loading/Desktop.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* <figure className="w-full h-full absolute z-0 max-md:hidden">
        <AspectRatio ratio={16 / 12}>
          <Image
            src="/LS/SVG/Loading Screen_VS_Loading_1280x2800px.svg"
            fill
            alt="Hero"
            className="object-cover object-bottom"
          />
        </AspectRatio>
      </figure>
      <figure className="w-full h-full absolute z-0 max-lg:hidden md:hidden">
        <AspectRatio ratio={16 / 15}>
          <Image
            src="/LS/SVG/Loading Screen_VS_Loading_1280x2000px.svg"
            fill
            alt="Hero"
            className="object-cover object-bottom"
          />
        </AspectRatio>
      </figure>
      <figure className="w-full h-full absolute z-0 max-md:hidden lg:hidden">
        <AspectRatio ratio={16 / 25}>
          <Image
            src="/LS/SVG/Loading Screen_VS_Loading_1280x1200px.svg"
            fill
            alt="Hero"
            className="object-cover object-bottom"
          />
        </AspectRatio>
      </figure>
      <figure className="w-full h-full absolute z-0 md:hidden">
        <AspectRatio ratio={16 / 35}>
          <Image
            src="/LS/SVG/Loading Screen_VS_Loading_1280x460px.svg"
            fill
            alt="Hero"
            className="object-cover object-bottom "
          />
        </AspectRatio>
      </figure>

      <div className="flex flex-col items-center justify-center gap-2 md:gap-4 z-50">
        <div className="flex items-center justify-center gap-2">
          <div className="relative w-44 h-44">
            <Image
              src="loading/loading.gif"
              alt="Loading animation"
              fill
              unoptimized // <== important for GIFs to work with next/image
            /> */}
      {/* {images.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: i === index ? 1 : 0 }}
                animate={{
                  opacity: i === index ? 1 : 0,
                  scale: i === index ? 1.1 : 1
                }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
              />
            ))} */}
      {/* </div>
        </div>
        <h2 className="text-white font-bold text-4xl font-valorant tracking-widest mt-[-30px]">
          Loading...
        </h2>
        <div>
          <h2 className="text-center text-white font-bold text-xl pt-3">
            Preparing the best Valorant
          </h2>
          <h2 className="text-center text-white font-bold text-xl">
            accounts for you!
          </h2>
        </div>
      </div> */}
    </div>
  );
}
