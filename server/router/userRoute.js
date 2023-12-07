const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middlewares/isAuthenticated");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/forgot").post(isAuthenticatedUser, forgotPassword);
router.route("/password/reset/:token").put(isAuthenticatedUser, resetPassword);

module.exports = router;
