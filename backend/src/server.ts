import app from "./app";
import { env } from "./lib/env";
import { initCronJobs } from "./lib/cron";

const PORT = env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await initCronJobs();
});
