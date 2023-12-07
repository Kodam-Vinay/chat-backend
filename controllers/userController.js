import validator from "validator";
import bcrypt from "bcrypt";
import { UserModel } from "../models/userModel.js";
import dotenv from "dotenv";
import { generateToken } from "../src/utils/constants.js";
dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirm_password, image } = req.body;
    const checkUserExists = await UserModel.findOne({ email });
    if (checkUserExists)
      return res.status(400).send({ message: "User Already Exists" });

    if (!email || !password || !confirm_password || !name)
      return res.status(400).send({ message: "Fields must not to be Empty" });

    if (!validator.isEmail(email))
      return res.status(400).send({ message: "Please Enter a Valid Email" });

    if (password !== confirm_password)
      return res.status(400).send({ message: "Both Passwords should Match" });

    if (!validator.isStrongPassword(password))
      return res.status(400).send({
        message:
          "Password Not Meet the criteria, it Must includes(password length 8 or more charaters, 1 uppercase letter, 1 special symbol)",
      });
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    const hashed_password = await bcrypt.hash(password, salt);

    const user = new UserModel({
      name,
      email,
      password: hashed_password,
      image,
    });
    await user.save();
    const jsonToken = generateToken(user._id);
    res.status(201).send({
      message: "User Created SuccessFully",
      user: {
        _id: user._id,
        name,
        email,
        image,
        jsonToken,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await UserModel.findOne({ email });
    if (!validator.isEmail(email))
      return res.status(400).send({ message: "Please Enter a Valid Email" });

    if (!userExists)
      return res
        .status(404)
        .send({ message: "User Not Exists, Please Enter a valid user Email" });

    const comparePassword = await bcrypt.compare(password, userExists.password);
    if (!comparePassword)
      return res.status(400).send({ message: "Please Check Your Password" });

    const jsonToken = generateToken(userExists._id);

    res.status(200).send({
      _id: userExists._id,
      name: userExists.name,
      email,
      jsonToken,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const findUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const result = await UserModel.findById(user_id);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
