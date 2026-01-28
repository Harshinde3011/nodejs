import express from "express";
import session from "express-session";
import passport from "passport"; // Passport is authentication middleware for Node.js
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import "./config/passportConfig.js"
import cors from "cors"

dotenv.config();
connectDB();

const app = express();

// middleware
const corsOptions = {
    origin: ["http://localhost:3001"], // Only allows requests from this frontend
    credentials: true  // When enabled, it allows the browser to send: 🍪 Cookies (sessions) 🔐 Authorization headers 🧾 TLS client certificates
}
app.use(cors(corsOptions));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
// This sets up server-side session management using express-session.
app.use(session({
    secret: process.env.SESSION_SECRET, // The session secret is used to sign and secure the session cookie so it can’t be modified by clients
    resave: false, // avoids saving unchanged sessions
    saveUninitialized: false, // It avoids creating empty sessions for unauthenticated users
    cookie: {
        maxAge: 6000 * 60
    }
}))
app.use(passport.initialize()); // This initializes Passport so authentication strategies can be used in the app
app.use(passport.session()); // This allows Passport to maintain login state across requests using sessions

// Routes
app.use("/api/auth", authRoutes)

// Listen
const PORT = process.env.PORT;
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})