-- CreateEnum
CREATE TYPE "Type" AS ENUM ('PERSENTASE', 'NOMINAL');

-- CreateTable
CREATE TABLE "Voucher" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "voucher_name" TEXT NOT NULL,
    "is_valid" BOOLEAN NOT NULL DEFAULT true,
    "type" "Type" NOT NULL,
    "percentage" DOUBLE PRECISION,
    "nominal" DOUBLE PRECISION,
    "max_discount" DOUBLE PRECISION,
    "date_start" TIMESTAMP(3) NOT NULL,
    "date_end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_voucher_name_key" ON "Voucher"("voucher_name");
