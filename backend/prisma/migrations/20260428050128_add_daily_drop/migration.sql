-- CreateTable
CREATE TABLE "DailyDropConfig" (
    "id" SERIAL NOT NULL,
    "discountMin" DOUBLE PRECISION NOT NULL,
    "discountMax" DOUBLE PRECISION NOT NULL,
    "slot1PriceTierIds" INTEGER[],
    "slot2PriceTierIds" INTEGER[],
    "slot3PriceTierIds" INTEGER[],
    "slot1PriceListIds" INTEGER[],
    "slot2PriceListIds" INTEGER[],
    "slot3PriceListIds" INTEGER[],
    "allowedAccountIds" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyDropConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyDrop" (
    "id" SERIAL NOT NULL,
    "slot" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "accountId" INTEGER NOT NULL,
    "priceListId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyDrop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DailyDrop_date_idx" ON "DailyDrop"("date");

-- AddForeignKey
ALTER TABLE "DailyDrop" ADD CONSTRAINT "DailyDrop_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyDrop" ADD CONSTRAINT "DailyDrop_priceListId_fkey" FOREIGN KEY ("priceListId") REFERENCES "PriceList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
