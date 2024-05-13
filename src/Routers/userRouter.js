const express = require("express");
const { userData } = require("../Models/userModel");
const { getUserData, getUserById ,deleteUserById,registerUserData,activateUserAccount} = require("../Controllers/userController");

const userRouter = express.Router();

userRouter.post('/registerUser', registerUserData);
userRouter.post('/verifyEmail',activateUserAccount);
userRouter.get('/', getUserData);
userRouter.get('/:id', getUserById);
userRouter.delete('/:id', deleteUserById);

module.exports = userRouter;