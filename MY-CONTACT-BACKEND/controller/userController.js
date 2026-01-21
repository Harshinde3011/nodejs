import User from "../models/userModel.js";
import bcrypt from "bcrypt"
import ApiError from "../utils/ApiError.js";
import JWT from "jsonwebtoken";

class UserController {

    async registration(req, res, next) {
        try {

            const { username, email, password, mobileNo } = req.body;

            if (!username || !mobileNo || !password) {
                throw new ApiError("Please provide valid data", 400);
            }

            const isUserExists = await User.findOne({
                mobileNo: mobileNo
            });

            if (isUserExists) {
                throw new ApiError("User already exists", 400);
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("hashedPassword: ", hashedPassword);

            const user = await User.create({
                username,
                mobileNo,
                email,
                password: hashedPassword
            });

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    email: user.email,
                    message: "User created successfully",
                })
            } else {
                throw new ApiError("User data is not valid", 400)
            }

        } catch (error) {
            console.log("Error in UserController.registration");
            next(error)
        }
    }

    async login(req, res, next) {
        try {

            const { password, mobileNo } = req.body;

            if (!mobileNo || !password) {
                throw new ApiError("Please provide valid data", 400);
            }

            const isUserExists = await User.findOne({
                mobileNo: mobileNo
            });

            if (isUserExists && (await bcrypt.compare(password, isUserExists.password))) {
                const user = {
                    _id: isUserExists._id,
                    username: isUserExists.username,
                    email: isUserExists.email,
                }

                const accesToken = JWT.sign(user, process.env.ACCESS_TOKEN_KEY, { expiresIn: "1m" });

                res.status(200).json({
                    accesToken
                })
            }else{
                throw new ApiError("Invalid credentails provided",400)
            }

        } catch (error) {
            console.log("Error in UserController.registration");
            next(error)
        }
    }

}

export default new UserController();