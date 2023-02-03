import express from "express";
import productController from "../controllers/product.controller";
import {
  validateProduct,
  productValidateSchema,
} from "../middleware/product.middleware";

const productRoutes = express.Router();

productRoutes.get("/read/:productId", productController.readProd);
productRoutes.get("/all", productController.readAll);
productRoutes.post(
  "/create",
  validateProduct(productValidateSchema.create),
  productController.createProd
);
productRoutes.put(
  "/update/:productId",
  validateProduct(productValidateSchema.update),
  productController.updateProd
);
productRoutes.delete("/delete/:productId", productController.deleteProd);
productRoutes.delete("/delete-all", productController.deleteAll);

export default productRoutes;
