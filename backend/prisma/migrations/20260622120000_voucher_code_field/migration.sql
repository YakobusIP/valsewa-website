-- Add voucherCode and migrate existing voucherName values
ALTER TABLE "Voucher" ADD COLUMN "voucherCode" TEXT;

UPDATE "Voucher" SET "voucherCode" = "voucherName";

ALTER TABLE "Voucher" ALTER COLUMN "voucherCode" SET NOT NULL;

-- voucherName is no longer unique; voucherCode is the unique promo code
DROP INDEX IF EXISTS "Voucher_voucherName_key";

CREATE UNIQUE INDEX "Voucher_voucherCode_key" ON "Voucher"("voucherCode");
