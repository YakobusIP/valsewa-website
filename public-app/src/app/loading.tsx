import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";

export default function LoadingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] items-center justify-center gap-4">
      <figure className="w-full h-full absolute z-0 max-xl:hidden">
          <AspectRatio ratio={16 / 12}>
            <Image
              src="/hero/Hero7.png"
              fill
              alt="Hero"
              className="object-cover object-top"
            />
          </AspectRatio>
        </figure>
        <figure className="w-full h-full absolute z-0 max-lg:hidden xl:hidden">
          <AspectRatio ratio={16 / 15}>
            <Image
              src="/hero/Hero7.png"
              fill
              alt="Hero"
              className="object-cover object-top"
            />
          </AspectRatio>
        </figure>
        <figure className="w-full h-full absolute z-0 max-md:hidden lg:hidden">
          <AspectRatio ratio={16 / 25}>
            <Image
              src="/hero/Hero7.png"
              fill
              alt="Hero"
              className="object-cover object-top"
            />
          </AspectRatio>
        </figure>
      <figure className="w-full h-full absolute z-0 md:hidden">
          <AspectRatio ratio={16 / 35}>
            <Image
              src="/hero/Hero7.png"
              fill
              alt="Hero"
              className="object-cover object-center"
            />
          </AspectRatio>
        </figure>
        
      <div className="flex flex-col items-center justify-center gap-2 xl:gap-4 z-50">
        <div className="flex items-center justify-center gap-2">
          <Loader2Icon className="w-8 h-8 xl:w-16 xl:h-16 animate-spin text-white" />
          <h2 className="text-white font-bold text-4xl">Loading...</h2>
        </div>
        <h2 className="text-center text-white font-bold text-2xl pt-3">
          Sedang mempersiapkan pilihan sewa terbaik untukmu 
        </h2>
      </div>
    </div>
  );
}
