import Joi from "joi";

export const signupSchema = {
  body: Joi.object()
    .required()
    .keys({
      userName: Joi.string().min(3).max(15).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[A-Z][a-z0-9]{8,20}$"))
        .required(),
      address: Joi.array().items(
        Joi.object({
          street: Joi.string().required(),
          city: Joi.string().required(),
        })
      ),
    }),
};

export const signinSchema = {
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(new RegExp("^[A-Z][a-z0-9]{8,20}$")),
    }),
};

export const passwordSchema = {
  body: Joi.object()
    .required()
    .keys({
      password: Joi.string().pattern(new RegExp("^[A-Z][a-z0-9]{8,20}$")),
    }),
};
export const newPassword = {
  body: Joi.object()
    .required()
    .keys({
      newPassword: Joi.string().pattern(new RegExp("^[A-Z][a-z0-9]{8,20}$")),
    }),
};

export const updateuserName = {
  body: Joi.object()
    .required()
    .keys({
      userName: Joi.string().min(3).max(15).required(),
      address: Joi.array().items(
        Joi.object({
          street: Joi.string().required(),
          city: Joi.string().required(),
        })
      ),
    }),
};
