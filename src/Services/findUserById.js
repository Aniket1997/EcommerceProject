const mongoose = require("mongoose");
const createError = require("http-errors");

const findUserById = (Model, id, selectFields = {}) => {
    return Model.findById(id)
      .select(selectFields)
      .then(user => {
        if (!user) {
          throw createError(404, "User Not Found");
        }
        return user;
      })
      .catch(err => {
        if (err instanceof mongoose.Error) {
          throw createError(400, "Invalid User ID");
        }
        throw err;
      });
  };
  

module.exports = { findUserById };
