import Joi from "joi";

export const addcouponSchema = {
  body: Joi.object()
    .required()
    .keys({
      couponCode: Joi.string().required().messages({
        "string.base": "Coupon name must be a string",
        "string.empty": "Coupon name cannot be empty",
        "any.required": "Coupon name is required",
      }),
      value: Joi.number().required().min(2).max(100).messages({
        "string.base": "Value must be number",
        "string.empty": "Value cannot be empty",
        "any.required": "Value is required",
      }),
      expirein: Joi.string().required().messages({
        "string.empty": "final Price cannot be empty",
        "any.required": "final Price is required",
      }),
    }),
};
export const updatecouponSchema = {
  body: Joi.object()
    .required()
    .keys({
      couponCode: Joi.string().required(),
      value: Joi.number().required().min(2).max(100).messages({
        "string.base": "Value must be number",
        "string.empty": "Value cannot be empty",
        "any.required": "Value is required",
      }),
      expirein: Joi.string(),
    }),
  params: Joi.object()
    .required()
    .keys({
      couponId: Joi.string().hex().min(24).max(24).required().messages({
        "string.base": "Invalid ID format",
        "string.empty": "ID cannot be empty",
        "any.required": "ID is required",
        "string.objectId": "Invalid MongoDB ObjectId format",
      }),
    }),
};

export const deleteCoupnSchema = {
  params: Joi.object()
    .required()
    .keys({
      couponId: Joi.string().hex().min(24).max(24).required().messages({
        "string.base": "Invalid ID format",
        "string.empty": "ID cannot be empty",
        "any.required": "ID is required",
        "string.objectId": "Invalid MongoDB ObjectId format",
      }),
    }),
};

export const applyCouponSchema = {
  body: Joi.object()
    .required()
    .keys({
      couponCode: Joi.string().required().messages({
        "string.base": "Coupon name must be a string",
        "string.empty": "Coupon name cannot be empty",
        "any.required": "Coupon name is required",
      }),
      productId: Joi.string().hex().min(24).max(24).required().messages({
        "string.base": "Invalid ID format",
        "string.empty": "ID cannot be empty",
        "any.required": "ID is required",
        "string.objectId": "Invalid MongoDB ObjectId format",
      }),
    }),
};
