import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    cartItems: [
      {
        productId: { type: mongoose.Types.ObjectId, ref: "products" },
        quantity: { type: Number },
        price: { type: Number },
      },
    ],
    totalOrderPrice: { type: Number },
    address: {
      street: { type: String },
      city: { type: String },
      phone: { type: String },
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card"],
    },
  },
  { timestamps: true }
);

export const orderModel = mongoose.model("order", orderSchema);
