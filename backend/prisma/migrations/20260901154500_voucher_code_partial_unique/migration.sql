-- Allow reuse of voucher codes after soft-delete (same pattern as Account_accountCode_active_key)
DROP INDEX IF EXISTS "Voucher_voucherCode_key";

CREATE UNIQUE INDEX "Voucher_voucherCode_active_key"
ON "Voucher"("voucherCode")
WHERE "deletedAt" IS NULL;
