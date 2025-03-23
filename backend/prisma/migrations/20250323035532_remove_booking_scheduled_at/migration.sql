/*
  Warnings:

  - You are about to drop the column `currentBookingScheduledAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `nextBookingScheduledAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `checked` on the `AccountResetLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "currentBookingScheduledAt",
DROP COLUMN "nextBookingScheduledAt";

-- AlterTable
ALTER TABLE "AccountResetLog" DROP COLUMN "checked";
