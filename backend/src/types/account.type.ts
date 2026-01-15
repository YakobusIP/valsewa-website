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
  thumbnail: number;
  otherImages: number[] | null;
  priceTier: number;
  skinCount: number;
  skinList: number[];
  isLowRank: boolean;
  isRecommended: boolean;
};

type AccountWithSkins = Prisma.AccountGetPayload<{
  include: { skinList: true };
}>;

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
    skinCount: true;
    priceTier: true;
    thumbnail: true;
    otherImages: true;
    isLowRank: true;
    isRecommended: true;
  };
}>;

type UpdateResetLogRequest = {
  accountId: number;
  password: string;
  passwordResetRequired: boolean;
};

type GetAvailableAccountsRequest = {
  startAt: Date;
  endAt: Date;
};

type AccountSearchFilters = {
  ranks?: string[];
  minPrice?: number;
  maxPrice?: number;
  totalSkin?: string;
  lowTierOnly?: boolean;
  priceTierCode?: string;
  query?: string;
  
  sortBy?: string;
  direction?: Prisma.SortOrder;
}

export type {
  AccountEntityRequest,
  AccountWithSkins,
  PublicAccount,
  UpdateResetLogRequest,
  GetAvailableAccountsRequest,
  AccountSearchFilters
};
