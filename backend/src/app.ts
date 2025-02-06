import express, { Express, json, urlencoded } from "express";
import AccountRouter from "./routes/account.route";
import { errorMiddleware } from "./middleware/error.middleware";
import PriceTierRouter from "./routes/pricetier.route";
import cors from "cors";

const app: Express = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/accounts", AccountRouter);
app.use("/api/price-tiers", PriceTierRouter);

app.use(errorMiddleware);

export default app;
