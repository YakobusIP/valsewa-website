export type { AccountEntity, AccountEntityRequest, RankResponse };

type PriceTier = {
  id: number;
  code: string;
  description: string;
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
  skinList: string[];
  stale_password: boolean;
  thumbnail: UploadResponse;
  otherImages: UploadResponse[] | null;
  priceTier: PriceTier;
  nickname: string;
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
