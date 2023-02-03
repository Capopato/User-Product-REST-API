import mongoose, { Schema, Document } from "mongoose";

/** userModel that extends Document options from mongoose */
export interface userModel extends Document {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
  date: Date;
}

/**  */
const userSchema: Schema = new Schema(
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

export default mongoose.model<userModel>("User", userSchema);
