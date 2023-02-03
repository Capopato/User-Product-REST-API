import mongoose, { Schema, Document } from "mongoose";
import crypto from "crypto";

/** userModel that extends Document options from mongoose */
export interface userModel extends Document {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
  date: Date;
}

/**  */
export const userSchema: Schema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

/** Function to hash a password */
export const setPassword = (userSchema.methods.setPassword = function (
  password: string
) {
  // userSchema.methods.setPassword = async function (password: string) {
  /** Create a unique hash */
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hash;
});

/** Function to validate a hashed password */
userSchema.methods.validatePassword = function (password: string) {
  let hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash == hash;
};

export default mongoose.model<userModel>("User", userSchema);
