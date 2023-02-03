import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import { userModel } from "../models/user.models";

/** Create function for validating schema */
export const validateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };
};

/** Create a schema to validate the information that comes from client side */
export const userValidateSchema = {
  user: {
    create: Joi.object<userModel>({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(5),
      passwordCheck: Joi.ref("password"),
    }),
    update: Joi.object<userModel>({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(5),
      passwordCheck: Joi.ref("password"),
    }),
  },
};
