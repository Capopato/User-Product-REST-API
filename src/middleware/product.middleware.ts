import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";

/** Create a schema to validate the information that comes from client side */

export const validateProduct = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
};

export const productValidateSchema = {
  /** create, update */
  create: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().min(15).messages({
      "string empty":
        "Description cannot be empty. Minimum of 15 chars is required.",
    }),
    price: Joi.number().min(0.1),
    productionyear: Joi.number().min(1950).max(2023),
  }),
  update: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().min(15).messages({
      "string empty":
        "Description cannot be empty. Minimum of 15 chars is required.",
    }),
    price: Joi.number().min(0.1),
    productionyear: Joi.number().min(1950).max(2023),
  }),
};
