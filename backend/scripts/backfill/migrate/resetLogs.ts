export async function migrateResetLogs(tx: any, source: any) {
  const logs = await source.accountResetLog.findMany();

  await tx.accountResetLog.createMany({
    data: logs
  });

  console.log(`✓ Reset logs migrated: ${logs.length}`);
}
