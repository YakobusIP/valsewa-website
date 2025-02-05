-- CreateEnum
CREATE TYPE "Status" AS ENUM ('AVAILABLE', 'IN_USE', 'NOT_AVAILABLE');

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "accountCode" TEXT NOT NULL,
    "description" TEXT,
    "accountRank" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'AVAILABLE',
    "nextBooking" TIMESTAMP(3),
    "nextBookingDuration" INTEGER,
    "expireAt" TIMESTAMP(3),
    "totalRentHour" INTEGER NOT NULL DEFAULT 0,
    "password" TEXT NOT NULL,
    "passwordUpdatedAt" TIMESTAMP(3) NOT NULL,
    "skinList" TEXT[],
    "thumbnailUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "priceTierId" INTEGER NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceTier" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "PriceTier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountImage" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "AccountImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_accountCode_key" ON "Account"("accountCode");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_priceTierId_fkey" FOREIGN KEY ("priceTierId") REFERENCES "PriceTier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountImage" ADD CONSTRAINT "AccountImage_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
