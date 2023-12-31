const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Order = require("../models/OrderSchema");
const Product = require("../models/productShema");
const ErrorHandler = require("../utils/ErrorHandler");

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    phoneNo,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    phoneNo,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("This order is not found", 401));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });
  if (!order) {
    return next(new ErrorHandler("There are no orders for this user", 401));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find()
    .sort("-createdAt")
    .populate("user", "_id name");

  // Calculate totalAmount using reduce
  const totalAmount = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

exports.udpateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus === "Delivered") {
    return next(
      new ErrorHandler("Already you have delivered this product", 403)
    );
  }

  if (order.orderStatus === "Shipped") {
    order.orderItems.forEach(async (orderItem) => {
      await updateStock(orderItem.product, orderItem.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  await Order.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save();
}
