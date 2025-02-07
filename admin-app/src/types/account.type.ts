import { PriceTier } from "@/types/pricetier.type";
import { UploadResponse } from "@/types/upload.type";

type AccountEntity = {
  id: number;
  username: string;
  accountCode: string;
  description?: string;
  accountRank: string;
  availabilityStatus: string;
  nextBooking?: Date;
  nextBookingDuration?: number;
  expireAt?: Date;
  totalRentHour: number;
  password: string;
  passwordUpdatedAt: Date;
  skinList: string[];
  thumbnail: UploadResponse;
  otherImages: UploadResponse[] | null;
  priceTier: PriceTier;
};

type AccountEntityRequest = Omit<
  AccountEntity,
  "id" | "priceTier" | "thumbnail" | "otherImages" | "totalRentHour"
> & {
  priceTier: number;
  thumbnail: number;
  otherImages: number[];
};

export type { AccountEntity, AccountEntityRequest };
