import mongoose, { Schema, Document } from "mongoose";

/** Product model */
export interface productModel extends Document {
  title: string;
  description: string;
  price: number;
  productionYear: number;
}

/** Product schema */
const productSchema: Schema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    productionYear: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<productModel>("Product", productSchema);
