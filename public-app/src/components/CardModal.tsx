'use client'
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { availabilityStatuses } from "@/lib/constants";
import { DialogDescription } from "@radix-ui/react-dialog";
import Image from "next/image";
import { Button } from "./ui/button";
import Whatsapp from "./Whatsapp";
import { AccountEntity } from "@/types/account.type";
import { ExternalLink } from "lucide-react";

interface CardModalProps {
  selectedCard: AccountEntity | null;
  onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ selectedCard, onClose }) => {
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
  return (
    <DialogContent className="w-full sm:max-w-[600px] max-w-[380px] p-0 bg-[#333640] [&>button]:hidden border-0">
      <ScrollArea className="sm:max-h-[600px] max-h-[600px] no-scrollbar p-0 overflow-y-auto">
        <div>
          <Carousel>
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
        </div>
        <div className="p-[16px] w-full">
          <DialogTitle></DialogTitle>
          <DialogDescription />
          <div className="px-4">
            <div className="relative mb-3 mx-3 pt-4">
              <div className="flex justify-between items-center pb-2">
                <p className="mb-1 font-bold text-red-500 text-4xl">
                  {selectedCard.accountCode}
                </p>
                <Badge
                  variant="outline"
                  className="sm:text-2xl text-xl font-bold text-roseWhite "
                >
                  {selectedCard.priceTier.code}
                </Badge>
              </div>
              <div className="flex md:justify-between md:flex-row mt-2 flex-col justify-start">
                <p className="text-roseWhite mb-2 text-md">Rent Count: {rentTime}</p>
                <div className="flex mb-5 gap-1">
                    <p
                      className="text-md text-roseWhite cursor-pointer"
                      onClick={() => visitTracker(selectedCard.nickname)}
                    >
                      {selectedCard.nickname}
                    </p>
                    <ExternalLink className="w-5 h-5 text-white" onClick={() => visitTracker(selectedCard.nickname)} />

                  </div>
              </div>

              <div className="flex gap-2 mb-3 flex-row">
                {availabilityStatuses.map((status) =>
                  selectedCard.availabilityStatus == status.value ? (
                    <Badge
                      variant="secondary"
                      key={status.value}
                      className={`text-sm max-sm:text-xs text-center font-semibold text-zinc-100 px-3 cursor-default ${
                        status.value === "AVAILABLE"
                          ? "bg-green-600 hover:bg-green-700"
                          : status.value === "IN_USE"
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-destructive hover:bg-red-600"
                      }`}
                    >
                      {status.label}
                    </Badge>
                  ) : null
                )}

                <Badge
                  variant="secondary"
                  className={`px-3 text-center font-semibold text-primary-foreground max-sm:text-xs text-sm cursor-default ${
                    selectedCard.accountRank.startsWith("Iron")
                      ? "bg-gray-600 hover:bg-gray-700 "
                      : selectedCard.accountRank.startsWith("Bronze")
                      ? "bg-amber-600 hover:bg-amber-700"
                      : selectedCard.accountRank.startsWith("Silver")
                      ? "bg-gray-500 hover:bg-gray-600"
                      : selectedCard.accountRank.startsWith("Gold")
                      ? "bg-yellow-600 hover:bg-yellow-700"
                      : selectedCard.accountRank.startsWith("Platinum")
                      ? "bg-cyan-700 hover:bg-cyan-800"
                      : selectedCard.accountRank.startsWith("Diamond")
                      ? "bg-purple-600 hover:bg-purple-700"
                      : selectedCard.accountRank.startsWith("Ascendant")
                      ? "bg-emerald-700 hover:bg-emerald-800"
                      : selectedCard.accountRank.startsWith("Immortal")
                      ? "bg-red-800 hover:bg-red-900"
                      : selectedCard.accountRank === "Radiant"
                      ? "bg-yellow-600 hover:bg-yellow-700"
                      : "bg-black"
                  }`}
                >
                  {selectedCard.accountRank}
                </Badge>
              </div>
              <p className="font-semibold text-roseWhite text-sm pt-2">
                List of skins ({selectedCard.skinList.length})
              </p>
              <div className="flex flex-wrap gap-2 pt-2 whitespace-nowrap text-sm max-sm:text-xs cursor-default">
                {selectedCard.skinList?.map((skin: string, index: number) => (
                  <Badge variant="secondary" key={index}>
                    {skin}
                  </Badge>
                ))}
              </div>

              {selectedCard.description !== null && (
                <div>
                  <p className="text-sm font-semibold pt-6 text-roseWhite">
                    Description
                  </p>
                  <p className="text-sm pt-2 text-roseWhite">
                    {selectedCard.description}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold pt-6 text-roseWhite">
                  Price List
                </p>
              </div>
              <div>
                {selectedCard.priceTier.description
                  .split("k")
                  .filter(Boolean)
                  .map((part: string, index: number) => (
                    <span key={index} className="text-sm text-roseWhite">
                      {part.trim() + "k"}
                      <br />
                    </span>
                  ))}
              </div>
              <div className="flex justify-between pt-6">
                <Button
                  onClick={() => onClose()}
                  variant="destructive"
                  className=" text-roseWhite font-semibold "
                >
                  Close
                </Button>
                <Whatsapp />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
};

export default CardModal;
