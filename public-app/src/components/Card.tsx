"use client";

import { useEffect, useRef, useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";

import { AccountEntity } from "@/types/account.type";

import { availabilityStatuses } from "@/lib/constants";

import { ExternalLink } from "lucide-react";
import Image from "next/image";

import CardModal from "./CardModal";

// Define types for props and data items

interface CardProps {
  data?: AccountEntity[];
}
const Card: React.FC<CardProps> = ({ data }) => {
  const [selectedCard, setSelectedCard] = useState<AccountEntity | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [isAboveLargeDesktop, setIsAboveLargeDesktop] =
    useState<boolean>(false);
  const [isAboveSmallDesktop, setIsAboveSmallDesktop] =
    useState<boolean>(false);
  const [isAbovePhone, setIsAbovePhone] = useState<boolean>(false);

  const updateScreenSize = () => {
    setIsAboveLargeDesktop(window.innerWidth >= 1700);
    setIsAboveSmallDesktop(window.innerWidth >= 1024);
    setIsAbovePhone(window.innerWidth >= 640);
  };

  useEffect(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  const getGridClass = (): string => {
    let gridClass = "col-span-4"; // Default to 3 columns

    if (isAboveLargeDesktop) gridClass = "col-span-3";
    else if (!isAboveSmallDesktop && isAbovePhone) gridClass = "col-span-6";
    else if (!isAboveSmallDesktop && !isAbovePhone) gridClass = "col-span-12";

    return gridClass;
  };

  const processCardData = (items: AccountEntity[] | undefined) => {
    return items?.map((item) => ({
      ...item,
      otherImages:
        item.thumbnail && item.otherImages
          ? [{ ...item.thumbnail, isThumbnail: true }, ...item.otherImages]
          : item.otherImages
    }));
  };
  const visitTracker = (nickname: string) => {
    const linkTracker =
      "https://tracker.gg/valorant/profile/riot/" +
      encodeURIComponent(nickname) +
      "/overview";
    window.open(linkTracker, "_blank");
  };
  const processedData = processCardData(data);
  const getTier = (tier: string) => {
    if (tier === "SSS") {
      return "/cardneed/sss.svg";
    } else if (tier === "LR-SSS") {
      return "/cardneed/lrsss.svg";
    } else if (tier === "LR-V") {
      return "/cardneed/lrv.svg";
    } else if (tier === "V") {
      return "/cardneed/v.svg";
    } else if (tier === "S") {
      return "/cardneed/s.svg";
    } else if (tier === "LR-S") {
      return "/cardneed/lrs.svg";
    } else if (tier === "A") {
      return "/cardneed/a.svg";
    } else if (tier === "LR-A") {
      return "/cardneed/lra.svg";
    } else if (tier === "B") {
      return "/cardneed/b.svg";
    } else if (tier === "LR-B") {
      return "/cardneed/b.svg";
    } else if (tier === "C") {
      return "/cardneed/c.svg";
    } else if (tier === "LR-C") {
      return "/cardneed/c.svg";
    }
    return "";
  };
  return (
    <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
      <div
        className="grid grid-cols-12 md:gap-x-10 gap-x-6 justify-items-center w-full 2xl:gap-y-14 xl:gap-y-10 sm:gap-y-7 gap-y-8 px-3 font-sans"
        ref={ref}
      >
        {processedData?.map((item, index) => (
          <div
            className={`
        rounded-xl relative h-auto w-full 
        transform hover:shadow-[0px_4px_15px_rgba(255,255,255,0.5)] hover:scale-[1.02] transition-all duration-300 hover:cursor-pointer
        ${getGridClass()}
      `}
            key={index}
            onClick={() => setSelectedCard(item)}
          >
            <div className="h-full w-full bg-[#333640] rounded-xl ">
              <div>
                <figure className="relative w-full">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={item.thumbnail.imageUrl}
                      alt="service logo"
                      fill
                      className="object-cover rounded-t-xl w-full"
                      unoptimized
                    />
                  </AspectRatio>
                </figure>
              </div>
              <div className="relative w-full h-full">
                <div className="relative">
                  {/* Account Rank */}
                  <div
                    className="relative bg-gradient-to-r from-[#FFB800] to-[#D48002] text-white font-bold px-8 py-2 text-2xl italic inline-block w-[70%]"
                    style={{
                      clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)"
                    }}
                  >
                    {item.accountRank}
                  </div>
                  <div className="h-full w-full absolute top-0 left-auto">
                    <figure className="absolute top-0 right-0 h-[120px] w-[120px]">
                      <Image
                        src={getTier(item.priceTier.code)}
                        alt="Price Tier"
                        fill
                      />
                    </figure>
                  </div>
                </div>
                <div className="px-7 mt-5">
                  <div className="relative mb-3">
                    {/* Account Code */}
                    <div className="flex items-center gap-[8px]">
                      {item.availabilityStatus === "AVAILABLE" && (
                        <span className="w-4 h-4 bg-[#66FFF8] rounded-full"></span>
                      )}
                      {item.availabilityStatus === "IN_USE" && (
                        <figure className="relative w-[28px] h-[28px]">
                          <Image src="/cardneed/in_use.svg" fill alt="In_Use" />
                        </figure>
                      )}

                      {/* Account Code */}
                      <span className="font-bold text-[#f36164] text-4xl">
                        {item.accountCode}
                      </span>
                    </div>

                    <div className="flex mb-5 gap-[20px] items-center text-roseWhite text-sm font-bold mt-2 max-md:hidden font-sans">
                      <span>
                        Total Skin <span>{item.skinList.length}</span>
                      </span>
                      <span className="flex gap-1">
                        <span
                          className=" cursor-pointer"
                          onClick={() => visitTracker(item.nickname)}
                        >
                          {item.nickname}
                        </span>
                        <ExternalLink
                          className="w-4 h-4 text-white inline"
                          onClick={() => visitTracker(item.nickname)}
                        />
                      </span>
                    </div>
                    <div className="flex flex-col mb-2 gap-[20px] text-roseWhite text-sm font-bold mt-2 text-nowrap md:hidden font-sans">
                      <span className="flex gap-1">
                        <span
                          className=" cursor-pointer"
                          onClick={() => visitTracker(item.nickname)}
                        >
                          {item.nickname}
                        </span>
                        <ExternalLink
                          className="w-4 h-4 text-white inline"
                          onClick={() => visitTracker(item.nickname)}
                        />
                      </span>
                      <span className="font-sans">
                        Total Skin <span>{item.skinList.length}</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-y-2 gap-2 pb-5">
                      {item.skinList?.slice(0, 2).map((skin, index) => (
                        <Badge
                          variant="secondary"
                          key={index}
                          className="bg-[#4b4f5e] font-normal font-sans text-roseWhite text-sm max-sm:text-xs hover:bg-[#4b4f5e]"
                        >
                          {skin}
                        </Badge>
                      ))}
                      {item.skinList.length > 3 && (
                        <Badge
                          variant="secondary"
                          key={index}
                          className="bg-[#4b4f5e] font-normal font-sans text-roseWhite text-sm max-sm:text-xs hover:bg-[#4b4f5e]"
                        >
                          +{item.skinList.length - 2} Lainnya
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CardModal
        selectedCard={selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </Dialog>
  );
};

export default Card;
