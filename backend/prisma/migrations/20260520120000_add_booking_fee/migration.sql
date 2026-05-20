-- AlterTable
ALTER TABLE "PriceTier" ADD COLUMN "bookingFee" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN "bookingFee" INTEGER;
