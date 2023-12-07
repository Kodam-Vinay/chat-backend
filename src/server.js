import express from "express";
import dotenv from "dotenv";
import "./connection.js";
import userRoute from "../Routes/userRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});
