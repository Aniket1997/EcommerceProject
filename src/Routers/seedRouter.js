const express = require("express");
const seedRouter = express.Router();
const {seedUser} = require('../Controllers/seedController');

seedRouter.get("/users",seedUser);

module.exports = {seedRouter};