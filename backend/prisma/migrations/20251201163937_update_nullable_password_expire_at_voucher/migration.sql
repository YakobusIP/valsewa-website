/*
  Warnings:

  - Made the column `password_expire_at` on table `Voucher` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Voucher" ALTER COLUMN "password_expire_at" SET NOT NULL;
