import express from "express";
import dotenv from "dotenv";
import "./connection.js";
import userRoute from "../Routes/userRoute.js";
import chatRoute from "../Routes/chatRoute.js";
import messageRoute from "../Routes/messageRoute.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});
