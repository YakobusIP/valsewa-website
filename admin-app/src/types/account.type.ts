import { PriceTier } from "@/types/pricetier.type";
import { UploadResponse } from "@/types/upload.type";

type AccountEntity = {
  id: number;
  username: string;
  nickname: string;
  accountCode: string;
  description?: string | null;
  accountRank: string;
  availabilityStatus: string;
  currentBookingDate?: Date | null;
  currentBookingDuration?: number | string | null;
  currentExpireAt?: String | null;
  nextBookingDate?: Date | null;
  nextBookingDuration?: number | string | null;
  nextExpireAt?: Date | null;
  totalRentHour: number;
  password: string;
  passwordResetRequired: boolean;
  skinList: string[];
  thumbnail: UploadResponse;
  otherImages: UploadResponse[] | null;
  priceTier: PriceTier;
};

type AccountEntityRequest = Omit<
  AccountEntity,
  "id" | "priceTier" | "thumbnail" | "otherImages"
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

type FailedJobs = {
  id: string;
  data: { id: number; nickname: string };
  failedReason: string;
  timestamp: Date;
  accountCode: string;
  username: string;
};

type ResetLogs = {
  id: number;
  accountId: number;
  resetAt: Date;
  previousExpireAt: Date;
  account: { accountCode: string; nickname: string; username: string };
};

type UpdateResetLogRequest = {
  accountId: number;
  password: string;
  passwordResetRequired: boolean;
};

export type {
  AccountEntity,
  AccountEntityRequest,
  RankResponse,
  FailedJobs,
  ResetLogs,
  UpdateResetLogRequest
};
