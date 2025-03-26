'use client'
import Card from "@/components/Card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useAccountController } from "@/controllers/useAccountController";
import Image from "next/image";
import { AccountEntity } from "@/types/account.type";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SearchBar from "@/components/SearchBar";
import Navbar from "@/components/Navbar";
interface Props{
    initialAccount: AccountEntity[]
}
export default function Home({initialAccount}:Props) {
  const {
    accountList,
    setSearchAccount,
    sortAccount,
    sortDirection,
    changeDirection,
    getSortLabel,
  } = useAccountController(initialAccount);

  const images = [
    "/hero/Hero1.png", "/hero/Hero2.png", "/hero/Hero3.png"
  ]

  return (
    <section className="bg-[#101822] pb-32 relative ">
      <div className="relative ">
        <Navbar />

      </div>
      <div>
        <div className="w-full relative">
          <div className="relative w-full">
            <figure className="absolute  w-full h-full  max-2xl:hidden ">
              <AspectRatio ratio={16 / 7}>
                <Image
                  src="/hero/Hero9.png"
                  fill
                  alt="Hero"
                  className="object-cover object-top"
                />
              </AspectRatio>
            </figure>
            <figure className="absolute  w-full h-full  max-lg:hidden 2xl:hidden">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src="/hero/Hero9.png"
                  fill
                  alt="Hero"
                  className="object-cover object-top"
                />
              </AspectRatio>
            </figure>
            <figure className="absolute  w-full h-full  max-md:hidden lg:hidden">
              <AspectRatio ratio={16 / 10}>
                <Image
                  src="/hero/Hero9.png"
                  fill
                  alt="Hero"
                  className="object-cover object-top"
                />
              </AspectRatio>
            </figure>
            <figure className="absolute w-full md:hidden max-sm:hidden">
              <AspectRatio ratio={16 / 15}>
                <Image
                  src="/hero/Hero9.png"
                  fill
                  alt="Main Pict"
                  className="object-cover object-top"
                />
              </AspectRatio>
            </figure>
            <figure className="absolute w-full sm:hidden">
              <AspectRatio ratio={16 / 22}>
                <Image
                  src="/hero/Hero9.png"
                  fill
                  alt="Main Pict"
                  className="object-cover object-top"
                />
              </AspectRatio>
            </figure>
          </div>
        </div>
        <div>
            <div className="relative flex items-center justify-center z-20 mx-14 pt-44">
              <Carousel className="w-full h-auto shadow-[0_4px_20px_rgba(255,255,255,0.6)] rounded-[21px]">
                <CarouselContent>
                  {images?.map((image, index) =>(
                    <CarouselItem key={index}>
                    <div className="h-full w-full relative max-md:hidden">
                      <AspectRatio ratio={12 / 3}>
                        <Image
                          src={image}
                          alt="Content Image"
                          fill
                          className="object-cover rounded-[21px]"
                          unoptimized
                        />
                      </AspectRatio>
                    </div>
                    <div className="h-full w-full relative max-sm:hidden md:hidden">
                      <AspectRatio ratio={12 / 6}>
                        <Image
                          src={image}
                          alt="Content Image"
                          fill
                          className="object-cover rounded-[21px]"
                          unoptimized
                        />
                      </AspectRatio>
                    </div>
                    <div className="h-full w-full relative sm:hidden">
                      <AspectRatio ratio={12 / 9}>
                        <Image
                          src={image}
                          alt="Content Image"
                          fill
                          className="object-cover rounded-[21px]"
                          unoptimized
                        />
                      </AspectRatio>
                    </div>
                  </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute top-1/2 -translate-y-1/2 left-12 z-30">
                  <CarouselPrevious />
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-12 z-30">
                  <CarouselNext />
                </div>
              </Carousel>
            </div>
        </div>
       <SearchBar 
          accountList={accountList|| []}
          setSearchAccount={setSearchAccount} 
          changeDirection={changeDirection} 
          getSortLabel={getSortLabel} 
          sortAccount={sortAccount} 
          sortDirection={sortDirection} 
        />


        <div className="mx-14 pt-10">
          {accountList.length>0? (
            <div className="mt-9 w-full mx-0 pt-10">
              <Card data={accountList} />
            </div>
          )
          :
          (
            <div className=" mt-48">
              <div className="flex items-center ps-3 pointer-events-none justify-center">
                <svg
                  className="w-16 h-16 text-roseWhite font-bold  dark:text-gray-400 p-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <p className="text-roseWhite text-3xl font-semibold text-center">Mohon maaf Akun tidak ditemukan</p>
              <p className="text-roseWhite text-xl font-normal text-center max-w-[300px] mx-auto">Coba lakukan pencarian untuk skin / preferensi yang lain</p>
              </div>
            )}
        </div>
      </div>
    </section>
  );
}

