import { sourcePrisma } from "../source/client";
import { targetPrisma } from "../target/client";

export async function migrateResetLogs() {
  const logs = await sourcePrisma.accountResetLog.findMany();

  await targetPrisma.accountResetLog.createMany({
    data: logs
  });

  console.log(`✓ Reset logs migrated: ${logs.length}`);
}
