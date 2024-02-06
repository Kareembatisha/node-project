import slugify from "slugify";
import { productModel } from "../../../database/models/product.model.js";
import { categoryModel } from "../../../database/models/category.model.js";
import { Err } from "../../../utils/errorApp.js";
import { catchError } from "../../middleware/catchError.js";
import uploadImageAndAddToReq from "../../../cloudinary.upload.js";

export const addProduct = catchError(async (req, res, next) => {
  await uploadImageAndAddToReq(req, res);
  let {
    productName,
    priceAfterDiscount,
    finalPrice,
    categoryId,
    stock,
    image,
  } = req.body;
  let userid = req.userId;
  let slug = slugify(productName);

  let exist = await productModel.findOne({ productName });
  if (exist) return next(new Err("Name Already Exist", 400));
  let category = await categoryModel.findById(categoryId);
  if (!category) return next(new Err("category not found", 400));
  const product = new productModel({
    image,
    productName,
    priceAfterDiscount,
    finalPrice,
    categoryId,
    stock,
    slug,
    createdBy : userid

  });
  await product.save();
  res.status(201).json({ message: "Success", product });
});

export const updateProduct = catchError(async (req, res, next) => {
  await uploadImageAndAddToReq(req, res);
  let { productName, finalPrice, stock, image } = req.body;
  let userid = req.userId;
  let userRole = req.userRole;
  let slug = slugify(req.body.productName);
  let productId = req.params.productId;

  if (userid == req.body.createdBy || userRole === "admin") {
    let updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      { productName, finalPrice, stock, slug, image },
      { new: true }
    );
    if (updatedProduct) {
      res.status(200).json({ message: "Success", updatedProduct });
    } else {
      next(new Err("product not found", 400));
    }
  } else {
    next(new Err("only admin or owner can update and delete", 400));
  }
});
export const deleteProduct = catchError(async (req, res, next) => {
  let userid = req.userId;
  let userRole = req.userRole;
  let productId = req.params.productId;

  if (userid == req.body.createdBy || userRole === "admin") {
    let deletedProduct = await productModel.findByIdAndDelete(productId);
    if (deletedProduct) {
      res.status(200).json({ message: "Success", deletedProduct });
    } else {
      next(new Err("product not found", 400));
    }
  } else {
    next(new Err("only admin or owner can update and delete", 400));
  }
});

export const getProducts = catchError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const totalProducts = await productModel.countDocuments();
  const totalPages = Math.ceil(totalProducts / pageSize);
  let products = await productModel
    .find()
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  res
    .status(200)
    .json({ message: "Success", currentPage: page, totalPages, products });
});

export const getSpecificProduct = catchError(async (req, res, next) => {
  let id = req.params.id;
  let product = await productModel.findById(id);
  if (!product) return next(new Err("product not found", 400));
  res.status(200).json({ message: "Success", product });
});

export const getProductsCategory = catchError(async (req, res, next) => {
  let categoryId = req.params.id;

  let products = await productModel.find({ categoryId: categoryId });
  res.status(200).json({ message: "Success", products });
});
