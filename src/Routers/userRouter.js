const express = require("express");
const { userData } = require("../Models/userData");
const { getUserData } = require("../Controllers/userController");

const userRouter = express.Router();

userRouter.get('/', getUserData);

module.exports = userRouter;