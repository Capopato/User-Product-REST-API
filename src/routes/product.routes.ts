import express from "express";
import productController from "../controllers/product.controller";

const productRoutes = express.Router();

productRoutes.get("/read/:productId", productController.readProd);
productRoutes.get("/all", productController.readAll);
productRoutes.post("/create", productController.createProd);
productRoutes.put("/update/:productId", productController.updateProd);
productRoutes.delete("/delete/:productId", productController.deleteProd);
productRoutes.delete("/delete-all", productController.deleteAll);

export default productRoutes;
