import { Skin } from "./skin.type";

export type { AccountEntity, AccountEntityRequest, RankResponse };

type PriceList = {
  id: number;
  duration: string;
  normalPrice: number;
  lowPrice: number;
  tierId: number;
};

type PriceTier = {
  id: number;
  code: string;
  priceList: PriceList[];
};

type PriceTierRequest = Omit<PriceTier, "id">;

export type { PriceTier, PriceTierRequest };

type UploadResponse = {
  id: number;
  imageUrl: string;
};

export type { UploadResponse };

type AccountEntity = {
  id: number;
  username: string;
  accountCode: string;
  description?: string;
  accountRank: string;
  availabilityStatus: string;
  nextBooking?: Date | null;
  nextBookingDuration?: number | string | null;
  expireAt?: Date | null;
  currentExpireAt?: Date | null;
  totalRentHour: number;
  password: string;
  skinList: Skin[];
  stale_password: boolean;
  thumbnail: UploadResponse;
  otherImages: UploadResponse[] | null;
  priceTier: PriceTier;
  nickname: string;
};

export type CarouselSlide = {
  id: number;
  image123: UploadResponse;
  image126: UploadResponse;
  image129: UploadResponse;
};

type AccountEntityRequest = Omit<
  AccountEntity,
  | "id"
  | "priceTier"
  | "thumbnail"
  | "otherImages"
  | "totalRentHour"
  | "stale_password"
> & {
  priceTier: number;
  thumbnail: number;
  otherImages: number[];
};

type RankResponse = {
  name: string;
  tag: string;
  currentRank: string;
};

type ApiResponseList<T> = {
  data: T[];
  metadata: MetadataResponse;
};

type ApiResponseError = {
  error: string;
};

type MessageResponse = {
  message: string;
};

type MetadataResponse = {
  page: number;
  limit: number;
  pageCount: number;
  total: number;
};

export type {
  ApiResponseList,
  ApiResponseError,
  MessageResponse,
  MetadataResponse
};
