const { jwtToken } = require("../middlewares/jwtToken.js");
const User = require("../models/UserSchema.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const newuser = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample id",
      url: "sample url",
    },
  });

  jwtToken("Registration successful", 200, newuser, res);
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("User not found", 401));
  }
  //checking the password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  jwtToken("Login successful", 200, user, res);
});

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ success: true, message: "Logged out" });
});

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("No such user", 404));
  }
  res.status(200).json({ success: true, user });
});
