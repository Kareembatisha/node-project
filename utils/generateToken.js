import Jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  let token = Jwt.sign(payload, process.env.JWT_TOKEN);
  return token;
};
