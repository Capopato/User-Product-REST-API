"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPassword = exports.userSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
/**  */
exports.userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        minLenght: [5, "Password needs to be 5 chars or more."],
    },
    passwordCheck: {
        type: String,
        required: true,
        minLenght: [
            5,
            "PasswordCheck needs to be 5 chars or more and needs to match password.",
        ],
    },
    date: { type: Date, default: Date.now() },
}, {
    timestamps: true,
});
/** Function to hash a password */
exports.setPassword = (exports.userSchema.methods.setPassword = function (password) {
    // userSchema.methods.setPassword = async function (password: string) {
    /** Create a unique hash */
    const salt = crypto_1.default.randomBytes(16).toString("hex");
    const hash = crypto_1.default
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
    return hash;
});
/** Function to validate a hashed password */
exports.userSchema.methods.validatePassword = function (password) {
    let hash = crypto_1.default
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");
    return this.hash == hash;
};
exports.default = mongoose_1.default.model("User", exports.userSchema);
