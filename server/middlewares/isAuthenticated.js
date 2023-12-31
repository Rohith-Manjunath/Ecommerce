const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(decodedData.id);
  req.user = user;
  next();
});

exports.authorizedRoles = (...roles) => {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler("You are not authorized to perform this action", 403)
      );
    }
    next();
  };
};
