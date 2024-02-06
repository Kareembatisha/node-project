import express from "express";
import * as categoryController from "./category.controller.js";
import { auth } from "../../middleware/auth.js";
import { addSchema, updateSchema } from "./category.validation.js";
import { validation } from "../../middleware/validaion.js";
import upload from "../../middleware/multer/fileupload.js";

export const categoryRouter = express.Router();

categoryRouter.post(
  "/addCategory",
  upload.single("image"),
  auth,
  validation(addSchema),
  categoryController.addCategory
);
categoryRouter.put(
  "/updateCategory",
  upload.single("image"),
  auth,
  validation(updateSchema),
  categoryController.updateCategory
);
categoryRouter.delete(
  "/deleteCategory",
  auth,

  categoryController.deleteCategory
);
categoryRouter.get("/getCategories", categoryController.getAllCategory);
categoryRouter.get("/getCategory/:id", categoryController.getSpecificCategory);
