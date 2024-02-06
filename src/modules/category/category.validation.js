import Joi from "joi";

export const updateSchema = {
  body: Joi.object()
    .required()
    .keys({
      categoryName: Joi.string().required().messages({
        "string.base": "Category name must be a string",
        "string.empty": "Category name cannot be empty",
        "any.required": "Category name is required",
      }),
      categoryId: Joi.string().hex().min(24).max(24).required().messages({
        "string.base": "Invalid ID format",
        "string.empty": "ID cannot be empty",
        "any.required": "ID is required",
        "string.objectId": "Invalid MongoDB ObjectId format",
      }),
      image: Joi.string().required().messages({
        "string.base": "image name must be a string",
        "string.empty": "image name cannot be empty",
        "any.required": "image name is required",
      }),
    }),
};

export const addSchema = {
  body: Joi.object()
    .required()
    .keys({
      categoryName: Joi.string().required().messages({
        "string.base": "Category name must be a string",
        "string.empty": "Category name cannot be empty",
        "any.required": "Category name is required",
      }),
      image: Joi.string().required().messages({
        "string.base": "image name must be a string",
        "string.empty": "image name cannot be empty",
        "any.required": "image name is required",
      }),
    }),
};
