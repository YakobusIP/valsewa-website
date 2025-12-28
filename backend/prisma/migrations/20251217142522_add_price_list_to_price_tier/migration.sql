/*
  Warnings:

  - You are about to drop the column `description` on the `PriceTier` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PriceTier" DROP COLUMN "description";

-- CreateTable
CREATE TABLE "PriceList" (
    "id" SERIAL NOT NULL,
    "duration" TEXT NOT NULL,
    "normalPrice" INTEGER NOT NULL,
    "lowPrice" INTEGER NOT NULL,
    "tierId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PriceList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PriceList_tierId_idx" ON "PriceList"("tierId");

-- AddForeignKey
ALTER TABLE "PriceList" ADD CONSTRAINT "PriceList_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "PriceTier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
