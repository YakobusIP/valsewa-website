/*
  Warnings:

  - You are about to drop the column `is_active` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `password_expire_at` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `date_end` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `date_start` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `is_valid` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `max_discount` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `voucher_name` on the `Voucher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[voucherName]` on the table `Voucher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dateEnd` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateStart` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voucherName` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Voucher_voucher_name_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "is_active",
DROP COLUMN "password_expire_at",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "passwordExpireAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Voucher" DROP COLUMN "created_at",
DROP COLUMN "date_end",
DROP COLUMN "date_start",
DROP COLUMN "is_valid",
DROP COLUMN "max_discount",
DROP COLUMN "updated_at",
DROP COLUMN "voucher_name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dateStart" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isValid" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "maxDiscount" DOUBLE PRECISION,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "voucherName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_voucherName_key" ON "Voucher"("voucherName");
