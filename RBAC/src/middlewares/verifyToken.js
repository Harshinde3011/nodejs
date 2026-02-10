import JWT from "jsonwebtoken";
import { User } from "../models/User.js";

export const verifyToken = async(req, res, next) => {
  const token = req.cookies?.accessToken || req.header("Authorization").split(" ")[1];
  
  if (!token) {
    throw new Error("User is not authorized")
  }
  
  const decode = JWT.verify(token, process.env.ACCESS_TOKEN_KEY);
  
  const user = await User.findOne({
    _id: decode._id
  });
  
  if (!user) {
    throw new Error("Invalid access token");
  }

  req.user = user;
  next();
};
