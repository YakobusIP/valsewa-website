/// <reference types="node" />
import "dotenv/config";

import { migratePriceTiers } from "./migrate/priceTier";
import { migrateUsers } from "./migrate/users";
import { migrateImages } from "./migrate/images";
import { migrateAccounts } from "./migrate/accounts";
import { migrateResetLogs } from "./migrate/resetLogs";

async function main() {
  console.log("🚀 Starting backfill");

  const priceTierMap = await migratePriceTiers();

  await migrateUsers();
  await migrateImages();
  await migrateAccounts(priceTierMap);
  await migrateResetLogs();

  console.log("✅ Backfill complete");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
