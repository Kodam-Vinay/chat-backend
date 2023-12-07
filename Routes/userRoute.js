import express from "express";
import {
  allUsers,
  findUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:user_id", findUser);
router.get("/find/", allUsers);

export default router;
