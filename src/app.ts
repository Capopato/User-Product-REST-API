import express, { urlencoded } from "express";
import mongoose from "mongoose";
import config from "./config/config";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";

const app = express();

mongoose
  .set("strictQuery", false)
  .connect(config.mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB");
    startServer();
  })
  .catch((error) => {
    console.log(error);
  });

const startServer = () => {
  /** API rules */
  app.use(express.json());
  app.use(urlencoded({ extended: true }));
  app.use("/user", userRoutes);
  app.use("/product", productRoutes);

  /** listen */
  app.listen(config.PORT, () =>
    console.log(`Server is running at ${config.PORT}`)
  );
};
