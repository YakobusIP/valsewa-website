type AccountEntityRequest = {
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
  skins: string[];
  thumbnail: number;
  otherImages: number[] | null;
  priceTier: number;
};

export type { AccountEntityRequest };
