import express from "express";
import { auth } from "../../middleware/auth.js";
import * as productController from "./product.controller.js";
import * as productValidation from "./product.validation.js";
import { validation } from "../../middleware/validaion.js";
import upload from "../../middleware/multer/fileupload.js";

export const productRouter = express.Router();

productRouter.post(
  "/addProduct",
  upload.single("image"),
  auth,
  validation(productValidation.addProductSchema),
  productController.addProduct
);
productRouter.put(
  "/updateProduct/:productId",
  upload.single("image"),
  auth,
  validation(productValidation.updateProductSchema),
  productController.updateProduct
);
productRouter.delete(
  "/deleteProduct/:productId",
  auth,
  validation(productValidation.deleteProductSchema),
  productController.deleteProduct
);
productRouter.get("/getProducts", productController.getProducts);
productRouter.get("/getProduct/:id", productController.getSpecificProduct);
productRouter.get(
  "/allProductsCategory/:id",
  productController.getProductsCategory
);
