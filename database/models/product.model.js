import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, unique: true },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
    },
    finalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    stock: {
      type: Number,
      required:true,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

export const productModel = mongoose.model("product", productSchema);
