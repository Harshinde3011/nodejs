import jwt from "jsonwebtoken";
import { jwtSecret } from "./env.js";

const user = {
    _id: 2,
    name: "harsh",
    role: "admin",
    department: "IT",
    accessLevele: 4
}

const token = jwt.sign(user, jwtSecret, { expiresIn: "1h" });
console.log(`JWT token for ${user.role}: ${token}`);
