-- CreateIndex
CREATE INDEX "AccountResetLog_resetAt_idx" ON "AccountResetLog"("resetAt");

-- CreateIndex
CREATE INDEX "Booking_status_endAt_idx" ON "Booking"("status", "endAt");

-- CreateIndex
CREATE INDEX "Booking_status_startAt_idx" ON "Booking"("status", "startAt");
