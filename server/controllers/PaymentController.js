const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const dotenv = require("dotenv");
dotenv.config({ path: "server/config/config.env" });
const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);

exports.Payment = catchAsyncErrors(async (req, res, nex) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
  });

  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, nex) => {
  res.status(200).json({
    stripeKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});
