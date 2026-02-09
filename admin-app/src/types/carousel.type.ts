import { UploadResponse } from "./upload.type";

type AspectRatio = "123" | "126" | "129";

type CarouselSlide = {
  id: number;
  image123: UploadResponse;
  image126: UploadResponse;
  image129: UploadResponse;
};

type CarouselSlideRequest = {
  image123Id: number;
  image126Id: number;
  image129Id: number;
};

export type { AspectRatio, CarouselSlide, CarouselSlideRequest };
