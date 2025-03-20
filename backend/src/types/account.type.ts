import { Prisma, Status } from "@prisma/client";

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

type PublicAccount = Prisma.AccountGetPayload<{
  select: {
    nickname: true;
    accountCode: true;
    description: true;
    accountRank: true;
    availabilityStatus: true;
    totalRentHour: true;
    skinList: true;
    priceTier: true;
    thumbnail: true;
    otherImages: true;
  };
}>;

export type { AccountEntityRequest, PublicAccount };
