import Joi from "joi";

export const addProductSchema = {
  body: Joi.object()
    .required()
    .keys({
      productName: Joi.string().required().messages({
        "string.base": "Product name must be a string",
        "string.empty": "Product name cannot be empty",
        "any.required": "Product name is required",
      }),
      image: Joi.string().required().messages({
        "string.base": "image  must be a string",
        "string.empty": "image  cannot be empty",
        "any.required": "image  is required",
      }),
      finalPrice: Joi.number().required().messages({
        "string.base": "finalPrice must be number",
        "string.empty": "finalPrice cannot be empty",
        "any.required": "finalPrice is required",
      }),
      priceAfterDiscount: Joi.number().messages({
        "string.base": "final Price must be number",
        "string.empty": "final Price cannot be empty",
        "any.required": "final Price is required",
      }),
      stock: Joi.number().required().messages({
        "string.base": "Stock must be number",
        "string.empty": "Stock cannot be empty",
        "any.required": "Stock is required",
      }),
      categoryId: Joi.string().hex().min(24).max(24).required().messages({
        "string.base": "Invalid ID format",
        "string.empty": "ID cannot be empty",
        "any.required": "ID is required",
        "string.objectId": "Invalid MongoDB ObjectId format",
      }),
    }),
};
export const updateProductSchema = {
  body: Joi.object()
    .required()
    .keys({
      productName: Joi.string().required().messages({
        "string.base": "Product name must be a string",
        "string.empty": "Product name cannot be empty",
        "any.required": "Product name is required",
      }),
      image: Joi.string().required().messages({
        "string.base": "image  must be a string",
        "string.empty": "image  cannot be empty",
        "any.required": "image  is required",
      }),
      finalPrice: Joi.number().required().messages({
        "string.base": "final Price must be number",
        "string.empty": "final Price cannot be empty",
        "any.required": "final Price is required",
      }),
      priceAfterDiscount: Joi.number().messages({
        "string.base": "Price After Discount must be number",
        "string.empty": "Price After Discount cannot be empty",
        "any.required": "Price After Discount is required",
      }),
      stock: Joi.number().messages({
        "string.base": "Stock must be number",
        "string.empty": "Stock cannot be empty",
        "any.required": "Stock is required",
      }),
    }),
  params: Joi.object()
    .required()
    .keys({
      productId: Joi.string().hex().min(24).max(24).required().messages({
        "string.base": "Invalid ID format",
        "string.empty": "ID cannot be empty",
        "any.required": "ID is required",
        "string.objectId": "Invalid MongoDB ObjectId format",
      }),
    }),
};

export const deleteProductSchema = {
  params: Joi.object()
    .required()
    .keys({
      productId: Joi.string().hex().min(24).max(24).required().messages({
        "string.base": "Invalid ID format",
        "string.empty": "ID cannot be empty",
        "any.required": "ID is required",
        "string.objectId": "Invalid MongoDB ObjectId format",
      }),
    }),
};
