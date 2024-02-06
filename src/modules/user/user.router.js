import express from "express";
import * as usercontroller from "./user.controller.js";
import * as userValidation from "./user.validation.js";
import { validation } from "../../middleware/validaion.js";
import { auth, verifyUser } from "../../middleware/auth.js";

export const userRouter = express.Router();

userRouter.post(
  "/signup",
  validation(userValidation.signupSchema),
  usercontroller.signUp
);

userRouter.get("/verify/:token", usercontroller.verify);

userRouter.post("/signin",validation(userValidation.signinSchema) ,usercontroller.signIn);

userRouter.patch(
  "/resetPassword",
  auth,
  validation(userValidation.passwordSchema),
  usercontroller.resetPassword
);

userRouter.patch("/forgetPassword", usercontroller.forgetPassword);
userRouter.patch(
  "/changeForgetPassword",
  verifyUser,
  validation(userValidation.newPassword),
  usercontroller.newPassword
);
userRouter.put(
  "/updateUser",
  auth,
  validation(userValidation.updateuserName),
  usercontroller.updateUser
);
userRouter.patch("/deactivate", auth, usercontroller.deactivate);
