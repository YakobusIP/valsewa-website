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

export type { PriceList, PriceTier, PriceTierRequest };

type UploadResponse = {
  id: number;
  imageUrl: string;
  type: "IMAGE" | "VIDEO";
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
  skinCount: number;
  stale_password: boolean;
  thumbnail: UploadResponse;
  otherImages: UploadResponse[] | null;
  priceTier: PriceTier;
  nickname: string;
  isLowRank: boolean;
  isRecommended: boolean;
};

export type CarouselSlide = {
  id: number;
  image: UploadResponse;
  duration: number;
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

type TierFilter = { id: string; isLowTier: string } | null;

type AccountsPublicParams = {
  page?: number;
  limit?: number;
  q?: string;

  low_tier_only?: boolean;
  tiers?: string[];
  skin_counts?: string[];
  ranks?: string[];

  min_price?: number;
  max_price?: number;

  sortBy?: string;
  direction?: "asc" | "desc";
};

export type {
  ApiResponseList,
  ApiResponseError,
  MessageResponse,
  MetadataResponse,
  TierFilter,
  AccountsPublicParams
};
