import Jwt from "jsonwebtoken";
import { userModel } from "../../database/models/user.model.js";

export const auth = async (req, res, next) => {
  const token = req.header("token");
  Jwt.verify(token, process.env.JWT_TOKEN, async (err, decode) => {
    if (err) return res.status(401).json({ message: "Invalid token", err });
    const user = await userModel.findById(decode.id);
    req.userId = decode.id;
    req.userRole = decode.role;
    req.userEmail = decode.email;
    req.userName = decode.userName;
    next();
  });
};

export const verifyUser = async (req, res, next) => {
  const token = req.header("token");
  Jwt.verify(token, process.env.JWT_TOKEN, async (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "token not provided", err });
    } else {
      req.token = token;
      next();
    }
  });
};
