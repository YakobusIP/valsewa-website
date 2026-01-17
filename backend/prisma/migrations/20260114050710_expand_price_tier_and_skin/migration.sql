-- AlterTable
ALTER TABLE "PriceTier" ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "PriceList" (
    "id" SERIAL NOT NULL,
    "duration" TEXT NOT NULL,
    "normalPrice" INTEGER NOT NULL,
    "lowPrice" INTEGER NOT NULL,
    "tierId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PriceList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "keyword" TEXT,

    CONSTRAINT "Skin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccountToSkin" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AccountToSkin_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "PriceList_tierId_idx" ON "PriceList"("tierId");

-- CreateIndex
CREATE UNIQUE INDEX "Skin_name_key" ON "Skin"("name");

-- CreateIndex
CREATE INDEX "_AccountToSkin_B_index" ON "_AccountToSkin"("B");

-- AddForeignKey
ALTER TABLE "PriceList" ADD CONSTRAINT "PriceList_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "PriceTier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToSkin" ADD CONSTRAINT "_AccountToSkin_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToSkin" ADD CONSTRAINT "_AccountToSkin_B_fkey" FOREIGN KEY ("B") REFERENCES "Skin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
