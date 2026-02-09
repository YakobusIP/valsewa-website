export async function migrateImages(tx: any, source: any) {
  const images = await source.imageUpload.findMany();

  await tx.imageUpload.createMany({
    data: images.map((img: any) => ({
      id: img.id,
      imageUrl: img.imageUrl,
      createdAt: img.createdAt,
      updatedAt: img.updatedAt,

      accountId: img.accountId
    }))
  });

  console.log(`✓ Images migrated: ${images.length}`);
}
