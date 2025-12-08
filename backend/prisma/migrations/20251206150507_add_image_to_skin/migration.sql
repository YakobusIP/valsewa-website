/*
  Warnings:

  - Added the required column `image` to the `Skin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skin" ADD COLUMN     "image" TEXT NOT NULL;
