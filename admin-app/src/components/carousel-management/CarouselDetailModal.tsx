import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { carouselSlideService } from "@/services/carousel.service";
import { uploadService } from "@/services/upload.service";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "@/hooks/useToast";

import {
  CarouselSlide,
  CarouselSlideRequest
} from "@/types/carousel.type";

import { Loader2Icon, TrashIcon, UploadIcon } from "lucide-react";

type Props = {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  resetParent: () => Promise<void>;
  slide?: CarouselSlide;
};

export default function CarouselDetailModal({
  isOpen,
  onOpenChange,
  resetParent,
  slide
}: Props) {
  const isEditMode = !!slide;
  const title = isEditMode ? "Edit Slide" : "Add New Slide";

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(10);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  useEffect(() => {
    if (slide) {
      setPreview(slide.image.imageUrl);
      setDuration(slide.duration);
    } else {
      setPreview(null);
      setDuration(10);
    }

    setFile(null);
  }, [slide]);

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreview(url);
  };

  const getMediaType = () => {
    if (file) {
      return file.type.startsWith("video/") ? "VIDEO" : "IMAGE";
    }
    if (slide) {
      return slide.image.type;
    }
    return "IMAGE";
  };

  const allReady = !!preview && duration > 0;

  const handleSave = async () => {
    if (!isEditMode && !file) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: "Please select an image file."
      });
      return;
    }

    if (!duration) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: "Duration is required."
      });
      return;
    }

    setIsLoadingSave(true);
    try {
      let imageId: number | undefined;

      if (file) {
        const responses = await uploadService.uploadCarouselImages([file]);
        imageId = responses[0].id;
      }

      if (isEditMode) {
        const payload: Partial<CarouselSlideRequest> = {
          duration
        };
        if (imageId !== undefined) {
          payload.imageId = imageId;
        }
        await carouselSlideService.update(slide!.id, payload);
      } else {
        const payload: CarouselSlideRequest = {
          imageId: imageId!,
          duration
        };
        await carouselSlideService.create(payload);
      }

      resetParent();

      setFile(null);
      setPreview(null);

      onOpenChange(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });
    } finally {
      setIsLoadingSave(false);
    }
  };

  const handleDelete = async () => {
    if (!isEditMode) return;
    setIsLoadingDelete(true);
    try {
      await carouselSlideService.deleteSlide(slide!.id);
      resetParent();
      onOpenChange(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });
    } finally {
      setIsLoadingDelete(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription>
            {isEditMode
              ? "Atur gambar untuk slide ini (4:5 aspect ratio, 1080px × 1350px)."
              : "Upload gambar untuk slide ini (4:5 aspect ratio, 1080px × 1350px)."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="duration">Duration (Seconds)</Label>
          <Input
            type="number"
            id="duration"
            placeholder="Duration in seconds"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>

        <div className="space-y-4 mt-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="relative overflow-hidden aspect-[4/5] max-w-[432px] mx-auto">
                {preview ? (
                  getMediaType() === "VIDEO" ? (
                    <video
                      src={preview}
                      className="w-full h-full object-contain"
                      muted
                      autoPlay
                      loop
                    />
                  ) : (
                    <img
                      src={preview}
                      alt="Carousel slide"
                      className="w-full h-full object-contain"
                    />
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-2 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center text-gray-500 mb-4">
                      <p className="text-sm font-medium">4:5 Aspect Ratio</p>
                      <p className="text-xs">1080px × 1350px</p>
                    </div>
                    <Input
                      id="upload-image"
                      type="file"
                      accept="image/*,video/*"
                      className="sr-only"
                      onChange={(e) =>
                        handleFileChange(e.target.files![0])
                      }
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() =>
                        document.getElementById("upload-image")?.click()
                      }
                    >
                      <UploadIcon className="h-4 w-4" />
                      Upload Media
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <Label htmlFor="image-type">Image Type</Label>
                <div className="mt-1 text-sm" id="image-type">
                  Instagram Post (4:5)
                </div>
              </div>

              <div>
                <Label htmlFor="dimensions">Dimensions</Label>
                <div className="mt-1 text-sm" id="dimensions">
                  1080px × 1350px
                </div>
              </div>

              {preview && (
                <div className="pt-2">
                  <Label
                    htmlFor="upload-image"
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-sm text-primary hover:underline">
                      <UploadIcon className="h-4 w-4" />
                      Change media
                    </div>
                  </Label>
                  <Input
                    id="upload-image"
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFileChange(e.target.files![0])
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          {isEditMode && (
            <Button variant="destructive" onClick={handleDelete}>
              {isLoadingDelete ? (
                <Loader2Icon className="w-4 h-4 animate-spin" />
              ) : (
                <TrashIcon className="w-4 h-4" />
              )}
              Delete Slide
            </Button>
          )}
          <Button onClick={handleSave} disabled={!allReady}>
            {isLoadingSave && <Loader2Icon className="w-4 h-4 animate-spin" />}
            {isEditMode ? "Save Changes" : "Add Slide"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
