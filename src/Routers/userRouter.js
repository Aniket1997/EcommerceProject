const express = require("express");
const { userData } = require("../Models/userModel");
const { getUserData, getUserById ,deleteUserById} = require("../Controllers/userController");

const userRouter = express.Router();

userRouter.get('/', getUserData);
userRouter.get('/:id', getUserById);
userRouter.delete('/:id', deleteUserById);

module.exports = userRouter;