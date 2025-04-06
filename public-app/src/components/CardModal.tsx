"use client";

import { useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { AccountEntity } from "@/types/account.type";

import { DialogDescription } from "@radix-ui/react-dialog";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import Image from "next/image";

import Whatsapp from "./Whatsapp";
import { Button } from "./ui/button";

interface CardModalProps {
  selectedCard: AccountEntity | null;
  onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ selectedCard, onClose }) => {
  const [showAll, setShowAll] = useState(false);

  if (!selectedCard) return null;

  function convertHoursToDayHour(hours: number): string {
    if (hours < 0) return "Invalid input"; // Handle negative inputs

    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;

    const result = [];
    if (days > 0) result.push(`${days} Day${days > 1 ? "s" : ""}`);
    if (remainingHours > 0)
      result.push(`${remainingHours} Hour${remainingHours > 1 ? "s" : ""}`);

    return result.length > 0 ? result.join(" ") : "0 Hours";
  }
  const rentTime = convertHoursToDayHour(selectedCard.totalRentHour);
  const visitTracker = (nickname: string) => {
    const linkTracker =
      "https://tracker.gg/valorant/profile/riot/" +
      encodeURIComponent(nickname) +
      "/overview";
    window.open(linkTracker, "_blank");
  };
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

  const skinsPerRow = 3;
  const visibleSkins = showAll
    ? selectedCard.skinList
    : selectedCard.skinList.slice(0, skinsPerRow * 2);

  const dataString = selectedCard.priceTier.description;

  const formattedData = dataString.match(/\d+\s\w+\s=\s\d+k/g) || [];
  return (
    <DialogContent className="sm:max-w-[600px] max-w-[380px] p-0 bg-[#333640] [&>button]:hidden border-0">
      <ScrollArea className="sm:max-h-[600px] max-h-[600px] no-scrollbar p-0 overflow-y-auto ">
        <Carousel className="overflow-hidden sm:max-w-[600px] max-w-[380px]">
          <CarouselContent>
            {selectedCard.otherImages?.map((image, index) => (
              <CarouselItem key={index}>
                <div className="h-auto w-full relative">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={image.imageUrl}
                      alt="Content Image"
                      fill
                      className="object-cover rounded-t-xl"
                      unoptimized
                    />
                  </AspectRatio>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="absolute top-1/2 -translate-y-1/2 left-12 z-10">
            <CarouselPrevious />
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-12 z-10">
            <CarouselNext />
          </div>
        </Carousel>
        <div className="w-full">
          <DialogTitle></DialogTitle>
          <DialogDescription />
          <div className="relative">
            {/* Account Rank */}
            <div
              className="relative bg-gradient-to-r from-[#FFB800] to-[#D48002] text-white font-bold px-8 py-2 text-2xl italic inline-block w-[70%]"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)"
              }}
            >
              {selectedCard.accountRank}
            </div>
            <div className="h-full w-full absolute top-0 left-auto">
              <figure className="absolute top-0 right-0 h-[120px] w-[120px]">
                <Image
                  src={getTier(selectedCard.priceTier.code)}
                  alt="Price Tier"
                  fill
                />
              </figure>
            </div>
          </div>
          <div className="px-4">
            <div className="relative mb-3 mx-3 pt-4">
              {/* Account Code */}
              <div className="flex items-center gap-[8px]">
                {selectedCard.availabilityStatus === "AVAILABLE" && (
                  <span className="w-4 h-4 bg-[#66FFF8] rounded-full"></span>
                )}
                {selectedCard.availabilityStatus === "IN_USE" && (
                  <figure className="relative w-[28px] h-[28px]">
                    <Image src="/cardneed/in_use.svg" fill alt="In_Use" />
                  </figure>
                )}

                {/* Account Code */}
                <span className="font-bold text-[#f36164] text-4xl">
                  {selectedCard.accountCode}
                </span>
              </div>

              <div className="flex sm:flex-row flex-col mb-5 gap-2 sm:items-center max-sm:justify-center text-roseWhite text-sm  mt-2  font-sans">
                <span className="flex gap-2 items-center">
                  <figure className="w-5 h-5 relative">
                    <Image
                      src="modal/restart_alt.svg"
                      alt="Restart_all Icon"
                      fill
                      className="object-cover rounded-t-xl w-full"
                      unoptimized
                    />
                  </figure>
                  <span className="pt-[2px]">Rent Count: {rentTime}</span>
                </span>

                <span className="max-sm:hidden">|</span>
                <span className="flex gap-1 font-bold">
                  <span
                    className=" cursor-pointer"
                    onClick={() => visitTracker(selectedCard.nickname)}
                  >
                    {selectedCard.nickname}
                  </span>
                  <ExternalLink
                    className="w-4 h-4 text-white inline"
                    onClick={() => visitTracker(selectedCard.nickname)}
                  />
                </span>
              </div>

              <div className="h-[2px] w-full bg-[#484C57] my-6"></div>
              <div className="mb-3 font-sans text-white font-bold">
                Total Skin <span>{selectedCard.skinList.length}</span>
              </div>
              <div>
                <div className="flex flex-wrap gap-2 pb-5">
                  {visibleSkins.map((skin, index) => (
                    <Badge
                      variant="secondary"
                      key={index}
                      className="bg-[#4b4f5e] font-normal font-sans text-[#E6E6E6] text-sm max-sm:text-xs hover:bg-[#4b4f5e]"
                    >
                      {skin}
                    </Badge>
                  ))}
                </div>
                {/* Show More / Hide Button */}
                {selectedCard.skinList.length > skinsPerRow && (
                  <div className="flex justify-end gap-2 items-center">
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="text-[#E6E6E6] text-sm mt-2 hover:underline flex items-center gap-2"
                    >
                      {showAll ? "Lihat lebih sedikit" : "Lihat Selengkapnya"}
                      {showAll ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </div>
                )}
              </div>
              <div className="h-[2px] w-full bg-[#484C57] my-6"></div>
              {/* {selectedCard.description !== null && (
                <div>
                  <p className="text-sm font-semibold text-roseWhite">
                    Description
                  </p>
                  <p className="text-sm pt-2 text-roseWhite">
                    {selectedCard.description}
                  </p>
                </div>
              )} */}

              <div>
                <p className="mb-3 font-sans text-white font-bold">
                  Price List
                </p>
              </div>

              <div className="flex gap-4">
                {formattedData.map((item, index) => {
                  const [time, unit, , value] = item.split(" ");
                  return (
                    <div
                      key={index}
                      className="bg-gray-700 text-[#E6E6E6] text-center rounded overflow-hidden min-w-[70px]"
                    >
                      <div className="bg-[#F36164] text-[#E6E6E6] text-sm p-1 font-valorant">
                        {`${time} ${unit}`.toUpperCase()}
                      </div>
                      <div className="text-2xl font-bold p-2 text-[#E6E6E6]">
                        {value.toUpperCase()}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between pt-10">
                <Button
                  onClick={() => onClose()}
                  className=" text-roseWhite font-semibold bg-[#FF0000] rounded-[16px] "
                >
                  Close
                </Button>
                <Whatsapp id={selectedCard.accountCode} />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
};

export default CardModal;
