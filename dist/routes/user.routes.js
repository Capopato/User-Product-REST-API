"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const user_middleware_1 = require("../middleware/user.middleware");
const userRoutes = express_1.default.Router();
userRoutes.get("/read/:userId", user_controller_1.default.readUser);
userRoutes.get("/all", user_controller_1.default.readAll);
userRoutes.post("/create", (0, user_middleware_1.validateSchema)(user_middleware_1.userValidateSchema.create), user_controller_1.default.createUser);
userRoutes.put("/update/:userId", (0, user_middleware_1.validateSchema)(user_middleware_1.userValidateSchema.update), user_controller_1.default.updateUser);
userRoutes.delete("/delete/:userId", user_controller_1.default.deleteUser);
userRoutes.delete("/delete-all", user_controller_1.default.deleteAll);
exports.default = userRoutes;
