import { sourcePrisma } from "../source/client";
import { targetPrisma } from "../target/client";

export async function migrateUsers() {
  const users = await sourcePrisma.user.findMany();

  await targetPrisma.user.createMany({
    data: users
  });

  console.log(`✓ Users migrated: ${users.length}`);
}
