import express from "express";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validaion.js";
import * as orderController from "./order.controller.js";

export const orderRouter = express.Router();

orderRouter.post("/cash/:id", auth, orderController.createCashOrder);
orderRouter.post("/checkout/:id", auth, orderController.onlinePayment);
orderRouter.get("/getOrder", auth, orderController.getUserOrder);
orderRouter.get("/getAllOrder", auth, orderController.getAllOrders);
