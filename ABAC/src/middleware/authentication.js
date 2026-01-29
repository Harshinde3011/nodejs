import jwt from "jsonwebtoken";
import { jwtSecret } from "../utils/env.js";

export const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "token is not available"
            })
        }

        try {
            const decode = jwt.verify(token, jwtSecret);
            const user = decode;
            req.user = user;

            next()
        } catch (error) {
            res.status(400).json({
                status: 400,
                message: "Invalid access token"
            })
        }
    }else{
        res.status(401).json({
            status: 401,
            message: "no token available"
        })
    }
}