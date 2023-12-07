const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Product = require("../models/productShema");
const ErrorHandler = require("../utils/ErrorHandler");

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  if (!products) {
    return next(new ErrorHandler("Products not found", 404));
  }

  res.status(200).json({ success: true, products });
});

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ success: true, product });
});

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await Product.findByIdAndUpdate(id, req.body);
  res
    .status(200)
    .json({ success: true, message: "Product updated successfully" });
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await Product.findByIdAndDelete(id);
  res.status(200).json({ success: true, message: "Product deleted" });
});

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  if (!product) {
    return next(new ErrorHandler("Failed to create new product", 404));
  }
  res.status(200).json({ success: true, message: "Product created", product });
});
