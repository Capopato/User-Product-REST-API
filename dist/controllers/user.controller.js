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
const user_models_1 = __importDefault(require("../models/user.models"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_models_2 = require("../models/user.models");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /** get values from req.body */
    const name = req.body.name;
    const email = req.body.email;
    const unHashedpassword = req.body.password;
    let passwordCheck = req.body.passwordCheck;
    const date = new Date();
    /** Protect password using the setPassword function*/
    const password = (0, user_models_2.setPassword)(unHashedpassword);
    passwordCheck = password;
    /** check if passwords match */
    const user = new user_models_1.default({
        userId: new mongoose_1.default.Types.ObjectId(),
        name,
        email,
        password,
        passwordCheck,
        date,
    });
    try {
        yield user.save();
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const readUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /** find userId */
    const userId = req.params.userId;
    try {
        /** find user by userId */
        const user = yield user_models_1.default.findById(userId);
        if (user) {
            res.status(200).json({ user });
        }
        else {
            res.status(404).send("User not found.");
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all = yield user_models_1.default.find();
        res.status(200).json({ all });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /** find user by userId */
    const userId = req.params.userId;
    try {
        const updateUser = yield user_models_1.default.findByIdAndUpdate(userId);
        if (updateUser) {
            updateUser.set(req.body);
            updateUser.save();
            res.status(200).json({ updateUser });
        }
        else {
            res.status(404).send("User not found.");
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /** find user by userId */
    const userId = req.params.userId;
    try {
        const deleteUser = yield user_models_1.default.findByIdAndDelete(userId);
        if (deleteUser) {
            res.status(200).send("Delete successful");
        }
        else {
            res.status(404).send("User not found");
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const deleteAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //   const all = User.find();
    try {
        yield user_models_1.default.deleteMany();
        res.status(200).send("All users are deleted");
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.default = {
    createUser,
    readUser,
    readAll,
    updateUser,
    deleteUser,
    deleteAll,
};
