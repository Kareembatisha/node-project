import { cartModel } from "../../../database/models/cart.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { couponModel } from "../../../database/models/coupon.model.js";
import { Err } from "../../../utils/errorApp.js";
import { catchError } from "../../middleware/catchError.js";

function CalcPrice(cart) {
  let totalPrice = 0;
  cart.cartItems?.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalPrice = totalPrice;
}


export const addToCart = catchError(async (req, res, next) => {
  let userid = req.userId;
  let product = await productModel.findById(req.body.productId);

  if (!product) return next(new Err("Product not found", 400));
  req.body.price = product.priceAfterDiscount
    ? product.priceAfterDiscount
    : product.finalPrice;

  let cart = await cartModel.findOne({ userid });
  if (!cart) {
    let newCart = new cartModel({
      userId: userid,
      cartItems: [req.body],
    });

    CalcPrice(newCart);
    await newCart.save();
    res.status(201).json({ message: "Success", newCart });
  } else {
    let item = cart.cartItems.find(
      (item) => item.productId == req.body.productId
    );
    if (item) {
      item.quantity += 1;
    } else {
      cart.cartItems.push(req.body);
    }
    CalcPrice(cart);
    await cart.save();
    res.status(201).json({ message: "Success", cart });
  }
});

export const getUserCart = catchError(async (req, res, next) => {
  let userId = req.userId;
  let cart = await cartModel.findOne({ userId });
  if (!cart) return next(new Err("Cart is Empty", 400));
  if (cart.cartItems?.length == 0) return next(new Err("Cart is Empty", 400));
  res.status(200).json({ message: "Success", cart });
});

export const deleteCartItems = catchError(async (req, res, next) => {
  let userId = req.userId;
  let updatedCart = await cartModel.findOneAndUpdate(
    { userId },
    { $pull: { cartItems: { _id: req.params.id } } },
    { new: true }
  );
  if (updatedCart.cartItems?.length == 0) {
    let removeCart = await cartModel.findOneAndDelete({ userId });
  }
  CalcPrice(updatedCart);
  res.status(200).json({ message: "Success", updatedCart });
});

export const updateCart = catchError(async (req, res, next) => {
  let { quantity } = req.body;
  let productId = req.params.id;
  let userId = req.userId;
  let product = await productModel.findById(productId).select("finalPrice");
  if (!product) return next(new Err("Product not found", 400));
  let cart = await cartModel.findOne({ userId });
  let item = cart.cartItems.find((item) => item.productId == productId);

  if (!item) return next(new Err("Cart is Empty", 400));
  item.quantity = quantity;
  CalcPrice(cart);
  await cart.save();
  res.status(200).json({ message: "Success", cart });
});

export const applyCoupon = catchError(async (req, res, next) => {
  let userId = req.userId;
  let { couponCode } = req.body;
  let coupon = await couponModel.findOne({ couponCode });
  if (coupon.expirein < Date.now() || coupon.isDeleted || coupon.isUsed == true)
    return next(new Err("Invalid Coupon", 400));
  let cart = await cartModel.findOne({ userId });
  cart.priceAfterDiscount =
    cart.totalPrice - (cart.totalPrice * coupon.value) / 100;

  await couponModel.findOneAndUpdate({ couponCode }, { isUsed: true });

  await cart.save();

  res.status(200).json({ message: "Success", cart });
});
