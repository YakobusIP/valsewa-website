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

        if (entry.otherImages && entry.otherImages.length > 0) {
          await Promise.all(
            entry.otherImages.map((file) =>
              strapi.plugins["upload"].services.upload.remove(file)
            )
          );
        }
      })
    );
  }
};
