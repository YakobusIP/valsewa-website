import { Fragment, useCallback, useEffect, useState } from "react";

import { carouselSlideService } from "@/services/carousel.service";

import CarouselDetailModal from "@/components/carousel-management/CarouselDetailModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { toast } from "@/hooks/useToast";

import { CarouselSlide } from "@/types/carousel.type";

import { ImageIcon, PencilIcon, PlusIcon } from "lucide-react";

export default function CarouselManagementModal() {
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState<CarouselSlide | undefined>(
    undefined
  );

  const fetchAllSlides = useCallback(async () => {
    try {
      const response = await carouselSlideService.fetchAll();
      setSlides(response.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });
    }
  }, []);

  const openEditModal = (slide: CarouselSlide) => {
    setActiveSlide(slide);
    setIsDetailOpen(true);
  };

  const openAddModal = () => {
    setActiveSlide(undefined);
    setIsDetailOpen(true);
  };

  useEffect(() => {
    fetchAllSlides();
  }, [fetchAllSlides]);

  return (
    <Fragment>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full xl:w-fit">
            <ImageIcon className="h-4 w-4" />
            Carousel Management
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Carousel Management</DialogTitle>
            <DialogDescription>
              Atur gambar di dalam slides carousel.
            </DialogDescription>
          </DialogHeader>

          {/* Carousel Display */}
          <Carousel className="w-full overflow-hidden">
            <CarouselContent className="overflow-visible">
              {slides.map((slide) => (
                <CarouselItem key={slide.id}>
                  <Card>
                    <CardContent className="flex aspect-video items-center justify-center p-6 relative">
                      {slide.image126.type === "VIDEO" ? (
                        <video
                          src={slide.image126.imageUrl}
                          className="rounded-md object-cover w-full h-full"
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={slide.image126.imageUrl || "/1200x600.svg"}
                          alt={`Slide ${slide.id}`}
                          className="rounded-md object-cover w-full h-full"
                        />
                      )}

                      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        {slide.duration}s
                      </div>

                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                        onClick={() => openEditModal(slide)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="flex justify-end">
            <Button onClick={openAddModal} className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Add New Slide
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <CarouselDetailModal
        isOpen={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        resetParent={fetchAllSlides}
        slide={activeSlide}
      />
    </Fragment>
  );
}
