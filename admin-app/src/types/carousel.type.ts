import { UploadResponse } from "./upload.type";

type CarouselSlide = {
  id: number;
  image: UploadResponse;
  duration: number;
  url: string | null;
};

type CarouselSlideRequest = {
  imageId: number;
  duration: number;
  url?: string | null;
};

export type { CarouselSlide, CarouselSlideRequest };
