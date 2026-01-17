/*
  Warnings:

  - You are about to drop the column `skinList` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `PriceTier` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "skinList";

-- AlterTable
ALTER TABLE "PriceTier" DROP COLUMN "description";
