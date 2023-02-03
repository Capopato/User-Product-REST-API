"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_models_1 = __importDefault(require("../models/product.models"));
const mongoose_1 = __importDefault(require("mongoose"));
const createProd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const title: string = req.body.title
    // const description: string = req.body.description;
    // const price: number = req.body.price
    // const productionYear: number = req.body.productionYear
    // const productt = new Product({
    //     id: new mongoose.Types.ObjectId(),
    //     title,
    //     description,
    //     price,
    //     productionYear
    // })
    const product = new product_models_1.default({
        id: new mongoose_1.default.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        productionYear: req.body.productionYear,
    });
    try {
        product.save();
        res.status(200).json({ product });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const readProd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    try {
        const product = yield product_models_1.default.findById(productId);
        if (product) {
            res.status(200).json({ product });
        }
        else {
            res.status(404).send("Product not found.");
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all = yield product_models_1.default.find();
        res.status(200).json({ all });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const updateProd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    try {
        const update = yield product_models_1.default.findByIdAndUpdate(productId);
        if (update) {
            update.set(req.body);
            res.status(200).json({ update });
        }
        else {
            res.status(404).send("Product not found.");
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const deleteProd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    try {
        const deleteProduct = yield product_models_1.default.findByIdAndDelete(productId);
        if (productId) {
            res.status(200).send("Delete successful");
        }
        else {
            res.status(404).send("Product not found.");
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const deleteAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product_models_1.default.deleteMany();
        res.status(200).send("All products are deleted");
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.default = {
    createProd,
    readProd,
    readAll,
    updateProd,
    deleteProd,
    deleteAll,
};
