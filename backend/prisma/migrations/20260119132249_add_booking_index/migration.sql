-- DropIndex
DROP INDEX "Booking_accountId_startAt_endAt_idx";

-- DropIndex
DROP INDEX "Payment_bookingId_idx";

-- CreateIndex
CREATE INDEX "Booking_accountId_status_startAt_idx" ON "Booking"("accountId", "status", "startAt");

-- CreateIndex
CREATE INDEX "Booking_accountId_status_endAt_idx" ON "Booking"("accountId", "status", "endAt");

-- CreateIndex
CREATE INDEX "Payment_bookingId_status_idx" ON "Payment"("bookingId", "status");
