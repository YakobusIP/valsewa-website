/*
  Warnings:

  - A unique constraint covering the columns `[readableNumber]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "readableNumber" BIGSERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_readableNumber_key" ON "Booking"("readableNumber");
