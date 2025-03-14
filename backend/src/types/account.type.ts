import { Status } from "@prisma/client";

type AccountEntityRequest = {
  nickname: string;
  username: string;
  accountCode: string;
  description?: string;
  accountRank: string;
  availabilityStatus: Status;
  nextBooking?: Date;
  nextBookingDuration?: number;
  forceUpdateExpiry?: boolean;
  forceUpdateTotalRentHour?: boolean;
  expireAt?: Date;
  totalRentHour: number;
  password: string;
  passwordUpdatedAt: Date;
  skins: string[];
  thumbnail: number;
  otherImages: number[] | null;
  priceTier: number;
};

export type { AccountEntityRequest };
