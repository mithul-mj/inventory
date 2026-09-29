import mongoose, { Schema } from "mongoose";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const productSchema = new Schema<IProduct>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
});

export const Product = mongoose.model<IProduct>("Product", productSchema);
