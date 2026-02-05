-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "skinCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Account_skinCount_idx" ON "Account"("skinCount");
