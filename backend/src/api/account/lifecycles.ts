export default {
  async afterDeleteMany(event) {
    const { result } = event;

    console.log(result);

    await Promise.all(
      result.map(async (entry) => {
        if (entry.thumbnail) {
          await strapi.plugins["upload"].services.upload.remove(
            entry.thumbnail
          );
        }

        if (entry.other_images && entry.other_images.length > 0) {
          await Promise.all(
            entry.other_images.map((file) =>
              strapi.plugins["upload"].services.upload.remove(file)
            )
          );
        }
      })
    );
  }
};
