import { UploadResponse } from "./upload.type";

type CarouselSlide = {
  id: number;
  image: UploadResponse;
  duration: number;
};

type CarouselSlideRequest = {
  imageId: number;
  duration: number;
};

export type { CarouselSlide, CarouselSlideRequest };
