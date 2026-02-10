import mongoose from "mongoose";

export const connectDb = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/rbac";
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
};
