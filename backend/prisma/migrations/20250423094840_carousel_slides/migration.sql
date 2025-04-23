-- CreateTable
CREATE TABLE "CarouselSlide" (
    "id" SERIAL NOT NULL,
    "image123Id" INTEGER NOT NULL,
    "image126Id" INTEGER NOT NULL,
    "image129Id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarouselSlide_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CarouselSlide_image123Id_key" ON "CarouselSlide"("image123Id");

-- CreateIndex
CREATE UNIQUE INDEX "CarouselSlide_image126Id_key" ON "CarouselSlide"("image126Id");

-- CreateIndex
CREATE UNIQUE INDEX "CarouselSlide_image129Id_key" ON "CarouselSlide"("image129Id");

-- AddForeignKey
ALTER TABLE "CarouselSlide" ADD CONSTRAINT "CarouselSlide_image123Id_fkey" FOREIGN KEY ("image123Id") REFERENCES "ImageUpload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarouselSlide" ADD CONSTRAINT "CarouselSlide_image126Id_fkey" FOREIGN KEY ("image126Id") REFERENCES "ImageUpload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarouselSlide" ADD CONSTRAINT "CarouselSlide_image129Id_fkey" FOREIGN KEY ("image129Id") REFERENCES "ImageUpload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
