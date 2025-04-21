"use client";

import { useEffect, useRef, useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";

import { AccountEntity } from "@/types/account.type";

import { ExternalLink } from "lucide-react";
import Image from "next/image";

import CardModal from "./CardModal";
import CountdownTimer from "./CountdownTimer";

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
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

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
    else if (!isAboveSmallDesktop && !isAbovePhone) gridClass = "col-span-6";

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
      return "/cardneed/lrb.svg";
    } else if (tier === "C") {
      return "/cardneed/c.svg";
    } else if (tier === "LR-C") {
      return "/cardneed/lrc.svg";
    }
    return "";
  };
  const checkStatusInUse = (status: string) => {
    if (status == "IN_USE") {
      return true;
    }
    return false;
  };
  const handleCardClick = (item: AccountEntity) => {
    const isMobile = window.innerWidth < 640;

    if (isMobile && item.availabilityStatus === "IN_USE") {
      if (hoveredCardId !== item.accountCode) {
        setHoveredCardId(item.accountCode);
      } else {
        setSelectedCard(item);
        setHoveredCardId(null);
      }
    } else {
      setHoveredCardId(null);
      setSelectedCard(item);
    }
  };

  return (
    <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
      <div
        className="grid grid-cols-12 md:gap-x-10 sm:gap-x-6 gap-x-3 justify-items-center w-full 2xl:gap-y-14 xl:gap-y-10 sm:gap-y-7 gap-y-3 px-3 font-sans"
        ref={ref}
      >
        {processedData?.map((item, index) => (
          <div
            className={`
              rounded-xl relative h-auto w-full 
              transform sm:hover:shadow-[0px_4px_15px_rgba(255,255,255,0.5)] sm:hover:scale-[1.02] sm:transition-all sm:duration-300 hover:cursor-pointer 
              ${getGridClass()} 
              ${checkStatusInUse(item.availabilityStatus) ? "" : ""}
              ${hoveredCardId === item.accountCode ? "shadow-[0px_4px_15px_rgba(255,255,255,0.5)]" : ""}
              `}
            key={index}
            onClick={() => handleCardClick(item)}
          >
            <div className="group relative h-full w-full bg-[#333640] rounded-xl transition-opacity duration-300">
              {/* Notification: Hidden by default, shown on hover */}
              {item.availabilityStatus === "IN_USE" && (
                <div
                  className={`max-sm:hidden hidden group-hover:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 bg-black/75 text-white px-4 py-2 rounded-lg w-full h-full z-30`}
                >
                  <div className="flex justify-center items-center gap-3">
                    <figure className="w-[24px] h-[24px] flex items-center">
                      <Image
                        src="/cardneed/in_use.svg"
                        width={28}
                        height={28}
                        alt="In Use"
                      />
                    </figure>
                    <span className="flex flex-col">
                      <span className="font-bold text-xl text-[#FBB201]">
                        In Use
                      </span>
                      {item.currentExpireAt ? (
                        <CountdownTimer
                          targetDate={
                            item.currentExpireAt
                              ? new Date(item.currentExpireAt).toISOString()
                              : ""
                          }
                        />
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </div>
              )}
              <div>
                <figure className="relative w-full sm:hidden">
                  <AspectRatio ratio={16 / 16}>
                    <Image
                      src={`/${item.thumbnail.imageUrl}`}
                      alt="Thumbnail"
                      fill
                      className="object-cover rounded-t-xl w-full"
                      loading="lazy"
                      sizes="80vw"
                    />
                  </AspectRatio>
                </figure>
                <figure className="relative w-full max-sm:hidden">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={`/${item.thumbnail.imageUrl}`}
                      alt="Thumbnail"
                      fill
                      className="object-cover rounded-t-xl w-full"
                      loading="lazy"
                      sizes="80vw"
                    />
                  </AspectRatio>
                </figure>
              </div>
              <div className="relative w-full h-full">
                <div className="relative">
                  {/* Account Rank */}
                  <div
                    className="relative flex items-center bg-gradient-to-r from-[#FFB800] to-[#D48002] text-white  font-bold sm:px-8 px-3 sm:py-2 sm:text-2xl text-sm italic  sm:w-[70%] w-[75%] max-md:h-[25px]"
                    style={{
                      clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)"
                    }}
                  >
                    {item.accountRank}
                  </div>
                  <div className="h-full w-full absolute top-0 left-auto">
                    <figure className="absolute top-0 right-0 h-[60px] w-[60px] sm:h-[120px] sm:w-[120px] ">
                      <Image
                        src={getTier(item.priceTier.code)}
                        alt="Price Tier"
                        fill
                      />
                    </figure>
                  </div>
                </div>
                <div className="sm:px-7 px-3 sm:mt-5 mt-2">
                  <div className="relative sm:mb-3">
                    {/* Account Code */}
                    <div className="flex items-center sm:gap-[8px] gap-1">
                      {item.availabilityStatus === "AVAILABLE" && (
                        <span className="w-4 h-4 bg-[#66FFF8] rounded-full"></span>
                      )}
                      {item.availabilityStatus === "IN_USE" && (
                        <figure className="relative w-[20px] h-[20px] sm:w-[28px] sm:h-[28px]">
                          <Image src="/cardneed/in_use.svg" fill alt="In_Use" />
                        </figure>
                      )}

                      {/* Account Code */}
                      <span className="font-bold text-[#f36164] sm:text-4xl text-2xl">
                        {item.accountCode}
                      </span>
                    </div>

                    <div className="flex flex-wrap text-nowrap mb-5 gap-[20px] items-center text-roseWhite sm:text-sm text-xs font-bold mt-2 max-lg:hidden font-sans">
                      <span className="">
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
                    <div className="flex flex-col mb-2 gap-[10px] text-roseWhite sm:text-sm text-xs font-bold mt-2 text-nowrap lg:hidden font-sans">
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
                          className="bg-[#4b4f5e] font-normal font-sans text-[#E6E6E6] text-[8px] sm:text-xs hover:bg-[#4b4f5e]"
                        >
                          {skin}
                        </Badge>
                      ))}
                      {item.skinList.length > 3 && (
                        <Badge
                          variant="secondary"
                          key={index}
                          className="bg-[#4b4f5e] font-normal font-sans text-[#E6E6E6] text-[8px] sm:text-xs hover:bg-[#4b4f5e]"
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
