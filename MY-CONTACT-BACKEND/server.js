import express from "express";
import { configDotenv } from "dotenv";
import { errorHandling } from "./middleware/errorHandling.js";
import connectDB from "./config/dbConnection.js";
import logger from "./middleware/logger.js";
import * as route from "./routes/index.js"

configDotenv();
connectDB();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger)

app.listen(PORT, () => {
    console.log(`server runnig on port: ${PORT}`);
})

app.use("/api/contact", route.contactRoute)
app.use("/api/user", route.userRoute)
app.use(errorHandling);
