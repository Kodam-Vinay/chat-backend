import express from "express";
import {
  createNewMessage,
  getAllMessages,
} from "../controllers/messageController.js";
const router = express.Router();

router.post("/", createNewMessage);
router.get("/:chatId", getAllMessages);
export default router;
