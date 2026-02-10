import { User } from "../../models/User.js"
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"

class UserController {
    async register(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(404).json({
                    _status: 404,
                    message: "please provide valid data",
                })
            }
                
            const isUserExists = await User.findOne({
                email: email
            });

            if (isUserExists) {
                return res.status(401).json({
                    status: 401,
                    message: "User already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            
            const user = await User.create({
                email,
                password: hashedPassword,
                role: "user"
            });

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    email: user.email,
                    message: "user created successfully",
                })
            } else {                
                throw new Error("User data is not valid")
            }

        } catch (error) {
            console.log("Error in UserController.registration");
        }

    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw new Error("Please provide valid data");
            }

            const isUserExists = await User.findOne({
                email: email,
                role: "user"
            });

            if (!isUserExists) {
                return res.status(401).json({
                    status: 401,
                    message: "user not exists"
                });
            }

            if (isUserExists && bcrypt.compare(password, isUserExists.password)) {
                const payload = {
                    _id: isUserExists._id,
                    email: isUserExists.email,
                    password: isUserExists.password,
                    role: isUserExists.role
                }
                const accessToken = JWT.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: "15min" })

                if (accessToken) {
                    await User.updateOne({ email: email }, {
                        $set: {
                            accessToken: accessToken
                        }
                    })
                    return res.status(201).json({
                        _status: 200,
                        accessToken: accessToken,
                        message: "user logged in successfully",
                    })
                }else{
                    throw new Error("Invalid credentials")
                }
            } else {
                throw new Error("Invalid credentials")
            }

        } catch (error) {
            console.log("Error in UserController.login");
        }

    }
}

export default new UserController