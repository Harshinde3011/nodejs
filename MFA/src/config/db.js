import { connect } from "mongoose";

const connectDB = async () => {
    try {
        const mongoConnection = await connect(process.env.MONGODB_URI);
        console.log(`database connected successfully: ${mongoConnection.connection.host}`);
    } catch (error) {
        console.log("Error while connecting to DB: ", error);
        process.exit(1);
    }
}

export default connectDB;