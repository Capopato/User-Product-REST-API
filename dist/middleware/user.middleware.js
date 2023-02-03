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
exports.userValidateSchema = exports.validateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
/** Create function for validating schema */
const validateSchema = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.validateAsync(req.body);
            next();
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    });
};
exports.validateSchema = validateSchema;
/** Create a schema to validate the information that comes from client side */
exports.userValidateSchema = {
    create: joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required().min(5).messages({
            "string.empty": `Password cannot be empty`,
            "any.required": `Password is required`,
        }),
        passwordCheck: joi_1.default.string().valid(joi_1.default.ref("password")).required(),
    }),
    update: joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required().min(5).messages({
            "string.empty": `Password cannot be empty`,
            "any.required": `Password is required`,
        }),
        passwordCheck: joi_1.default.string().valid(joi_1.default.ref("password")).required(),
    }),
};
