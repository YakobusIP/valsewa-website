-- Compressed production migration from 20250423094840_carousel_slides.
-- Data-preserving except CarouselSlide, which is intentionally reset for the new one-media slide model.

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO');
CREATE TYPE "BookingStatus" AS ENUM ('HOLD', 'RESERVED', 'EXPIRED', 'FAILED', 'CANCELLED', 'COMPLETED');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'EXPIRED', 'FAILED', 'CANCELLED', 'REFUNDED');
CREATE TYPE "Provider" AS ENUM ('FASPAY', 'MANUAL');
CREATE TYPE "PaymentMethodType" AS ENUM ('QRIS', 'VIRTUAL_ACCOUNT', 'MANUAL');
CREATE TYPE "Type" AS ENUM ('PERSENTASE', 'NOMINAL');

-- Expand existing tables without dropping legacy data.
UPDATE "Account" SET "skinList" = ARRAY[]::TEXT[] WHERE "skinList" IS NULL;

ALTER TABLE "Account"
ADD COLUMN "skinCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "isCompetitive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "isRecommended" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "requirePasswordReset" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "isMfa" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "skinList" SET DEFAULT ARRAY[]::TEXT[];

ALTER TABLE "PriceTier" ALTER COLUMN "description" DROP NOT NULL;

ALTER TABLE "ImageUpload" ADD COLUMN "type" "MediaType" NOT NULL DEFAULT 'IMAGE';

-- Fresh-start carousel: old 123/126/129 slide rows are intentionally discarded.
DROP TABLE "CarouselSlide";

CREATE TABLE "CarouselSlide" (
    "id" SERIAL NOT NULL,
    "imageId" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 5,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarouselSlide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "passwordChangedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "passwordExpireAt" TIMESTAMP(3),
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "lastEligibleRent" TIMESTAMP(3),

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Voucher" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "voucherName" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "type" "Type" NOT NULL,
    "percentage" DOUBLE PRECISION,
    "nominal" DOUBLE PRECISION,
    "maxDiscount" DOUBLE PRECISION,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "GlobalSettings" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "GlobalSettings_pkey" PRIMARY KEY ("key")
);

CREATE TABLE "PriceList" (
    "id" SERIAL NOT NULL,
    "duration" TEXT NOT NULL,
    "unratedPrice" INTEGER NOT NULL,
    "compPrice" INTEGER NOT NULL,
    "tierId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PriceList_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Skin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "keyword" TEXT,

    CONSTRAINT "Skin_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "_AccountToSkin" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AccountToSkin_AB_pkey" PRIMARY KEY ("A","B")
);

CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "readableNumber" BIGSERIAL NOT NULL,
    "customerId" INTEGER,
    "accountId" INTEGER NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'HOLD',
    "duration" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "immediate" BOOLEAN NOT NULL,
    "startAt" TIMESTAMP(3),
    "endAt" TIMESTAMP(3),
    "expiredAt" TIMESTAMP(3),
    "mainValuePerUnit" INTEGER NOT NULL,
    "othersValuePerUnit" INTEGER,
    "voucherName" TEXT,
    "voucherType" "Type",
    "voucherAmount" DOUBLE PRECISION,
    "voucherMaxDiscount" DOUBLE PRECISION,
    "mainValue" INTEGER NOT NULL,
    "othersValue" INTEGER,
    "discount" INTEGER,
    "adminFee" INTEGER,
    "totalValue" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "value" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'IDR',
    "provider" "Provider" NOT NULL,
    "providerPaymentId" TEXT,
    "paymentMethod" "PaymentMethodType",
    "qrUrl" TEXT,
    "bankCode" TEXT,
    "bankAccountNo" TEXT,
    "bankAccountName" TEXT,
    "paidAt" TIMESTAMP(3),
    "refundedValue" INTEGER NOT NULL DEFAULT 0,
    "refundedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "DailyDropConfig" (
    "id" SERIAL NOT NULL,
    "discountMin" DOUBLE PRECISION NOT NULL,
    "discountMax" DOUBLE PRECISION NOT NULL,
    "slot1Discount" DOUBLE PRECISION,
    "slot2Discount" DOUBLE PRECISION,
    "slot3Discount" DOUBLE PRECISION,
    "slot1PriceTierIds" INTEGER[],
    "slot2PriceTierIds" INTEGER[],
    "slot3PriceTierIds" INTEGER[],
    "slot1PriceListIds" INTEGER[],
    "slot2PriceListIds" INTEGER[],
    "slot3PriceListIds" INTEGER[],
    "allowedAccountIds" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyDropConfig_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "DailyDrop" (
    "id" SERIAL NOT NULL,
    "slot" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "accountId" INTEGER NOT NULL,
    "priceListId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyDrop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CarouselSlide_imageId_key" ON "CarouselSlide"("imageId");
CREATE UNIQUE INDEX "Customer_username_key" ON "Customer"("username");
CREATE UNIQUE INDEX "Voucher_voucherName_key" ON "Voucher"("voucherName");
CREATE INDEX "PriceList_tierId_idx" ON "PriceList"("tierId");
CREATE UNIQUE INDEX "Skin_name_key" ON "Skin"("name");
CREATE INDEX "_AccountToSkin_B_index" ON "_AccountToSkin"("B");
CREATE INDEX "Account_skinCount_idx" ON "Account"("skinCount");
CREATE INDEX "AccountResetLog_resetAt_idx" ON "AccountResetLog"("resetAt");
CREATE UNIQUE INDEX "Booking_readableNumber_key" ON "Booking"("readableNumber");
CREATE INDEX "Booking_accountId_status_startAt_idx" ON "Booking"("accountId", "status", "startAt");
CREATE INDEX "Booking_accountId_status_endAt_idx" ON "Booking"("accountId", "status", "endAt");
CREATE INDEX "Booking_customerId_createdAt_idx" ON "Booking"("customerId", "createdAt" DESC);
CREATE INDEX "Booking_status_expiredAt_idx" ON "Booking"("status", "expiredAt");
CREATE INDEX "Booking_status_endAt_idx" ON "Booking"("status", "endAt");
CREATE INDEX "Booking_status_startAt_idx" ON "Booking"("status", "startAt");
CREATE INDEX "Payment_bookingId_status_idx" ON "Payment"("bookingId", "status");
CREATE INDEX "Payment_providerPaymentId_idx" ON "Payment"("providerPaymentId");
CREATE INDEX "DailyDrop_date_idx" ON "DailyDrop"("date");

-- AddForeignKey
ALTER TABLE "CarouselSlide" ADD CONSTRAINT "CarouselSlide_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "ImageUpload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PriceList" ADD CONSTRAINT "PriceList_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "PriceTier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "_AccountToSkin" ADD CONSTRAINT "_AccountToSkin_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "_AccountToSkin" ADD CONSTRAINT "_AccountToSkin_B_fkey" FOREIGN KEY ("B") REFERENCES "Skin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "DailyDrop" ADD CONSTRAINT "DailyDrop_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "DailyDrop" ADD CONSTRAINT "DailyDrop_priceListId_fkey" FOREIGN KEY ("priceListId") REFERENCES "PriceList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
