const { jwtToken } = require("../middlewares/jwtToken.js");
const User = require("../models/UserSchema.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const { sendEmail } = require("../router/sendEmail.js");
const crypto = require("crypto");

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

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("Email does not exist", 400));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/reset/${resetToken}`;

  const message = `Yout password reset token :- \n\n ${resetPasswordUrl} \n\n If You have not requested it then ,please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your Password Reset Token",
      message,
    });

    res.status(200).json({
      success: true,
      message: `A link to reset your password has been sent to ${user.email}. Please make sure to check your inbox and spam `,
    });
  } catch (e) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(e.message, 500));
  }
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("Invalid token or token has been expired", 400)
    );
  }

  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("Password do not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  jwtToken("Success", 200, user, res);
});
