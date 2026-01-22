import pkg from 'express';
const { asyncHandler } = pkg;
import JWT from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import User from "../models/userModel.js";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization").split(" ")[1];

        if (!token) {
            throw new ApiError("User is not authorized", 401)
        }

        const decodeToken = JWT.verify(token, process.env.ACCESS_TOKEN_KEY);

        const user = await User.findOne({
            _id: decodeToken._id
        });

        if (!user) {
            throw new ApiError("Invalid access token", 401);
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError("Invalid access token", 401)
    }
}