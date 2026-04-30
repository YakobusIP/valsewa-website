-- Backfill discount from dailyDropDiscount where voucher absent
UPDATE "Booking"
SET "discount" = "dailyDropDiscount"
WHERE "voucherName" IS NULL AND "dailyDropDiscount" IS NOT NULL;

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "dailyDropDiscount";
