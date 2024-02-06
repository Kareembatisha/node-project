import uploadImageAndAddToReq from "../../../cloudinary.upload.js";
import { categoryModel } from "../../../database/models/category.model.js";
import { Err } from "../../../utils/errorApp.js";
import { catchError } from "../../middleware/catchError.js";

export const addCategory = catchError(async (req, res, next) => {
  let userid = req.userId;
  await uploadImageAndAddToReq(req, res);
  let { categoryName, image } = req.body;

  let exist = await categoryModel.findOne({ categoryName });
  if (exist) return next(new Err("category already exist", 400));

  const category = new categoryModel({
    image,
    categoryName,
    createdBy: userid,
  });
  await category.save();
  res.status(201).json({ message: "Success", category });
});

export const updateCategory = catchError(async (req, res, next) => {
  let userid = req.userId;
  let userRole = req.userRole;

  let { categoryName, categoryId } = req.body;

  let exist = await categoryModel.findOne({ categoryName });

  if (exist) return next(new Err("Category already exist", 400));

  let category = await categoryModel.findById(categoryId);
  if (category) {
    if (category.createdBy == userid || userRole === "admin") {
      let updatedCategory = await categoryModel.updateOne(
        { _id: categoryId },
        { categoryName: categoryName, image: req.file.filename }
      );
      res.status(200).json({ message: "Success", updatedCategory });
    } else {
      next(new Err("only admin or owner can update and delete", 400));
    }
  } else {
    next(new Err("Category already exist", 400));
  }
});
export const deleteCategory = catchError(async (req, res, next) => {
  let userid = req.userId;
  let userRole = req.userRole;
  let { categoryId } = req.body;

  let category = await categoryModel.findById(categoryId);
  if (category) {
    if (category.createdBy == userid || userRole === "admin") {
      let updatedCategory = await categoryModel.deleteOne({ _id: categoryId });
      res.status(200).json({ message: "Success", updatedCategory });
    } else {
      next(new Err("only admin or owner can update and delete", 400));
    }
  } else {
    next(new Err("Category already exist", 400));
  }
});

export const getAllCategory = catchError(async (req, res, next) => {
  let categories = await categoryModel.find();
  res.status(200).json({ message: "Success", categories });
});

export const getSpecificCategory = catchError(async (req, res, next) => {
  let catgoryid = req.params.id;

  let category = await categoryModel.findById(catgoryid);
  if (!category) return next(new Err("Category not found", 400));
  res.status(200).json({ message: "Success", category });
});
