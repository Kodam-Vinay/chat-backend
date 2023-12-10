import express from "express";
import {
  createChat,
  findChat,
  findUserChats,
} from "../controllers/chatController.js";
const router = express.Router();

router.post("/", createChat);
router.get("/:userId", findUserChats);
router.get("/:senderId/:recieverId", findChat);

export default router;
