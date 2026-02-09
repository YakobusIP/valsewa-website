import { sourcePrisma } from "../source/client";
import { targetPrisma } from "../target/client";

export async function migrateImages() {
  const images = await sourcePrisma.imageUpload.findMany();

  await targetPrisma.imageUpload.createMany({
    data: images.map((img) => ({
      id: img.id,
      imageUrl: img.imageUrl,
      createdAt: img.createdAt,
      updatedAt: img.updatedAt
    }))
  });

  console.log(`✓ Images migrated: ${images.length}`);
}
