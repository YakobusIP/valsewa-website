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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { toast } from "@/hooks/useToast";

import {
  AspectRatio,
  CarouselSlide,
  CarouselSlideRequest
} from "@/types/carousel.type";

import { CheckIcon, Loader2Icon, TrashIcon, UploadIcon } from "lucide-react";

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

  const [files, setFiles] = useState<Partial<Record<AspectRatio, File>>>({});
  const [previews, setPreviews] = useState<
    Partial<Record<AspectRatio, string>>
  >({});
  const [selectedTab, setSelectedTab] = useState<AspectRatio>("126");
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  useEffect(() => {
    if (slide) {
      setPreviews({
        "123": slide.image123.imageUrl,
        "126": slide.image126.imageUrl,
        "129": slide.image129.imageUrl
      });
    } else {
      setPreviews({});
    }

    setFiles({});
  }, [slide]);

  const handleFileChange = (aspect: AspectRatio, file: File) => {
    setFiles((f) => ({ ...f, [aspect]: file }));
    const url = URL.createObjectURL(file);
    setPreviews((p) => ({ ...p, [aspect]: url }));
  };

  const getPlaceholder = (aspect: AspectRatio) => {
    switch (aspect) {
      case "123":
        return "/1200x300.webp";
      case "126":
        return "/1200x600.webp";
      case "129":
        return "/1200x900.webp";
    }
  };

  const getAspectRatioLabel = (aspect: AspectRatio) => {
    switch (aspect) {
      case "123":
        return "Wide (12:3)";
      case "126":
        return "Medium (12:6)";
      case "129":
        return "Standard (12:9)";
    }
  };

  const allReady = !!(previews["123"] && previews["126"] && previews["129"]);

  const handleSave = async () => {
    if (!isEditMode && (!files["123"] || !files["126"] || !files["129"])) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: "Please select files for all three ratios."
      });
      return;
    }

    setIsLoadingSave(true);
    try {
      const aspects: AspectRatio[] = ["123", "126", "129"];
      const changed = aspects.filter((ar) => files[ar] instanceof File);

      const uploadMap: Partial<Record<AspectRatio, number>> = {};
      if (changed.length) {
        const orderedFiles = aspects
          .map((ar) => files[ar])
          .filter((f): f is File => !!f);

        const responses =
          await uploadService.uploadCarouselImages(orderedFiles);
        let idx = 0;
        for (const ar of aspects) {
          if (files[ar]) {
            uploadMap[ar] = responses[idx++].id;
          }
        }
      }

      if (isEditMode) {
        const payload: Partial<CarouselSlideRequest> = {};
        for (const ar of changed) {
          payload[`image${ar}Id`] = uploadMap[ar]!;
        }
        await carouselSlideService.update(slide!.id, payload);
      } else {
        const payload: CarouselSlideRequest = {
          image123Id: uploadMap["123"]!,
          image126Id: uploadMap["126"]!,
          image129Id: uploadMap["129"]!
        };
        await carouselSlideService.create(payload);
      }

      resetParent();

      setFiles({});
      setPreviews({});
      setSelectedTab("123");

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
              ? "Atur ketiga gambar untuk slide ini."
              : "Upload gambar untuk ketiga jenis aspect-ratio."}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="123"
          value={selectedTab}
          onValueChange={(value) => setSelectedTab(value as AspectRatio)}
          className="mt-4"
        >
          <TabsList className="grid grid-cols-3">
            {(["123", "126", "129"] as AspectRatio[]).map((ar) => (
              <TabsTrigger key={ar} value={ar}>
                {ar === "123" ? "12:3" : ar === "126" ? "12:6" : "12:9"}
                {previews[ar] && (
                  <CheckIcon className="inline ml-1 h-4 w-4 text-green-600" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {(["123", "126", "129"] as AspectRatio[]).map((aspect) => (
            <TabsContent key={aspect} value={aspect}>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="relative overflow-hidden">
                      {previews[aspect] ? (
                        <img
                          src={previews[aspect]}
                          alt={`Ratio ${aspect}`}
                          className="object-contain"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full gap-2">
                          <img
                            src={getPlaceholder(aspect)}
                            alt={`Placeholder ${aspect}`}
                            className="object-contain"
                          />
                          <Input
                            id={`upload-${aspect}`}
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={(e) =>
                              handleFileChange(aspect, e.target.files![0])
                            }
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={() =>
                              document
                                .getElementById(`upload-${aspect}`)
                                ?.click()
                            }
                          >
                            <UploadIcon className="h-4 w-4" />
                            Upload Image
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <Label htmlFor={`image-type-${aspect}`}>Image Type</Label>
                      <div className="mt-1 text-sm" id={`image-type-${aspect}`}>
                        {getAspectRatioLabel(aspect)}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor={`dimensions-${aspect}`}>Dimensions</Label>
                      <div className="mt-1 text-sm" id={`dimensions-${aspect}`}>
                        {aspect === "123"
                          ? "1200px × 300px"
                          : aspect === "126"
                            ? "1200px × 600px"
                            : "1200px × 900px"}
                      </div>
                    </div>

                    {previews[aspect] && (
                      <div className="pt-2">
                        <Label
                          htmlFor={`upload-${aspect}`}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center gap-2 text-sm text-primary hover:underline">
                            <UploadIcon className="h-4 w-4" />
                            Change image
                          </div>
                        </Label>
                        <Input
                          id={`upload-${aspect}`}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileChange(aspect, e.target.files![0])
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

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
