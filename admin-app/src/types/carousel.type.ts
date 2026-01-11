import { UploadResponse } from "./upload.type";

type AspectRatio = "123" | "126" | "129";

type CarouselSlide = {
  id: number;
  image123: UploadResponse;
  image126: UploadResponse;
  image129: UploadResponse;
  duration: number;
};

type CarouselSlideRequest = {
  image123Id: number;
  image126Id: number;
  image129Id: number;
  duration: number;
};

export type { AspectRatio, CarouselSlide, CarouselSlideRequest };
