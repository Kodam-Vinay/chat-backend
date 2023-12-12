import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      minLength: 4,
      unique: true,
    },
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
      minLength: 8,
    },
    image: {
      type: String,
      default: "DUMMY_PROFILE_LOGO.png",
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = new mongoose.model("User", userSchema);
