import express from "express";
import { configDotenv } from "dotenv";
import { errorHandling } from "./middleware/errorHandling.js";
import connectDB from "./config/dbConnection.js";
import logger from "./middleware/logger.js";
import * as route from "./routes/index.js";

configDotenv();
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ MIDDLEWARE FIRST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// ✅ ROUTES BEFORE listen
app.use("/api/contact", route.contactRoute);
app.use("/api/user", route.userRoute);

// ✅ ERROR HANDLER LAST
app.use(errorHandling);

// ✅ LISTEN AT THE VERY END
app.listen(3001, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});
