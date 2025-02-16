"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { availabilityStatuses } from "@/lib/constants";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CardDialog from "./CardModal";
// Define types for props and data items
interface CardItem {
  id: number;
  username: string;
  accountCode: string;
  description: string;
  accountRank: string;
  availabilityStatus: string;
  nextBooking?: Date | null;
  nextBookingDuration?: Date | null;
  expireAt?: Date | null;
  totalRentHour: number;
  password: string;
  passwordUpdatedAt: Date | null;
  skinList: string[];
  createdAt: Date;
  updatedAt: Date;
  priceTierId: number;
  thumbnailId: number;
  priceTier: {
    id: number;
    code: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  };
  thumbnail: {
    id: number;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    accountId?: number | null;
  };
  otherImages: {
    id: number;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    accountId?: number | null;
  }[];
}

interface CardProps {
  data?: CardItem[];
}
const Card: React.FC<CardProps> = ({ data }) => {
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [isAboveLargeDesktop, setIsAboveLargeDesktop] =
    useState<boolean>(false);
  const [isAboveSmallDesktop, setIsAboveSmallDesktop] =
    useState<boolean>(false);
  const [isAbovePhone, setIsAbovePhone] = useState<boolean>(false);

  // Function to determine if the screen size is above `small-desktop`
  const updateScreenSize = () => {
    setIsAboveLargeDesktop(window.innerWidth >= 1700);
    setIsAboveSmallDesktop(window.innerWidth >= 1024);
    setIsAbovePhone(window.innerWidth >= 640);
  };

  useEffect(() => {
    // Set initial screen size
    updateScreenSize();
    // Add a resize listener
    window.addEventListener("resize", updateScreenSize);
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  // Dynamically assign grid classes only if the screen size is above `small-desktop`
  const getGridClass = (index: number, total: number): string => {
    if (isAboveLargeDesktop) return "col-span-3";
    if (!isAboveSmallDesktop && isAbovePhone) return "col-span-6";
    if (!isAboveSmallDesktop && !isAbovePhone) return "col-span-12";
    // if (total === 5 && index >= 3) return "col-span-6"; // 3x2 grid with full-width bottom row
    // if (total === 7 && index === 6) return "col-span-12"; // 3x3x1 grid with full-width last item
    return "col-span-4"; // Default to 3 columns
  };

  const processCardData = (items: CardItem[] | undefined) => {
    return items?.map((item) => ({
      ...item,
      otherImages: item.thumbnail
        ? [{ ...item.thumbnail, isThumbnail: true }, ...item.otherImages]
        : item.otherImages,
    }));
  };
  const visitTracker = (username: string) => {
    const linkTracker =
      "https://tracker.gg/valorant/profile/riot/" +
      encodeURIComponent(username) +
      "/overview";
    window.open(linkTracker, "_blank");
  };
  const processedData = processCardData(data);

  return (
    <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
      <div
        className="grid grid-cols-12 xl:gap-0 gap-4 justify-items-center w-full 2xl:gap-y-28 xl:gap-y-10 sm:gap-y-7 gap-y-8 "
        ref={ref}
      >
        {processedData?.map((item, index) => (
          <div
            className={`rounded-xl relative h-auto w-full max-w-[420px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[340px] xl:max-w-[400px] 2xl:max-w-[420px] transform hover:shadow-[0px_4px_15px_rgba(255,255,255,0.5)] hover:scale-[1.02] transition-all duration-300 hover:cursor-pointer
  ${getGridClass(index, processedData.length)}`}
            key={item.id}
            onClick={() => setSelectedCard(item)}
          >
            <div className="h-full w-full bg-gray-800 rounded-xl ">
              <div>
                <figure className="relative mb-2  w-full">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={item.thumbnail.imageUrl}
                      alt="service logo"
                      fill
                      className="object-cover rounded-t-xl"
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
                    {/* <p className="sm:text-4xl text-xl font-bold text-roseWhite"> */}
                      {item.priceTier.code}
                    {/* </p> */}
                    </Badge>
                  </div>
                  <p
                    className="text-sm mb-2 text-roseWhite cursor-pointer underline"
                    onClick={() => visitTracker(item.username)}
                  >
                    {item.username}
                  </p>
                  <div className="flex flex-wrap gap-y-2 gap-2 pb-5">
                    {availabilityStatuses.map((status) =>
                      item.availabilityStatus == status.value ? (
                        <Badge
                          variant="outline"
                          key={status.value}
                          className={`text-sm max-sm:text-xs text-center font-semibold text-zinc-100 px-3 ${
                            status.value === "AVAILABLE"
                              ? "bg-green-600"
                              : status.value === "IN_USE"
                              ? "bg-yellow-500"
                              : "bg-destructive"
                          }`}
                        >
                          {status.label}
                        </Badge>
                      ) : null
                    )}

                    <Badge
                      variant="outline"
                      className={`px-3 text-center font-semibold text-primary-foreground max-sm:text-xs text-sm ${
                        item.accountRank.startsWith("Iron")
                          ? "bg-gray-600"
                          : item.accountRank.startsWith("Bronze")
                          ? "bg-amber-600"
                          : item.accountRank.startsWith("Silver")
                          ? "bg-gray-500"
                          : item.accountRank.startsWith("Gold")
                          ? "bg-yellow-600"
                          : item.accountRank.startsWith("Platinum")
                          ? "bg-cyan-700"
                          : item.accountRank.startsWith("Diamond")
                          ? "bg-purple-600"
                          : item.accountRank.startsWith("Ascendant")
                          ? "bg-emerald-700"
                          : item.accountRank.startsWith("Immortal")
                          ? "bg-red-800"
                          : item.accountRank === "Radiant"
                          ? "bg-yellow-600"
                          : "bg-black"
                      }`}
                    >
                      {item.accountRank}
                    </Badge>
                    {/* <p className="font-semibold text-roseWhite text-sm pb-3">
                    Skins ({item.skinList.length} items)
                  </p> */}
                    {item.skinList?.slice(0, 3).map((skin, index) => (
                      <Badge
                        variant="secondary"
                        key={index}
                        className="bg-red-500 text-roseWhite text-sm max-sm:text-xs"
                      >
                        {skin}
                      </Badge>
                    ))}
                    <Badge
                      variant="secondary"
                      key={index}
                      className="bg-red-500 text-roseWhite text-sm max-sm:text-xs"
                    >
                      + {item.skinList.length - 3} more
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CardDialog
        selectedCard={selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </Dialog>
  );
};

export default Card;
