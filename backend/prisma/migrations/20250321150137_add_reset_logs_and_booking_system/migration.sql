/*
  Warnings:

  - You are about to drop the column `bookingScheduledAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `expireAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `nextBooking` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `passwordUpdatedAt` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "bookingScheduledAt",
DROP COLUMN "expireAt",
DROP COLUMN "nextBooking",
DROP COLUMN "passwordUpdatedAt",
ADD COLUMN     "currentBookingDate" TIMESTAMP(3),
ADD COLUMN     "currentBookingDuration" INTEGER,
ADD COLUMN     "currentBookingScheduledAt" TIMESTAMP(3),
ADD COLUMN     "currentExpireAt" TIMESTAMP(3),
ADD COLUMN     "nextBookingDate" TIMESTAMP(3),
ADD COLUMN     "nextBookingScheduledAt" TIMESTAMP(3),
ADD COLUMN     "nextExpireAt" TIMESTAMP(3),
ADD COLUMN     "passwordResetRequired" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "AccountResetLog" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "previousExpireAt" TIMESTAMP(3),
    "resetAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AccountResetLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccountResetLog" ADD CONSTRAINT "AccountResetLog_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
