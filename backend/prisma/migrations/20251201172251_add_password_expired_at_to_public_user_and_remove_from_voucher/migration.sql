/*
  Warnings:

  - You are about to drop the column `password_expire_at` on the `Voucher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PublicUser" ADD COLUMN     "password_expire_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Voucher" DROP COLUMN "password_expire_at";
