const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const {
  isAuthenticatedUser,
  authorizedRoles,
} = require("../middlewares/isAuthenticated");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/update/password").put(isAuthenticatedUser, updatePassword);
router.route("/update/profile").put(isAuthenticatedUser, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getSingleUser)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateUser);

module.exports = router;
