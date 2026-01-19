import express from "express";
import { configDotenv } from "dotenv";
import contactRouter from "./routes/contactRoute.js"
import { errorHandling } from "./middleware/errorHandling.js";
import connectDB from "./config/dbConnection.js";
import logger from "./middleware/logger.js";

configDotenv();
connectDB();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); 
app.use(logger)

app.listen(PORT, () => {
    console.log(`server runnig on port: ${PORT}`);
})

app.use("/api/contact", contactRouter)
app.use(errorHandling);
