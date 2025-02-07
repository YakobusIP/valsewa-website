/*
  Warnings:

  - You are about to drop the column `status` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailUrl` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the `AccountImage` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[thumbnailId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `PriceTier` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "AccountImage" DROP CONSTRAINT "AccountImage_accountId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "status",
DROP COLUMN "thumbnailUrl",
ADD COLUMN     "availabilityStatus" "Status" NOT NULL DEFAULT 'AVAILABLE',
ADD COLUMN     "thumbnailId" INTEGER;

-- DropTable
DROP TABLE "AccountImage";

-- CreateTable
CREATE TABLE "ImageUpload" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountId" INTEGER,

    CONSTRAINT "ImageUpload_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_thumbnailId_key" ON "Account"("thumbnailId");

-- CreateIndex
CREATE UNIQUE INDEX "PriceTier_code_key" ON "PriceTier"("code");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "ImageUpload"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageUpload" ADD CONSTRAINT "ImageUpload_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
