import * as couponController from "./coupon.controller.js";
import express from "express";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validaion.js";
import * as couponValidation from "./coupon.validation.js";

export const couponRouter = express.Router();

couponRouter.post(
  "/addCoupon",
  auth,
  validation(couponValidation.addcouponSchema),
  couponController.addCoupon
);
couponRouter.put(
  "/updateCoupon/:couponId",
  auth,
  validation(couponValidation.updatecouponSchema),
  couponController.updateCoupon
);
couponRouter.delete(
  "/deleteCoupon/:couponId",
  auth,
  validation(couponValidation.deleteCoupnSchema),
  couponController.deleteCoupon
);
couponRouter.get("/getAllCoupons", couponController.getAllCoupons);

couponRouter.post(
  "/applyCoupon",
  auth,
  validation(couponValidation.applyCouponSchema),
  couponController.applyCoupon
);
