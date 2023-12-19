const express = require("express");
const router = express.Router();
const {
  Payment,
  sendStripeApiKey,
} = require("../controllers/PaymentController");
const { isAuthenticatedUser } = require("../middlewares/isAuthenticated");

router.route("/payment/checkout").post(isAuthenticatedUser, Payment);
router.route("/getStripe").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
