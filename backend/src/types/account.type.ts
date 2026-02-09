import { Prisma, Status } from "@prisma/client";

type AccountEntityRequest = {
  nickname: string;
  username: string;
  accountCode: string;
  description?: string;
  accountRank: string;
  availabilityStatus: Status;
  currentBookingDate?: Date;
  currentBookingDuration?: number;
  currentExpireAt?: Date;
  nextBookingDate?: Date;
  nextBookingDuration?: number;
  nextExpireAt?: Date;
  totalRentHour: number;
  password: string;
  passwordResetRequired: boolean;
  skins: string[];
  thumbnail: number;
  otherImages: number[] | null;
  priceTier: number;
};

type PublicAccount = Prisma.AccountGetPayload<{
  select: {
    nickname: true;
    accountCode: true;
    description: true;
    accountRank: true;
    availabilityStatus: true;
    currentExpireAt: true;
    totalRentHour: true;
    skinList: true;
    priceTier: true;
    thumbnail: true;
    otherImages: true;
  };
}>;

type UpdateResetLogRequest = {
  accountId: number;
  password: string;
  passwordResetRequired: boolean;
};

export type { AccountEntityRequest, PublicAccount, UpdateResetLogRequest };
