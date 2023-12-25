// require("dotenv").config({ path: "./env" });

import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";

dotenv.config({
  path: "./env",
});
const app = express();

//Its a proffesional approach to put a semicolon before IFFI
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("Error", error.message);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port : ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Error", error.message);
    throw error;
  }
})();
