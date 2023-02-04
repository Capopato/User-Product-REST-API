import mongoose, { Schema, Document } from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

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
    },
    passwordCheck: {
      type: String,
      required: true,
    },
    date: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this as userModel;

  /** check if the password from user is modified. if not > next() */
  if (!user.isModified("password")) {
    return next();
  }
  /** Declare amount of salt rounds */
  const salt = await bcrypt.genSalt(10);
  const hashPassword = bcrypt.hashSync(user.password, salt);
  user.password = hashPassword;
  user.passwordCheck = hashPassword;
  return next();
});

export default mongoose.model<userModel>("User", userSchema);
