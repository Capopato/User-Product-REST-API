"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const username = process.env.username || "";
const password = process.env.password || "";
const mongoUrl = `mongodb+srv://${username}:${password}@restapidb.i67ryjf.mongodb.net/?retryWrites=true&w=majority`;
const PORT = 3000;
exports.default = { username, password, mongoUrl, PORT };
