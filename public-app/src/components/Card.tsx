"use client";

import { useRef, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog } from "@/components/ui/dialog";
import Image from "next/image";

import { AccountEntity } from "@/types/account.type";
import CardModal from "./CardModal";
import CountdownTimer from "./CountdownTimer";
import { useRouter } from "next/navigation";
interface CardProps {
  data?: AccountEntity[];
}

const Card: React.FC<CardProps> = ({ data }) => {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState<AccountEntity | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  const processCardData = (items?: AccountEntity[]) => {
    return items?.map((item) => ({
      ...item,
      otherImages:
        item.thumbnail && item.otherImages
          ? [{ ...item.thumbnail, isThumbnail: true }, ...item.otherImages]
          : item.otherImages
    }));
  };

  const processedData = processCardData(data);

  // const handleCardClick = (item: AccountEntity) => {
  //   const isMobile = window.innerWidth < 640;

  //   if (isMobile && item.availabilityStatus === "IN_USE") {
  //     if (hoveredCardId !== item.accountCode) {
  //       setHoveredCardId(item.accountCode);
  //     } else {
  //       setSelectedCard(item);
  //       setHoveredCardId(null);
  //     }
  //   } else {
  //     setHoveredCardId(null);
  //     setSelectedCard(item);
  //   }
  // };
  const handleCardClick = (id: string, availabilityStatus: string, accountCode: string ) => {
    const isMobile = window.innerWidth < 640;

    if (isMobile && availabilityStatus === "IN_USE") {
      if (hoveredCardId !== accountCode) {
        setHoveredCardId(accountCode);
      }else {
        setHoveredCardId(null);
      }
    } else {
      setHoveredCardId(null);
    }

    router.push(`/details/${id}`);
  };

  // function debug (item){
  //   console.log(item);
  // }

  function getRankImage(rank: string): string {
    if (!rank) return "/rank/default.svg";
    const baseRank = rank.trim().split(" ")[0].toLowerCase();
    return `/rank/${baseRank} 3.svg`;
  }

  return (
    <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>

      <section className="w-full flex justify-center">
        <div className="w-full max-w-[1920px] px-3 md:px-6 lg:px-10">
          <div
            ref={ref}
            className="
              grid grid-cols-12 
              gap-x-3 gap-y-4
              sm:gap-x-6 sm:gap-y-6
              lg:gap-x-8 lg:gap-y-10
              justify-items-center
              font-sans
            "
          >
            {processedData?.map((item) => {
              // {debug(item)}
              const inUse = item.availabilityStatus === "IN_USE";

              return (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(String(item.id), item.availabilityStatus, item.accountCode)}
                  className={`
                    col-span-6 sm:col-span-4 lg:col-span-3
                    w-full cursor-pointer
                    transition-all duration-300
                    ${inUse ? "opacity-80" : "hover:scale-[1.02]"}
                  `}
                >
                  {/* CARD FRAME */}
                  <div className="rounded-2xl p-[1px] bg-gradient-to-b from-white/40 via-black to-white/40">
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-black to-[#7A0610]">

                      {/* HEADER */}
                      <div className="flex items-start justify-between px-4 pt-4">
                        <div className="flex items-center gap-2">
                          <Image
                            src={getRankImage(item.accountRank)}
                            width={42}
                            height={42}
                            alt="Rank"
                          />
                          <div>
                            <p className="text-white font-semibold text-sm">
                              {item.accountRank} | {item.accountCode}
                            </p>
                            <span className="inline-flex items-center justify-center
                              text-xs font-bold text-white bg-red-600
                              h-5 rounded pl-2 pr-2">
                              {item.priceTier.code}
                            </span>
                          </div>
                        </div>

                        <span className="flex items-center gap-1 text-blue-400 text-xs cursor-pointer hover:text-blue-300">
                          Account Info
                          <span className="flex items-center justify-center w-3 h-3 rounded-full bg-blue-400 text-black text-[10px] font-bold no-underline">
                            ?
                          </span>
                        </span>
                      </div>

                      {/* IMAGE */}
                      <div className="relative px-4 pt-4">
                        <AspectRatio ratio={16 / 9}>
                          <Image
                            src={item.thumbnail?.imageUrl ?? "/defaultPicture/default.jpg"}
                            fill
                            alt="Thumbnail"
                            className="object-cover rounded-xl"
                            unoptimized
                          />
                        </AspectRatio>

                        {/* AVAILABLE BADGE */}
                        {!inUse && (
                          <div className="absolute top-6 left-6
                            bg-green-400 text-black
                            text-xs font-bold px-3 py-1 rounded-md">
                            Available
                          </div>
                        )}

                        {/* IN USE OVERLAY */}
                        {inUse && (
                          <div className="absolute top-6 left-6 flex items-center justify-center
                            bg-black/70 rounded-xl">
                            <div className="bg-white text-black
                              px-4 py-2 rounded-md text-sm font-semibold">
                              Time Left{" "}
                              {item.currentExpireAt && (
                                <CountdownTimer
                                  targetDate={new Date(item.currentExpireAt).toISOString()}
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* FOOTER */}
                      <div className="px-4 py-4">
                        <div className="inline-flex items-center
                          bg-black/40 text-white
                          text-xs px-3 py-1 rounded-md">
                          Skins Amount |{" "}
                          <span className="ml-1 font-bold">
                            {item.skinList.length}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CardModal
        selectedCard={selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </Dialog>
  );
};

export default Card;
