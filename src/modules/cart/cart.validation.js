import Joi from "joi";

export const addCartSchema = {
  body: Joi.object()
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

export const paramsIdSchema = {
  params: Joi.object()
    .required()
    .keys({
      id: Joi.string().hex().min(24).max(24).required().messages({
        "string.base": "Invalid ID format",
        "string.empty": "ID cannot be empty",
        "any.required": "ID is required",
        "string.objectId": "Invalid MongoDB ObjectId format",
      }),
    }),
};
export const updateQuantitySchema = {
  body: Joi.object()
    .required()
    .keys({
      quantity: Joi.number().required().messages({
        "string.base": "quantity must be number",
        "string.empty": "quantity cannot be empty",
        "any.required": "quantity is required",
      }),
    }),
  params: Joi.object()
    .required()
    .keys({
      id: Joi.string().hex().min(24).max(24).required().messages({
        "string.base": "Invalid ID format",
        "string.empty": "ID cannot be empty",
        "any.required": "ID is required",
        "string.objectId": "Invalid MongoDB ObjectId format",
      }),
    }),
};
