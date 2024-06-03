const express = require("express");
const userRouter = express.Router();

const {
  checkInput,
  postUser,
  getUsers,
  getUserById,
  updateUserById,
  getProjectsByUserId,
} = require("../controllers/userController");

const { checkAuth } = require("../controllers/authController");

userRouter.get("/", getUsers);
userRouter.post("/", checkInput, postUser);
userRouter.get("/projects", checkAuth, getProjectsByUserId);
userRouter.get("/:id", checkAuth, getUserById);
userRouter.patch("/:id", checkAuth, updateUserById);

module.exports = userRouter;
