import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    members: Array,
  },
  { timestamps: true }
);

export const ChatModel = new mongoose.model("Chat", chatSchema);
