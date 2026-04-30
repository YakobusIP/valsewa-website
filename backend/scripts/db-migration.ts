export { main as migrateDatabase, runBackfill } from "./backfill";

if (require.main === module) {
  import("./backfill")
    .then(({ runBackfill }) => runBackfill())
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}
