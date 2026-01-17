/*
  Warnings:

  - You are about to drop the column `image123Id` on the `CarouselSlide` table. All the data in the column will be lost.
  - You are about to drop the column `image126Id` on the `CarouselSlide` table. All the data in the column will be lost.
  - You are about to drop the column `image129Id` on the `CarouselSlide` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `CarouselSlide` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `CarouselSlide` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CarouselSlide" DROP CONSTRAINT "CarouselSlide_image123Id_fkey";

-- DropForeignKey
ALTER TABLE "CarouselSlide" DROP CONSTRAINT "CarouselSlide_image126Id_fkey";

-- DropForeignKey
ALTER TABLE "CarouselSlide" DROP CONSTRAINT "CarouselSlide_image129Id_fkey";

-- DropIndex
DROP INDEX "CarouselSlide_image123Id_key";

-- DropIndex
DROP INDEX "CarouselSlide_image126Id_key";

-- DropIndex
DROP INDEX "CarouselSlide_image129Id_key";

-- AlterTable
ALTER TABLE "CarouselSlide" DROP COLUMN "image123Id",
DROP COLUMN "image126Id",
DROP COLUMN "image129Id",
ADD COLUMN     "imageId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CarouselSlide_imageId_key" ON "CarouselSlide"("imageId");

-- AddForeignKey
ALTER TABLE "CarouselSlide" ADD CONSTRAINT "CarouselSlide_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "ImageUpload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
