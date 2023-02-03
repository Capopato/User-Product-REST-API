import { Request, Response, NextFunction } from "express";
import User from "../models/user.models";
import mongoose from "mongoose";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  /** TODO
   * hash the password to increase security
   */

  /** get values from req.body */
  const name: string = req.body.name;
  const email: string = req.body.email;
  const password: string = req.body.password;
  const passwordCheck: string = req.body.passwordCheck;
  const date: Date = new Date();

  /** check if passwords match */
  if (password == passwordCheck && password.length >= 5) {
    const user = new User({
      userId: new mongoose.Types.ObjectId(),
      name,
      email,
      password,
      passwordCheck,
      date,
    });
    try {
      await user.save();
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(500).send("Passwords do not match or is too short. Try again.");
  }
};

const readUser = async (req: Request, res: Response, next: NextFunction) => {
  /** find userId */
  const userId: string = req.params.userId;

  try {
    /** find user by userId */
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).send("User not found.");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const all = await User.find();
    res.status(200).json({ all });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  /** find user by userId */
  const userId = req.params.userId;

  try {
    const updateUser = await User.findByIdAndUpdate(userId);
    if (updateUser) {
      updateUser.set(req.body);
      updateUser.save();
      res.status(200).json({ updateUser });
    } else {
      res.status(404).send("User not found.");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  /** find user by userId */
  const userId = req.params.userId;

  try {
    const deleteUser = await User.findByIdAndDelete(userId);
    if (deleteUser) {
      res.status(200).send("Delete successful");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteAll = async (req: Request, res: Response, next: NextFunction) => {
  //   const all = User.find();
  try {
    await User.deleteMany();
    res.status(200).send("All users are deleted");
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default {
  createUser,
  readUser,
  readAll,
  updateUser,
  deleteUser,
  deleteAll,
};
