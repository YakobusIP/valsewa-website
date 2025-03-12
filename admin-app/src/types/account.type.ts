import { PriceTier } from "@/types/pricetier.type";
import { UploadResponse } from "@/types/upload.type";

type AccountEntity = {
  id: number;
  username: string;
  accountCode: string;
  description?: string | null;
  accountRank: string;
  availabilityStatus: string;
  nextBooking?: Date | null;
  nextBookingDuration?: number | string | null;
  bookingScheduledAt?: Date | null;
  expireAt?: Date | null;
  totalRentHour: number;
  password: string;
  passwordUpdatedAt: Date;
  skinList: string[];
  stale_password: boolean;
  thumbnail: UploadResponse;
  otherImages: UploadResponse[] | null;
  priceTier: PriceTier;
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

export type { AccountEntity, AccountEntityRequest, RankResponse };
