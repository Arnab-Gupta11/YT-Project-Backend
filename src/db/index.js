import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    // console.log("Instance ", connectionInstance);
    console.log(
      `MongoDB connected !! host ${connectionInstance.connection.host}`
    );
    // console.log(`Server is running on port : ${process.env.PORT}`);
  } catch (error) {
    console.log("MongoDB connection failed", error.message);
    process.exit(1);
  }
};

export default connectDB;
