import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "user" },
    priceAfterDiscount: { type: Number },
    cartItems: [
      {
        productId: { type: mongoose.Types.ObjectId, ref: "products" },
        quantity: { type: Number, default: 1 },
        price: { type: Number },
      },
    ],
    totalPrice: { type: Number },
  },
  { timestamps: true }
);

export const cartModel = mongoose.model("cart", cartSchema);
