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
  isCompetitive: boolean;
  isRecommended: boolean;
  isMfa?: boolean;
  requirePasswordReset?: boolean;
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
    isCompetitive: true;
    isRecommended: true;
    isMfa: true;
  };
}>;

type UpdateResetLogRequest = {
  accountId: number;
  password: string;
  passwordResetRequired: boolean;
};

type DeleteResetLogRequest = {
  accountId: number;
};

type GetAvailableAccountsRequest = {
  startAt: Date;
  endAt: Date;
};

type AccountSearchFilters = {
  query?: string;
  compeOnly?: boolean;
  tiers?: string[];
  skinCounts?: string[];
  ranks?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  direction?: Prisma.SortOrder;
};

type UpdateAccountMFARequest = {
  isMfa: boolean;
}

export type {
  AccountEntityRequest,
  AccountWithSkins,
  PublicAccount,
  UpdateResetLogRequest,
  DeleteResetLogRequest,
  GetAvailableAccountsRequest,
  AccountSearchFilters,
  UpdateAccountMFARequest
};
