const User = require("../Models/userModel");
const createError = require("http-errors");
const { successResponseHandler } = require("../helper/responseHandler");
const { default: mongoose } = require("mongoose");
const { findUserById } = require("../Services/findUserById");
const { activationkey, smtpHost } = require("../secret");
const { jsonWebToken } = require("../helper/jsonWebToken");
const { sendEmail } = require("../helper/verificationEmail");
const jwt = require('jsonwebtoken');
const getUserData = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const searchRegxp = new RegExp(".*" + search + ".*", "i");
    const filter = {
      //isAdmin: { $ne: true },
      $or: [
        { username: { $regex: searchRegxp } },
        { email: { $regex: searchRegxp } },
      ],
    };
    const options = { password: 0 };
    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await User.find(filter).countDocuments();
    if (!users) throw createError(404, "User Not find");
    // Send the users as response
    return successResponseHandler(res, {
      status: 200,
      message: "Users fetched successfully",
      payload: {
        users: users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (err) {
    // Forward error to error handling middleware
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await findUserById(User, id, { password: 0 }); // Exclude password field
    return successResponseHandler(res, {
      status: 200,
      message: "User fetched successfully",
      payload: {
        user: user,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(User, id, { password: 0 });
    if (!user) throw createError(404, "User Not found");
    // Send success response
    return successResponseHandler(res, {
      status: 200,
      message: "User deleted successfully",
      payload: {
        user: user,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteAllUsers = async (req, res, next) => {
  try {
    await User.deleteMany({});
    // Send success response
    return successResponseHandler(res, {
      status: 200,
      message: "All users deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

const registerUserData = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body); // Log the request body

    const { username, email, password, address, phoneNumber } = req.body;

    console.log("username:", username);
    console.log("email:", email);
    console.log("password:", password);
    console.log("address:", address);
    console.log("phoneNumber:", phoneNumber);

    const userExists = await User.exists({ email: email });
    if (userExists) throw createError(409, "User already exists");

    const token = jsonWebToken(
      { username, email, password, address, phoneNumber },
      activationkey,
      "10m"
    );

    console.log("Generated Token:", token); // Log the generated token

    const verificationEmail = {
      email,
      subject: "Ecommerce account activation|Please verify your email",
      html: `<h1>Hi ${username}</h1><p>Please click on the link below to verify your email</p><a href="${smtpHost}/api/user/${token}">Activate</a>`,
    };

    try {
      await sendEmail(verificationEmail);
    } catch (emailError) {
      next(createError(500, "Failed to send verification email"));
    }

    return successResponseHandler(res, {
      status: 200,
      message: `Please check your email ${email}`,
      payload: {
        user: token,
      },
    });
  } catch (err) {
    next(err);
  }
};

const activateUserAccount = async (req, res, next) => {
    try{
      const token = req.body.token;
      if(!token) throw create(404,'Token not fount');
      const decodedData = jwt.verify(token,activationkey);
      if(!decodedData) throw createError(404,'User was not verified');
      console.log(decodedData);

      await User.create(decodedData);

      return successResponseHandler(res, {
        status: 201,
        message: `User is registered successfully`,
        
      });
    }
    catch(err)
    {
      next(err);
    }
    
  
};

module.exports = {
  getUserData,
  getUserById,
  deleteUserById,
  deleteAllUsers,
  registerUserData,
  activateUserAccount,
};
