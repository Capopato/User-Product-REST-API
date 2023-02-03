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
exports.productValidateSchema = exports.validateProduct = void 0;
const joi_1 = __importDefault(require("joi"));
/** Create a schema to validate the information that comes from client side */
const validateProduct = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.validateAsync(req.body);
        }
        catch (error) {
            res.status(500).json({ error });
        }
    });
};
exports.validateProduct = validateProduct;
exports.productValidateSchema = {
    /** create, update */
    create: joi_1.default.object({
        title: joi_1.default.string().required(),
        description: joi_1.default.string().min(15).messages({
            "string empty": "Description cannot be empty. Minimum of 15 chars is required.",
        }),
        price: joi_1.default.number().min(0.1),
        productionyear: joi_1.default.number().min(1950).max(2023),
    }),
    update: joi_1.default.object({
        title: joi_1.default.string().required(),
        description: joi_1.default.string().min(15).messages({
            "string empty": "Description cannot be empty. Minimum of 15 chars is required.",
        }),
        price: joi_1.default.number().min(0.1),
        productionyear: joi_1.default.number().min(1950).max(2023),
    }),
};
