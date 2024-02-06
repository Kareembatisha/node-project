import Jwt from "jsonwebtoken";
import { userModel } from "../../../database/models/user.model.js";
import { sendEmail } from "../../emails/user.email.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../../utils/generateToken.js";
import { forgetPasswordEmail } from "../../emails/forgetpassword.email.js";
import { catchError } from "../../middleware/catchError.js";
import { Err } from "../../../utils/errorApp.js";

export const signUp = catchError(async (req, res, next) => {
  const { userName, email, password, address } = req.body;
  let exist = await userModel.findOne({ email });
  if (exist) return next(new Err("email already exist", 400));
  let hash = bcrypt.hashSync(password, 8);
  let addedUser = await userModel.insertMany({
    userName,
    email,
    password: hash,
    address,
  });
  sendEmail({ email });
  res.status(201).json({ message: "Success", addedUser });
});
export const verify = catchError(async (req, res, next) => {
  let { token } = req.params;
  let decode = Jwt.verify(token, process.env.JWT_TOKEN);
  await userModel.findOneAndUpdate(
    { email: decode.email },
    { isVerified: true }
  );
  res.status(200).json({ message: "verified" });
});

export const signIn = catchError(async (req, res, next) => {
  let { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    if (user.isVerified && !user.deactivate) {
      let match = bcrypt.compareSync(password, user.password);
      if (match) {
        const token = generateToken({
          userName: user.userName,
          email: user.email,
          role: user.role,
          id: user._id,
          address: user.address,
        });
        res.status(200).json({ message: "Success", token });
      } else {
        next(new Err("Invalid Password", 400));
      }
    } else {
      next(
        new Err(
          " Your account Not Verifed or Deactivated Contact With Admin For More Info",
          400
        )
      );
    }
  }
});

export const resetPassword = catchError(async (req, res, next) => {
  let userid = req.userId;
  let { password } = req.body;
  let hash = bcrypt.hashSync(password, 8);
  let updatedPassword = await userModel.findByIdAndUpdate(userid, {
    password: hash,
  });
  res.status(200).json({ message: "Success", updatedPassword });
});

export const forgetPassword = catchError(async (req, res, next) => {
  let { email } = req.body;
  let exist = await userModel.findOne({ email });
  if (!exist) return next(new Err("Invalid Email", 400));
  let token = Jwt.sign(email, process.env.JWT_TOKEN);
  await userModel.updateOne({ email }, { forgetPassword: token });
  forgetPasswordEmail({ email, token });
  res.status(200).json({ message: "Success" });
});

export const newPassword = catchError(async (req, res, next) => {
  let token = req.token;
  let { newPassword } = req.body;
  const hash = bcrypt.hashSync(newPassword, 8);
  let updatedPassword = await userModel.findOneAndUpdate(
    { forgetPassword: token },
    { password: hash },
    { new: true }
  );
  res.status(200).json({ message: "Success", updatedPassword });
});

export const updateUser = catchError(async (req, res, next) => {
  let userid = req.userId;
  let userRole = req.userRole;
  let { userName, address } = req.body;

  if (userRole === "admin") {
    let updatedUser = await userModel.findByIdAndUpdate(
      userid,
      { userName, address },

      {
        new: true,
      }
    );
    res.status(200).json({ message: "Success", updatedUser });
  } else {
    next(new Err("only admin can update", 400));
  }
});

export const deactivate = catchError(async (req, res, next) => {
  let userid = req.userId;
  let deactiveUser = await userModel.findByIdAndUpdate(userid, {
    deactivate: true,
  });
  res.status(200).json({ message: "Success", deactiveUser });
});
