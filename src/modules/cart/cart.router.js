import express from "express";
import { auth } from "../../middleware/auth.js";
import * as cartController from "./cart.controller.js";
import * as cartValidaion from "./cart.validation.js";
import { validation } from "../../middleware/validaion.js";

export const cartRouter = express.Router();

cartRouter.post(
  "/createCart",
  auth,
  validation(cartValidaion.addCartSchema),
  cartController.addToCart
);
cartRouter.get("/getUserCart", auth, cartController.getUserCart);
cartRouter.delete(
  "/deleteCart/:id",
  validation(cartValidaion.paramsIdSchema),
  auth,
  cartController.deleteCartItems
);
cartRouter.put(
  "/updateQuantity/:id",
  validation(cartValidaion.updateQuantitySchema),
  auth,
  cartController.updateCart
);
cartRouter.put("/applyCoupon", auth, cartController.applyCoupon);
