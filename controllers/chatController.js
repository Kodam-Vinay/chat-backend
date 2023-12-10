import { ChatModel } from "../models/chatModel.js";

export const createChat = async (req, res) => {
  //create chat
  try {
    const { senderId, recieverId } = req.body;
    const findChat = await ChatModel.findOne({
      members: { $all: [senderId, recieverId] },
    });
    if (findChat) return res.status(200).send(findChat);
    const newChat = new ChatModel({
      members: [senderId, recieverId],
    });
    const response = await newChat.save();
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const findUserChats = async (req, res) => {
  //existing user all chats
  try {
    const userId = req.params.userId;
    const chat = await ChatModel.find({
      members: { $in: [userId] },
    });
    res.status(200).send(chat);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const findChat = async (req, res) => {
  //particulat chat
  try {
    const { senderId, recieverId } = req.params;
    const chat = await ChatModel.findOne({
      members: { $all: [senderId, recieverId] },
    });
    res.status(200).send(chat);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
