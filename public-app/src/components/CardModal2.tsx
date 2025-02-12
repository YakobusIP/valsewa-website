import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { type CarouselApi } from "@/components/ui/carousel";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { ranks, availabilityStatuses } from "@/lib/constants";
import Whatsapp from "./Whatsapp";
import { X } from "lucide-react";
interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCard: any;
}

const CardModal: React.FC<CardModalProps> = ({
  isOpen,
  onClose,
  selectedCard,
}) => {
  if (!isOpen) return null;

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 bg-black/50 flex items-center justify-center"
    >
      <div className="bg-white max-w-lg w-full p-6 rounded-xl relative">
        <button
          className="absolute top-1 right-1 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <div className="w-full relative">
          <Carousel setApi={setApi}>
            <CarouselContent>
              {selectedCard.otherImages.map((image: any, index: number) => (
                <CarouselItem key={index}>
                  <div className="h-64 w-full relative">
                    <Image
                      src={image.imageUrl || "public/1920x500.svg"}
                      alt="Descriptive Alt Text"
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-2 z-10">
              <CarouselPrevious />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-2 z-10">
              <CarouselNext />
            </div>
          </Carousel>
        </div>

        <div className="relative mb-3 mx-3">
          <div className="flex justify-between items-center">
            <h3 className="mb-1 text-base font-bold">
              {selectedCard.accountCode}
            </h3>
            <p className="text-base font-bold ">{selectedCard.username}</p>
          </div>
          <div className="flex justify-between">
            <p>Rent Count: {selectedCard.totalRentHour}</p>
            <div className="flex justify-end">
              {availabilityStatuses.map((status, index) =>
                selectedCard.availabilityStatus == status.value ? (
                  <span
                    key={index}
                    className={`text-xs py-1 rounded-full min-w-[100px] text-center font-semibold ${
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
          <p className="text-sm mb-2"></p>
          <div className="flex gap-0 mb-3">
            {ranks.map((rank) =>
              selectedCard.accountRank == rank.value ? (
                <span
                  key={rank.value}
                  className={`bg-orange-300 text-xs me-2 py-0.5 rounded-full min-w-[100px] text-center font-semibold ${
                    selectedCard.accountRank.startsWith("iron")
                      ? "bg-gray-400"
                      : selectedCard.accountRank.startsWith("bronze")
                      ? "bg-amber-600"
                      : selectedCard.accountRank.startsWith("silver")
                      ? "bg-gray-300"
                      : selectedCard.accountRank.startsWith("gold")
                      ? "bg-yellow-400"
                      : selectedCard.accountRank.startsWith("platinum")
                      ? "bg-blue-400"
                      : selectedCard.accountRank.startsWith("diamond")
                      ? "bg-purple-400"
                      : selectedCard.accountRank.startsWith("ascendant")
                      ? "bg-emerald-500"
                      : selectedCard.accountRank.startsWith("immortal")
                      ? "bg-red-400"
                      : selectedCard.accountRank === "radiant"
                      ? "bg-yellow-600"
                      : "bg-gray-200"
                  }`}
                >
                  {rank.label}
                </span>
              ) : null
            )}
            <span
              className={`bg-red-500 text-xs me-2 py-0.5 rounded-full min-w-[50px] text-center font-semibold`}
            >
              27
            </span>
          </div>
          <p className="text-sm font-semibold">List of skins:</p>
          {selectedCard.skinList
            ?.slice(0, selectedCard.skinList.length / 2)
            .map((skin: string, index: number) => (
              <span
                className={`bg-red-100 text-xs me-2 py-0.5 rounded-full text-center font-semibold`}
                key={index}
              >
                {skin}
              </span>
            ))}
          {selectedCard.skinList
            ?.slice(
              selectedCard.skinList.length / 2,
              selectedCard.skinList.length
            )
            .map((skin: string, index: number) => (
              <span
                className={`bg-red-100 text-xs me-2 py-0.5 rounded-full text-center font-semibold`}
                key={index}
              >
                {skin}
              </span>
            ))}

          <p className="text-sm font-semibold pt-6">Price List:</p>
          <p className="text-sm">
            {selectedCard.priceTier.description
              .split("k")
              .filter(Boolean)
              .map((part: string, index: number) => (
                <span key={index}>
                  {part.trim() + "k"}
                  <br />
                </span>
              ))}
          </p>
        </div>
        <div className="pt-5 flex justify-between items-end">
          <Button onClick={onClose} variant="destructive">
            Close
          </Button>

          <Whatsapp />
        </div>
      </div>
    </Dialog>
  );
};

export default CardModal;
