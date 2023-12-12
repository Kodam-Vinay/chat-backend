import validator from "validator";
import bcrypt from "bcrypt";
import { UserModel } from "../models/userModel.js";
import dotenv from "dotenv";
import { generateToken } from "../src/utils/constants.js";
dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { name, email, user_id, password, confirm_password, image } =
      req.body;
    if (!email || !password || !confirm_password || !name)
      return res.status(400).send({ message: "Fields must not to be Empty" });

    const checkUserExistsWithEmail = await UserModel.findOne({ email });
    const checkUserExistsWIthId = await UserModel.findOne({ user_id });

    if (checkUserExistsWithEmail)
      return res
        .status(400)
        .send({ message: "User Already Exists with This Email Id" });

    if (checkUserExistsWIthId)
      return res
        .status(400)
        .send({ message: "User Id Already Exists Please Enter Unique Id" });

    if (!validator.isEmail(email))
      return res.status(400).send({ message: "Please Enter a Valid Email" });

    if (name.length < 4)
      res.status(400).send({
        message: "Name is Too Short,it contain at least 4 characters",
      });

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
      user_id,
      email,
      password: hashed_password,
      image,
    });
    await user.save();
    const jsonToken = generateToken(user._id);
    res.status(201).send({
      _id: user._id,
      user_id,
      name,
      email,
      image,
      jsonToken,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      const userExistsWithId = await UserModel.findOne({ user_id: email }); //checking With user_id
      if (!userExistsWithId) {
        return res
          .status(400)
          .send({ message: "Please Enter a Valid User Id or Email" });
      } else {
        const comparePassword = await bcrypt.compare(
          password,
          userExistsWithId.password
        );
        if (!comparePassword)
          return res
            .status(400)
            .send({ message: "Please Check Your Password" });

        const jsonToken = generateToken(userExistsWithId._id);

        res.status(200).send({
          _id: userExistsWithId._id,
          name: userExistsWithId.name,
          email: userExistsWithId.email,
          user_id: email,
          jsonToken,
        });
      }
    }

    const userExistsWithEmail = await UserModel.findOne({ email });
    if (!userExistsWithEmail) {
      return res
        .status(400)
        .send({ message: "Please Enter a Valid User Id or Email" });
    }
    const comparePassword = await bcrypt.compare(
      password,
      userExistsWithEmail.password
    );
    if (!comparePassword)
      return res.status(400).send({ message: "Please Check Your Password" });

    const jsonToken = generateToken(userExistsWithEmail._id);

    res.status(200).send({
      _id: userExistsWithEmail._id,
      name: userExistsWithEmail.name,
      email,
      user_id: userExistsWithEmail.user_id,
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
