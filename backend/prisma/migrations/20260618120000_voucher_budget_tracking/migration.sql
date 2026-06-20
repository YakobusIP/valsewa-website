-- AlterTable: Voucher budget and soft-delete fields
ALTER TABLE "Voucher" ADD COLUMN "minOrderValue" DOUBLE PRECISION,
ADD COLUMN "maxGlobalUsage" INTEGER,
ADD COLUMN "maxUsagePerUser" INTEGER,
ADD COLUMN "usageCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "deletedAt" TIMESTAMP(3);

-- AlterTable: Booking voucher FK and quota tracking
ALTER TABLE "Booking" ADD COLUMN "voucherId" INTEGER,
ADD COLUMN "voucherMinOrderValue" DOUBLE PRECISION,
ADD COLUMN "quotaReserved" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable: VoucherUserUsage
CREATE TABLE "VoucherUserUsage" (
    "id" SERIAL NOT NULL,
    "voucherId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VoucherUserUsage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Voucher_deletedAt_idx" ON "Voucher"("deletedAt");

-- CreateIndex
CREATE INDEX "Booking_voucherId_status_idx" ON "Booking"("voucherId", "status");

-- CreateIndex
CREATE INDEX "Booking_voucherId_customerId_status_idx" ON "Booking"("voucherId", "customerId", "status");

-- CreateIndex
CREATE INDEX "VoucherUserUsage_voucherId_idx" ON "VoucherUserUsage"("voucherId");

-- CreateIndex
CREATE INDEX "VoucherUserUsage_customerId_idx" ON "VoucherUserUsage"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "VoucherUserUsage_voucherId_customerId_key" ON "VoucherUserUsage"("voucherId", "customerId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherUserUsage" ADD CONSTRAINT "VoucherUserUsage_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherUserUsage" ADD CONSTRAINT "VoucherUserUsage_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Idempotent backfill: Booking.voucherId and voucherMinOrderValue from voucherName match
UPDATE "Booking" b
SET
  "voucherId" = v."id",
  "voucherMinOrderValue" = v."minOrderValue"
FROM "Voucher" v
WHERE b."voucherName" IS NOT NULL
  AND b."voucherName" = v."voucherName"
  AND b."voucherId" IS NULL;

-- Idempotent backfill: Booking.quotaReserved for matched voucher usages
UPDATE "Booking"
SET "quotaReserved" = true
WHERE "voucherId" IS NOT NULL
  AND "status" IN ('HOLD', 'RESERVED', 'COMPLETED');

-- Idempotent backfill: Voucher.usageCount from bookings by voucherId
UPDATE "Voucher" v
SET "usageCount" = COALESCE((
    SELECT COUNT(*)::INTEGER
    FROM "Booking" b
    WHERE b."voucherId" = v."id"
      AND b."status" IN ('HOLD', 'RESERVED', 'COMPLETED')
), 0);

-- Idempotent backfill: VoucherUserUsage per voucherId and customer
INSERT INTO "VoucherUserUsage" ("voucherId", "customerId", "usageCount", "updatedAt")
SELECT
    b."voucherId",
    b."customerId",
    COUNT(*)::INTEGER,
    CURRENT_TIMESTAMP
FROM "Booking" b
WHERE b."voucherId" IS NOT NULL
  AND b."customerId" IS NOT NULL
  AND b."status" IN ('HOLD', 'RESERVED', 'COMPLETED')
GROUP BY b."voucherId", b."customerId"
ON CONFLICT ("voucherId", "customerId")
DO UPDATE SET
    "usageCount" = EXCLUDED."usageCount",
    "updatedAt" = CURRENT_TIMESTAMP;
