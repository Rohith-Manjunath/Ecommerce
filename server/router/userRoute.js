const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middlewares/isAuthenticated");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);

module.exports = router;
