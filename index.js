import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { dataBaseConnection } from "./database/dbConnection.js";
import { userRouter } from "./src/modules/user/user.router.js";
import { categoryRouter } from "./src/modules/category/category.router.js";
import { productRouter } from "./src/modules/product/product.router.js";
import { couponRouter } from "./src/modules/coupon/coupon.router.js";
import { cartRouter } from "./src/modules/cart/cart.router.js";
import { orderRouter } from "./src/modules/order/order.router.js";
import { Err } from "./utils/errorApp.js";
import cors from "cors";

const app = express();
const port = 3000;
dataBaseConnection();
app.use(cors());
app.use(express.json());
app.options("*", cors());

app.use("/uploads", express.static("uploads"));

app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/coupons", couponRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);

app.all("*", (req, res, next) => {
  next(new Err("Not Found", 404));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
