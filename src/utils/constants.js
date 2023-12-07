import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
};
export const CLOUDINARY_IMAGE_ACCESS_URL =
  "https://res.cloudinary.com/dwgpba5n2/image/upload/v1701860201/chat-app/";
