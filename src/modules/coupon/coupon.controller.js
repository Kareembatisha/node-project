import moment from "moment";
import { couponModel } from "../../../database/models/coupon.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { catchError } from "../../middleware/catchError.js";
import { Err } from "../../../utils/errorApp.js";

export const addCoupon = catchError(async (req, res, next) => {
  let { couponCode, value, expirein } = req.body;
  let userId = req.userId;
  let userRole = req.userRole;
  req.body.createdBy = userId;
  if (userRole == "admin") {
    let exist = await couponModel.findOne({ couponCode });
    if (exist) return next(new Err("coupon already exist", 400));
    const expireinDate = moment(expirein, "DD/MM/YYYY", true);
    expirein = expireinDate.utc().valueOf();

    let coupon = await couponModel.insertMany({ couponCode, value, expirein });
    res.status(201).json({ message: "Success", coupon });
  } else {
    next(new Err("only admin or owner can update and delete", 400));
  }
});

export const updateCoupon = catchError(async (req, res, next) => {
  let { couponCode, value, expirein } = req.body;
  let userRole = req.userRole;
  let couponId = req.params.couponId;
  req.body.updatedBy = req.userId;
  let exist = await couponModel.findOne({ couponCode });
  if (exist) return next(new Err("coupon already exist", 400));
  if (userRole == "admin") {
    let updatedCoupon = await couponModel.findByIdAndUpdate(
      couponId,
      { couponCode, value, expirein },
      { new: true }
    );
    if (updatedCoupon) {
      res.status(200).json({ message: "Success", updatedCoupon });
    } else {
      next(new Err("coupon not found", 400));
    }
  } else {
    next(new Err("only admin or owner can update and delete", 400));
  }
});

export const deleteCoupon = catchError(async (req, res, next) => {
  let userId = req.userId;
  let userRole = req.userRole;
  let couponId = req.params.couponId;
  if (userRole == "admin") {
    let deleteCoupon = await couponModel.findByIdAndUpdate(
      couponId,
      { isDeleted: true, deletedBy: userId },
      { new: true }
    );

    if (deleteCoupon) {
      res.status(200).json({ message: "Success", deleteCoupon });
    } else {
      next(new Err("coupon not found", 400));
    }
  } else {
    next(new Err("only admin or owner can update and delete", 400));
  }
});

export const getAllCoupons = catchError(async (req, res, next) => {
  let coupons = await couponModel.find();
  res.status(200).json({ message: "Success", coupons });
});

export const applyCoupon = catchError(async (req, res, next) => {
  let { productId, couponCode } = req.body;
  const product = await productModel.findById(productId);
  const coupon = await couponModel.findOne({ couponCode });
  if (!product || !coupon)
    return next(new Err("coupon or product not found", 400));
  if (coupon.expirein < Date.now() || coupon.isDeleted || coupon.isUsed == true)
    return next(new Err("coupon expired or already used", 400));
  const discountPrice =
    product.finalPrice - (product.finalPrice * coupon.value) / 100;
  const productPriceAfterDiscount = await productModel.findByIdAndUpdate(
    productId,

    { priceAfterDiscount: discountPrice },
    { new: true }
  );
  await couponModel.findOneAndUpdate({ couponCode }, { isUsed: true });

  res.status(200).json({ message: "Success", productPriceAfterDiscount });
});
