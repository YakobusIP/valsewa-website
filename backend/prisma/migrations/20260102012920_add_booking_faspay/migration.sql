/*
  Warnings:

  - You are about to drop the column `cancelledAt` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerUnit` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `successfulPaymentId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `channelCode` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `channelType` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `failureReason` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `gateway` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `immediate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainValue` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainValuePerUnit` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('FASPAY');

-- CreateEnum
CREATE TYPE "PaymentMethodType" AS ENUM ('QRIS');

-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'COMPLETED';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PaymentStatus" ADD VALUE 'EXPIRED';
ALTER TYPE "PaymentStatus" ADD VALUE 'CANCELLED';

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_successfulPaymentId_fkey";

-- DropIndex
DROP INDEX "Booking_successfulPaymentId_key";

-- DropIndex
DROP INDEX "Booking_userId_accountId_startAt_endAt_status_idx";

-- DropIndex
DROP INDEX "Booking_userId_status_idx";

-- DropIndex
DROP INDEX "Payment_providerId_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "cancelledAt",
DROP COLUMN "expiresAt",
DROP COLUMN "pricePerUnit",
DROP COLUMN "successfulPaymentId",
ADD COLUMN     "discount" INTEGER,
ADD COLUMN     "expiredAt" TIMESTAMP(3),
ADD COLUMN     "immediate" BOOLEAN NOT NULL,
ADD COLUMN     "mainValue" INTEGER NOT NULL,
ADD COLUMN     "mainValuePerUnit" INTEGER NOT NULL,
ADD COLUMN     "othersValue" INTEGER,
ADD COLUMN     "othersValuePerUnit" INTEGER,
ADD COLUMN     "voucherAmount" DOUBLE PRECISION,
ADD COLUMN     "voucherId" INTEGER,
ADD COLUMN     "voucherMaxDiscount" DOUBLE PRECISION,
ADD COLUMN     "voucherType" "Type",
ALTER COLUMN "startAt" DROP NOT NULL,
ALTER COLUMN "endAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "channelCode",
DROP COLUMN "channelType",
DROP COLUMN "failureReason",
DROP COLUMN "gateway",
DROP COLUMN "metadata",
DROP COLUMN "providerId",
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "paymentMethod" "PaymentMethodType",
ADD COLUMN     "provider" "Provider" NOT NULL,
ADD COLUMN     "providerPaymentId" TEXT,
ADD COLUMN     "qrUrl" TEXT;

-- DropEnum
DROP TYPE "PaymentChannelType";

-- CreateIndex
CREATE INDEX "Booking_accountId_startAt_endAt_idx" ON "Booking"("accountId", "startAt", "endAt");

-- CreateIndex
CREATE INDEX "Booking_userId_createdAt_idx" ON "Booking"("userId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Booking_status_expiredAt_idx" ON "Booking"("status", "expiredAt");

-- CreateIndex
CREATE INDEX "Payment_providerPaymentId_idx" ON "Payment"("providerPaymentId");
