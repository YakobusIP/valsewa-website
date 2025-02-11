"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ranks, availabilityStatuses } from "@/lib/constants";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CardDialog from "./CardModal";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
    if (isAboveLargeDesktop) return "col-span-3"
    if (!isAboveSmallDesktop && isAbovePhone) return "col-span-6";
    if (!isAboveSmallDesktop && !isAbovePhone) return "col-span-12";
    if (total === 5 && index >= 3) return "col-span-6"; // 3x2 grid with full-width bottom row
    if (total === 7 && index === 6) return "col-span-12"; // 3x3x1 grid with full-width last item
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
  const processedData = processCardData(data);
  return (
    <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
      <div
        className="grid grid-cols-12 xl:gap-0 gap-4 justify-items-center w-full 2xl:gap-y-28 xl:gap-y-10 sm:gap-y-7 gap-y-8 "
        ref={ref}
      >
        {processedData?.map((item, index) => (
          <div
            className={`rounded-xl relative h-auto w-full max-w-[420px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[340px] xl:max-w-[400px] 2xl:max-w-[420px] transform hover:shadow-[0px_4px_15px_rgba(255,255,255,0.5)] hover:scale-[1.02] transition-all duration-300
  ${getGridClass(index, processedData.length)}`}
            key={item.id}
            onClick={() => setSelectedCard(item)}
          >
            <div className="h-full w-full bg-gray-800 rounded-xl">
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
              <div className="relative mb-3 mx-3 pt-4">
                <div className="flex justify-between items-center pb-2">
                  <Badge
                    variant="outline"
                    className="mb-1 font-bold text-red-500 text-2xl"
                  >
                    {item.accountCode}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xl font-bold text-white"
                  >
                    {item.priceTier.code}
                  </Badge>
                </div>
                <p className="text-sm mb-2 text-white">{item.username}</p>
                <div className="flex gap-0 mb-3">
                  {ranks.map((rank) =>
                    item.accountRank == rank.value ? (
                      <span
                        key={rank.value}
                        className={`bg-orange-300 text-xs me-2 py-0.5 rounded-full min-w-[100px] text-center font-semibold ${
                          item.accountRank.startsWith("iron")
                            ? "bg-gray-400"
                            : item.accountRank.startsWith("bronze")
                            ? "bg-amber-600"
                            : item.accountRank.startsWith("silver")
                            ? "bg-gray-300"
                            : item.accountRank.startsWith("gold")
                            ? "bg-yellow-400"
                            : item.accountRank.startsWith("platinum")
                            ? "bg-blue-400"
                            : item.accountRank.startsWith("diamond")
                            ? "bg-purple-400"
                            : item.accountRank.startsWith("ascendant")
                            ? "bg-emerald-500"
                            : item.accountRank.startsWith("immortal")
                            ? "bg-red-400"
                            : item.accountRank === "radiant"
                            ? "bg-yellow-600"
                            : "bg-gray-200"
                        }`}
                      >
                        {rank.label}
                      </span>
                    ) : null
                  )}
                </div>
                <p className="text-sm font-semibold text-white">
                  List of skins ({item.skinList.length}):
                </p>
                {item.skinList?.slice(0, 3).map((skin, index) => (
                  <ul className="list-disc pl-3 text-white" key={index}>
                    <li className="text-xs">{skin}</li>
                  </ul>
                ))}

                <p className="text-sm  pt-6 text-white">{item.description}</p>
                <div className="flex justify-end pt-4 ">
                  {availabilityStatuses.map((status) =>
                    item.availabilityStatus == status.value ? (
                      <span
                        key={status.value}
                        className={`text-xs me-2 py-0.5 rounded-full min-w-[100px] text-center font-semibold ${
                          status.value === "AVAILABLE"
                            ? "bg-green-300"
                            : status.value === "IN_USE"
                            ? "bg-yellow-400"
                            : "bg-red-500"
                        }`}
                      >
                        {status.label}
                      </span>
                    ) : null
                  )}
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
