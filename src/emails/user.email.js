import nodemailer from "nodemailer";
import { template } from "./email.html.js";
import Jwt from "jsonwebtoken";

export const sendEmail = async (option) => {
  let token = Jwt.sign({ email: option.email }, process.env.JWT_TOKEN);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MULTER_EMAIL,
      pass: process.env.MULTER_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: `verifing<${process.env.MULTER_EMAIL}>`,
    to: option.email,
    subject: "verify",
    html: template(token),
  });
};
