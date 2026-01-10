/*
  Warnings:

  - You are about to drop the column `baseDurationType` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `baseDurationUnit` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PaymentMethodType" ADD VALUE 'VIRTUAL_ACCOUNT';
ALTER TYPE "PaymentMethodType" ADD VALUE 'MANUAL';

-- AlterEnum
ALTER TYPE "Provider" ADD VALUE 'MANUAL';

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "baseDurationType",
DROP COLUMN "baseDurationUnit",
ADD COLUMN     "duration" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "bankAccountName" TEXT,
ADD COLUMN     "bankAccountNo" TEXT,
ADD COLUMN     "bankCode" TEXT;

-- DropEnum
DROP TYPE "DurationType";
