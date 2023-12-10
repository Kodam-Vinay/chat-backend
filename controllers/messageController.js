//createNewMessage
//getAllMessages

import { MessageModel } from "../models/messageModel.js";

export const createNewMessage = async (req, res) => {
  try {
    const { chatId, senderId, text } = req.body;
    const newMessage = new MessageModel({
      chatId,
      senderId,
      text,
    });
    const response = await newMessage.save();
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await MessageModel.find({ chatId });
    res.status(200).send(messages);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
