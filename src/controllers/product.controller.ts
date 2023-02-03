import { Request, Response, NextFunction } from "express";
import Product from "../models/product.models";
import mongoose from "mongoose";

const createProd = async (req: Request, res: Response, next: NextFunction) => {
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
  const product = new Product({
    id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    productionYear: req.body.productionYear,
  });

  try {
    product.save();
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const readProd = async (req: Request, res: Response, next: NextFunction) => {
  const productId: string = req.params.productId;

  try {
    const product = await Product.findById(productId);
    if (product) {
      res.status(200).json({ product });
    } else {
      res.status(404).send("Product not found.");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const all = await Product.find();
    res.status(200).json({ all });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateProd = async (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.productId;

  try {
    const update = await Product.findByIdAndUpdate(productId);
    if (update) {
      update.set(req.body);
      res.status(200).json({ update });
    } else {
      res.status(404).send("Product not found.");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteProd = async (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.productId;

  try {
    const deleteProduct = await Product.findByIdAndDelete(productId);
    if (productId) {
      res.status(200).send("Delete successful");
    } else {
      res.status(404).send("Product not found.");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Product.deleteMany();
    res.status(200).send("All products are deleted");
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default {
  createProd,
  readProd,
  readAll,
  updateProd,
  deleteProd,
  deleteAll,
};
