-- Drop redundant password change timestamp; expiry is tracked via passwordExpireAt.
ALTER TABLE "Customer" DROP COLUMN "passwordChangedAt";

-- Default password expiry policy for new customers and password resets.
INSERT INTO "GlobalSettings" ("key", "value")
VALUES ('password_expiry_days', '30')
ON CONFLICT ("key") DO NOTHING;
