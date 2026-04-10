/// <reference types="node" />
import "dotenv/config";

import { sourcePrisma } from "./source/client";
import { targetPrisma } from "./target/client";
import { migratePriceTiers } from "./migrate/priceTier";
import { migrateUsers } from "./migrate/users";
import { migrateImages } from "./migrate/images";
import { migrateAccounts } from "./migrate/accounts";
import { migrateResetLogs } from "./migrate/resetLogs";

async function main() {
  console.log("🚀 Starting backfill");

  await targetPrisma.$transaction(
    async (tx) => {
      // Disable FK enforcement for THIS connection
      await tx.$executeRawUnsafe(`SET session_replication_role = 'replica';`);

      // IMPORTANT: pass tx to all target-writes
      const priceTierMap = await migratePriceTiers(tx, sourcePrisma);

      await migrateUsers(tx, sourcePrisma);

      // You can keep your original order now; both directions are safe
      await migrateImages(tx, sourcePrisma);
      await migrateAccounts(tx, sourcePrisma, priceTierMap);
      await migrateResetLogs(tx, sourcePrisma);

      await tx.$executeRawUnsafe(`SET session_replication_role = 'origin';`);
    },
    {
      timeout: 1000 * 60 * 30, // 30 minutes
      maxWait: 1000 * 60 * 5 // 5 minutes
    }
  );

  console.log("✅ Backfill complete");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
