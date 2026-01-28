import { Router } from "express";
import passport from "passport";
import { register, login, logout, verifyTwoFA, setUpTwoFA, getStatus, resetTwoFA } from "../controllers/authController.js";

const _router = Router();

// Registration
_router.post("/register", register);

// Login
_router.post("/login", passport.authenticate("local"), login);

// Auth status
_router.get("/status", getStatus);

// Logout
_router.post("/logout", logout);

// Setup 2FA
_router.post("/twoFA/setUp", ((req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }else{
        res.status(401).json({
            message: "Unathorized"
        })
    }
}),setUpTwoFA);

// Verify twoFA
_router.post("/twoFA/verify", verifyTwoFA);

// Reset
_router.post("/twoFA/reset", resetTwoFA)

export default _router;