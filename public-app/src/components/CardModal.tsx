import Image from "next/image";
import {
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import Whatsapp from "./Whatsapp";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CardModalProps {
  selectedCard: any;
  onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ selectedCard, onClose }) => {
  const [api, setApi] = useState<any>(null);

  if (!selectedCard) return null;

  return (
    <DialogContent className="xl:max-w-[600px] p-0">
      <ScrollArea className="max-h-[600px] no-scrollbar p-0">
        <div className="p-[16px]">
          <DialogTitle>{selectedCard.accountCode}</DialogTitle>
          <DialogDescription />
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

              <div className="absolute top-1/2 -translate-y-1/2 left-12 z-10">
                <CarouselPrevious />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-12 z-10">
                <CarouselNext />
              </div>
            </Carousel>
          </div>
          <div className="relative mb-3 mx-3">
            <div className="flex justify-between items-center">
              <h3 className="mb-1 text-base font-bold">
                {selectedCard.accountCode}
              </h3>
              <p className="text-base font-bold">{selectedCard.username}</p>
            </div>
            <p className="text-sm font-semibold">List of skins:</p>
            {selectedCard.skinList?.map((skin: string, index: number) => (
              <div
                className={`bg-red-100 text-xs me-2 py-0.5 rounded-full text-center font-semibold flex`}
                key={index}
              >
                {skin}
              </div>
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

          <DialogFooter>
            <Whatsapp />
          </DialogFooter>
        </div>
      </ScrollArea>
    </DialogContent>
  );
};

export default CardModal;
