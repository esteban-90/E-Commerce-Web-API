import { connect } from "mongoose";
import express, { json, static as _static } from "express";
import "express-async-errors";
import "dotenv/config";
import cors from "cors";
import { join } from "path";

import authRouter from "./routers/auth";
import categoryRouter from "./routers/categories";
import orderRouter from "./routers/orders";
import productRouter from "./routers/products";
import userRouter from "./routers/users";

import { DB_URI, DB_NAME, API_URL, PORT } from "./config";
import debug from "./debug";
import { errorHandler, requestHandler, requestLogger, unknownEndpoint } from "./middlewares";

(async () => {
  await connect(DB_URI, { dbName: DB_NAME });
  debug(`Connected to database ${DB_URI}/${DB_NAME}.`);
})();

const app = express();

app.use(cors());
app.options("*", cors());

app.use(json());
app.use(requestLogger());
app.use(requestHandler());

app.use("/public/uploads", _static(join(__dirname, "/public/uploads")));

app.use(`${API_URL}/auth`, authRouter);
app.use(`${API_URL}/categories`, categoryRouter);
app.use(`${API_URL}/orders`, orderRouter);
app.use(`${API_URL}/products`, productRouter);
app.use(`${API_URL}/users`, userRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => debug(`Server's running on http://localhost:${PORT}.`));
