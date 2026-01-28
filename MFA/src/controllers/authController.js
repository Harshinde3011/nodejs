import User from "../models/user.js";
import bcrypt from "bcryptjs"

export const register = async (req, res) => {
    try {
        const reqBody = req.body;

        if (!reqBody.username || !reqBody.mobileNo || !reqBody.password) {
            res.status(404).json({
                message: "Please provide valid data"
            });
        }

        const isUserExists = await User.findOne({
            mobileNo: reqBody.mobileNo
        });

        if (isUserExists) {
            res.status(404).json({
                message: "User already exists with this mobileNo"
            });
        }

        const hashedPassword = await bcrypt.hash(reqBody.password, 10);
        console.log("hashedPassword: ", hashedPassword);

        const user = await User.create({
            username: reqBody.username,
            mobileNo: reqBody.mobileNo,
            email: reqBody.email,
            password: hashedPassword,
            isMfaActive: false
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                email: user.email,
                message: "User created successfully",
            })
        } else {
            res.status(404).json({
                message: "User data is not valid",
            })
        }
    } catch (error) {
        res.status(500).json({
            error: "Error occured while registring the data",
            message: error
        })
    }
};

export const login = async (req, res) => {
    try {   
        console.log("The authenticated user is: ", req.user);
        res.status(200).json({
            message: "User logged in successfully",
            username: req.user.username,
            isMfaActive: req.user.isMfaActive
        })
    } catch (error) {
        res.status(500).json({
            error: "Error occured while login",
            message: error
        })
    }
};

export const getStatus = async (req, res) => {
    try {
        if (req.user) {
            res.status(200).json({
                message: "User is logged in",
                username: req.user.username,
                isMfaActive: req.user.isMfaActive
            });
        } else {
            return res.status(401).json({
                message: "Unauthorized user"
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Error occured while getting status of user",
            message: error
        })
    }
};

export const logout = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized user"
            })
        }

        req.logout((err) => {
            if (err) {
                return res.status(401).json({
                    message: "User not logged in"
                })
            }else{
                return res.status(200).json({
                    message: "User logged out successfully"
                })
            }
        })

    } catch (error) {
        res.status(500).json({
            error: "Error occured while logging out",
            message: error
        })
    }
};

export const setUpTwoFA = async (req, res) => {
    try {
        console.log("The req.user is: ", req.user);
                
    } catch (error) {
        res.status(500).json({
            error: "Error occured while setting up 2FA",
            message: error
        })
    }
};

export const verifyTwoFA = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            error: "Error occured while verifying 2FA",
            message: error
        })
    }
};

export const resetTwoFA = async (req, res) => {
    try {

    } catch (error) {
        res.statu(500).json({
            error: "Error occured while resetting the 2FA",
            message: error
        })
    }
};