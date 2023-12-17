const express = require("express");
const {
  newOrder,
  myOrders,
  getSingleOrder,
  getAllOrders,
  udpateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const {
  isAuthenticatedUser,
  authorizedRoles,
} = require("../middlewares/isAuthenticated");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router.route("/orders/:id").get(isAuthenticatedUser, getSingleOrder);
router
  .route("/orders")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllOrders);
router
  .route("/orders/update/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), udpateOrder);
router
  .route("/orders/delete/:id")
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOrder);

module.exports = router;
