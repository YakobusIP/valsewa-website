"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { availabilityStatuses } from "@/lib/constants";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CardModal from "./CardModal";
import { AccountEntity } from "@/types/account.type";
import { ExternalLink } from "lucide-react";
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
      otherImages: item.thumbnail && item.otherImages
        ? [{ ...item.thumbnail, isThumbnail: true }, ...item.otherImages]
        : item.otherImages,
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

  return (
    <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
      <div
  className="grid grid-cols-12 md:gap-x-10 gap-x-6 justify-items-center w-full 2xl:gap-y-14 xl:gap-y-10 sm:gap-y-7 gap-y-8 px-3"
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
          <figure className="relative mb-2 w-full">
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
        <div className="px-4">
          <div className="relative mb-3 mx-3 pt-4">
            <div className="flex justify-between items-center pb-2">
              <p className="mb-1 font-bold text-red-500 text-4xl">
                {item.accountCode}
              </p>
              <Badge
                variant="outline"
                className="sm:text-2xl text-xl font-bold text-roseWhite"
              >
                {item.priceTier.code}
              </Badge>
            </div>
            <div className="flex mb-5 gap-1">
              <p
                className="text-sm text-roseWhite cursor-pointer"
                onClick={() => visitTracker(item.nickname)}
              >
                {item.nickname}
              </p>
              <ExternalLink
                className="w-5 h-5 text-white"
                onClick={() => visitTracker(item.nickname)}
              />

                  </div>
                  <div className="flex flex-wrap gap-y-2 gap-2 pb-5">
                    {availabilityStatuses.map((status, index) =>
                      item.availabilityStatus == status.value ? (
                        <Badge
                          variant="secondary"
                          key={index}
                          className={`text-sm max-sm:text-xs text-center font-bold text-white px-3  ${
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
                      className={`px-3 text-center font-semibold text-primary-foreground max-sm:text-xs text-sm ${
                        item.accountRank.startsWith("Iron")
                          ? "bg-gray-600 hover:bg-gray-700 "
                          : item.accountRank.startsWith("Bronze")
                          ? "bg-amber-600 hover:bg-amber-700"
                          : item.accountRank.startsWith("Silver")
                          ? "bg-gray-500 hover:bg-gray-600"
                          : item.accountRank.startsWith("Gold")
                          ? "bg-yellow-600 hover:bg-yellow-700"
                          : item.accountRank.startsWith("Platinum")
                          ? "bg-cyan-700 hover:bg-cyan-800"
                          : item.accountRank.startsWith("Diamond")
                          ? "bg-purple-600 hover:bg-purple-700"
                          : item.accountRank.startsWith("Ascendant")
                          ? "bg-emerald-700 hover:bg-emerald-800"
                          : item.accountRank.startsWith("Immortal")
                          ? "bg-red-800 hover:bg-red-900"
                          : item.accountRank === "Radiant"
                          ? "bg-yellow-600 hover:bg-yellow-700"
                          : "bg-black"
                      }`}
                    >
                      {item.accountRank}
                    </Badge>
                    {item.skinList?.slice(0, 3).map((skin, index) => (
                      <Badge
                        variant="secondary"
                        key={index}
                        className="bg-[#4b4f5e] font-normal text-roseWhite text-sm max-sm:text-xs hover:bg-red-700"
                      >
                        {skin}
                      </Badge>
                    ))}
                    {item.skinList.length > 3 && (
                      <Badge
                        variant="secondary"
                        key={index}
                        className="bg-[#4b4f5e] font-normal text-roseWhite text-sm max-sm:text-xs hover:bg-red-700"
                      >
                        + {item.skinList.length - 3} more
                      </Badge>
                    )}
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
