import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("connection failed due to" + err.message);
  });
