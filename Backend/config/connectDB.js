import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("Please provide MONGODB_URI in .env file");
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongooDB connected");
  } catch (error) {
    console.log("mongoo connect error", error);
    process.exit(1);
  }
};
export default connectDB;
