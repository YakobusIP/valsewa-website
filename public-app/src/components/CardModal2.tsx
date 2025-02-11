import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import Image from "next/image";
import { ranks, availabilityStatuses } from "@/lib/constants";
import Whatsapp from "./Whatsapp";
import { X } from "lucide-react";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCard: any;
}

const CardModal2: React.FC<CardModalProps> = ({
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
    <Dialog>
      <DialogContent className="sm:max-w-md">
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
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal2;
