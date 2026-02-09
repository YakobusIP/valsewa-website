export async function migrateUsers(tx: any, source: any) {
  const users = await source.user.findMany();

  await tx.user.createMany({
    data: users
  });

  console.log(`✓ Users migrated: ${users.length}`);
}
