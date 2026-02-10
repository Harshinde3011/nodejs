import { User } from "../../models/User.js"
import JWT from "jsonwebtoken"
import bcrypt from "bcrypt"

class AdminController {

    async register(req, res) {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                throw new Error("Please provide valid data");
            }

            const isUserExists = await User.findOne({
                email: email,
                role: "admin"
            });

            console.log("isUserExists: ", isUserExists);
            
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
                role: "admin"
            });

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    email: user.email,
                    message: "admin created successfully",
                })
            } else {
                throw new Error("User data is not valid")
            }

        } catch (error) {
            console.log("Error in adminController.register");
            next(error)
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
                role: "admin"
            });

            if (!isUserExists) {
                return res.status(401).json({
                    status: 401,
                    message: "admin User not exists"
                });
            }

            if (isUserExists && bcrypt.compare(password, isUserExists.password)) {
                const payload = {
                    _id: isUserExists._id,
                    email: isUserExists.email,
                    password: isUserExists.password,
                    role: isUserExists.role
                }
                const accessToken = JWT.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: "30min" });

                if (accessToken) {
                    await User.updateOne({ email: email }, {
                        $set: {
                            accessToken: accessToken
                        }
                    })
                    return res.status(201).json({
                        _status: 200,
                        accessToken: accessToken,
                        message: "admin logged in successfully",
                    })
                }else{
                    throw new Error("Invalid credentials")
                }
            }

        } catch (error) {
            console.log("Error in adminController.login");
        }

    }

    async createUser(req, res) {
        try {
            const { email, password, role } = req.body;

            if (!email || !password || !role) {
                return res.status(404).json({
                    status: 404,
                    message: "please provide valid data"
                })
            }

            if (role === "user") {
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
                console.log("user logged in successfully...");

                if (user) {
                    res.status(201).json({
                        _id: user._id,
                        email: user.email,
                        message: "User created successfully",
                    })
                } else {
                    throw new Error("User data is not valid")
                }
            } else {
                return res.status(403).json({
                    status: 403,
                    message: "you are not authorized"
                })
            }

        } catch (error) {
            console.log("Error in adminController.createUser");
        }

    }
}

export default new AdminController