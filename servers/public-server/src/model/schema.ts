import mongoose from "mongoose";

const product1Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    priceAlter: [
      {
        name: {
          type: String,
        },
        price: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const productSchema = mongoose.model("products", product1Schema);
