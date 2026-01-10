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
import CarouselSlideRouter from "./routes/carousel.route";
import VoucherRouter from "./routes/voucher.route";
import BookingRouter from "./routes/booking.route";
import { throttleMiddleware } from "./middleware/throttle.middleware";

import swaggerJSDoc, { OAS3Definition, Options } from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import SkinRouter from "./routes/skin.route";
import CustomerRouter from "./routes/customer.route";
import SnapBiConfig from "./lib/snapbi/snapbi.config";

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
app.use("/api/skins", SkinRouter);
app.use("/api/statistics", StatisticRouter);
app.use("/api/carousels", CarouselSlideRouter);
app.use("/api/upload", UploadRouter);
app.use("/api/customer", CustomerRouter);
app.use("/api/vouchers", VoucherRouter);
app.use("/api/bookings", BookingRouter);

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Valsewa Backend API",
    version: "1.0.0",
    description: "Entire API available on Valsewa Backend"
  },
  servers: [
    {
      url: env.BACKEND_BASE_URL,
      description:
        env.NODE_ENV === "development"
          ? "Development server"
          : "Production server"
    }
  ]
};

const options: Options = {
  swaggerDefinition,
  apis: [`${__dirname}/docs/swagger.yaml`]
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/docs", serve, setup(swaggerSpec));

app.use(errorMiddleware);

SnapBiConfig.init();

export default app;
