"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const product_middleware_1 = require("../middleware/product.middleware");
const productRoutes = express_1.default.Router();
productRoutes.get("/read/:productId", product_controller_1.default.readProd);
productRoutes.get("/all", product_controller_1.default.readAll);
productRoutes.post("/create", (0, product_middleware_1.validateProduct)(product_middleware_1.productValidateSchema.create), product_controller_1.default.createProd);
productRoutes.put("/update/:productId", (0, product_middleware_1.validateProduct)(product_middleware_1.productValidateSchema.update), product_controller_1.default.updateProd);
productRoutes.delete("/delete/:productId", product_controller_1.default.deleteProd);
productRoutes.delete("/delete-all", product_controller_1.default.deleteAll);
exports.default = productRoutes;
