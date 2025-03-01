import express, { Express, json, urlencoded } from "express";
import cors from "cors";
import cookies from "cookie-parser";
import path from "path";
import { env } from "./lib/env";

import { errorMiddleware } from "./middleware/error.middleware";

import AuthRouter from "./routes/auth.route";
import AccountRouter from "./routes/account.route";
import PriceTierRouter from "./routes/pricetier.route";
import UploadRouter from "./routes/upload.route";
import StatisticRouter from "./routes/statistic.route";
import { throttleMiddleware } from "./middleware/throttle.middlware";

const app: Express = express();

app.use(
  cors({
    credentials: true,
    origin: [
      env.CANONICAL_PUBLIC_APP_URL,
      env.PUBLIC_APP_URL,
      env.ADMIN_APP_URL
    ]
  })
);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookies());

if (env.NODE_ENV === "development") {
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
}

app.use("/api/auth", AuthRouter);

if (env.NODE_ENV === "development") {
  app.use(throttleMiddleware);
}

app.use("/api/accounts", AccountRouter);
app.use("/api/price-tiers", PriceTierRouter);
app.use("/api/statistics", StatisticRouter);
app.use("/api/upload", UploadRouter);

app.use(errorMiddleware);

export default app;
