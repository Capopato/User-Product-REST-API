import express from "express";
import controller from "../controllers/user.controller";
import {
  userValidateSchema,
  validateSchema,
} from "../middleware/user.middleware";

const userRoutes = express.Router();

userRoutes.get("/read/:userId", controller.readUser);
userRoutes.get("/all", controller.readAll);
userRoutes.post(
  "/create",
  validateSchema(userValidateSchema.create),
  controller.createUser
);
userRoutes.put(
  "/update/:userId",
  validateSchema(userValidateSchema.update),
  controller.updateUser
);
userRoutes.delete("/delete/:userId", controller.deleteUser);
userRoutes.delete("/delete-all", controller.deleteAll);

export default userRoutes;
