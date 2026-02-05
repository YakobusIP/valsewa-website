-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO');

-- AlterTable
ALTER TABLE "CarouselSlide" ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 5;

-- AlterTable
ALTER TABLE "ImageUpload" ADD COLUMN     "type" "MediaType" NOT NULL DEFAULT 'IMAGE';
