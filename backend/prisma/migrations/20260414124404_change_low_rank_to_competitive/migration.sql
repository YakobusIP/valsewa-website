/*
  Warnings:

  - You are about to drop the column `isLowRank` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `lowPrice` on the `PriceList` table. All the data in the column will be lost.
  - You are about to drop the column `normalPrice` on the `PriceList` table. All the data in the column will be lost.
  - Added the required column `compPrice` to the `PriceList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unratedPrice` to the `PriceList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "isLowRank",
ADD COLUMN     "isCompetitive" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "PriceList" DROP COLUMN "lowPrice",
DROP COLUMN "normalPrice",
ADD COLUMN     "compPrice" INTEGER NOT NULL,
ADD COLUMN     "unratedPrice" INTEGER NOT NULL;
