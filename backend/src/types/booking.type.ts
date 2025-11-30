import { DurationType } from "@prisma/client";

export type CreateBookingRequest = {
  userId: number;
  accountId: number;
  baseDurationUnit: number;
  baseDurationType: DurationType;
  pricePerUnit: number;
  quantity: number;
  startAt?: Date;
  holdMinutes?: number;
};
