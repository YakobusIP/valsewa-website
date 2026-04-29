-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "currentStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastEligibleRent" TIMESTAMP(3);
