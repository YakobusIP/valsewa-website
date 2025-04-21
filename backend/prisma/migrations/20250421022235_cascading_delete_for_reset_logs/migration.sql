-- DropForeignKey
ALTER TABLE "AccountResetLog" DROP CONSTRAINT "AccountResetLog_accountId_fkey";

-- AddForeignKey
ALTER TABLE "AccountResetLog" ADD CONSTRAINT "AccountResetLog_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
