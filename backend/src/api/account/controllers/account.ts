/**
 * account controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::account.account",
  ({ strapi }) => ({
    async deleteMany(ctx) {
      const { ids } = ctx.query;

      if (!Array.isArray(ids) || ids.length === 0) {
        return ctx.badRequest("Please provide an array of IDs to delete");
      }

      const entries = await strapi.documents("api::account.account").findMany({
        filters: { documentId: { $in: ids } },
        populate: ["thumbnail", "other_images"]
      });

      if (entries.length === 0) {
        return ctx.notFound("No entries found for the provided IDs");
      }

      for (const entry of entries) {
        if (entry.thumbnail) {
          const imageEntry = await strapi.db
            .query("plugin::upload.file")
            .delete({ where: { id: entry.thumbnail } });

          await strapi.plugins.upload.services.upload.remove(imageEntry);
        }

        if (entry.other_images && entry.other_images.length > 0) {
          await Promise.all(
            entry.other_images.map(async (id) => {
              const imageEntry = await strapi.db
                .query("plugin::upload.file")
                .delete({ where: { id } });
              strapi.plugins["upload"].services.upload.remove(imageEntry);
            })
          );
        }
      }

      await strapi.db
        .query("api::account.account")
        .deleteMany({ where: { id: { $in: ids } } });

      ctx.status = 204;
    }
  })
);
