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

const app: Express = express();

app.use(
  cors({
    credentials: true,
    origin: '*'
  })
);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookies());

if (env.NODE_ENV === "development") {
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
}

app.use("/api/auth", AuthRouter);

app.use("/api/accounts", AccountRouter);
app.use("/api/price-tiers", PriceTierRouter);
app.use("/api/statistics", StatisticRouter);
app.use("/api/upload", UploadRouter);

app.use(errorMiddleware);

export default app;
