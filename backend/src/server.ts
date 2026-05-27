import app from "./app";
import { env } from "./lib/env";
import { initCronJobs } from "./lib/cron";
import { logger } from "./lib/logger";

const PORT = env.PORT || 5000;

app.listen(PORT, async () => {
  logger.info({ event: "server_started", port: PORT }, "Server started");
  await initCronJobs();
});
