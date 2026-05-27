ALTER TABLE "Account" ADD COLUMN "archivedAt" TIMESTAMP(3);

DROP INDEX IF EXISTS "Account_accountCode_key";

CREATE UNIQUE INDEX "Account_accountCode_active_key"
ON "Account"("accountCode")
WHERE "archivedAt" IS NULL;
