import { cartModel } from "../../../database/models/cart.model.js";
import { orderModel } from "../../../database/models/order.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { Err } from "../../../utils/errorApp.js";
import { catchError } from "../../middleware/catchError.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.SECRET_KEY);

export const createCashOrder = catchError(async (req, res, next) => {
  let userId = req.userId;
  const cart = await cartModel.findById(req.params.id);
  if (!cart) return next(new Err("Cart is Empty", 400));
  const totalOrderPrice = cart.priceAfterDiscount
    ? cart.priceAfterDiscount
    : cart.totalPrice;
  const order = new orderModel({
    userId,
    cartItems: cart.cartItems,
    totalOrderPrice: totalOrderPrice,
    address: req.body.address,
  });
  await order.save();
  if (order) {
    let options = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.productId },
        update: { quantity: -item.quantity },
      },
    }));
    await productModel.bulkWrite(options);
    await cartModel.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Success", order });
  } else {
    return next(new Err("order not found", 400));
  }
});

export const getUserOrder = catchError(async (req, res, next) => {
  let userId = req.userId;

  const order = await orderModel.findOne({ userId });
  if (!order) return next(new Err("order not found", 400));

  res.status(200).json({ message: "Success", order });
});

export const getAllOrders = catchError(async (req, res, next) => {
  let userRole = req.userRole;

  if (userRole == "admin") {
    let orders = await orderModel.find();
    res.status(200).json({ message: "Success", orders });
  } else {
    return new next(new Err("Only Admin Can See All Orders ", 403));
  }
});

export const onlinePayment = catchError(async (req, res, next) => {
  let userId = req.userId;
  let userEmail = req.userEmail;
  const cart = await cartModel.findById(req.params.id);
  if (!cart) return next(new Err("Cart is Empty", 400));
  const totalOrderPrice = cart.priceAfterDiscount
    ? cart.priceAfterDiscount
    : cart.totalPrice;
  let session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: req.userName,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url:
      "http://localhost:3000/products/getProducts?page=1&pageSize=10",
    cancel_url: "http://localhost:3000/carts/getUserCart",
    customer_email: userEmail,
    client_reference_id: req.params.id,
    metadata: req.body.address,
  });
  await cartModel.findByIdAndDelete(req.params.id);

  res.status(201).json({ message: "Success", session });
});
