import mongoose from "mongoose";
import { CLOUDINARY_IMAGE_ACCESS_URL } from "../src/utils/constants.js";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: CLOUDINARY_IMAGE_ACCESS_URL + "DUMMY_PROFILE_LOGO.png",
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = new mongoose.model("User", userSchema);
