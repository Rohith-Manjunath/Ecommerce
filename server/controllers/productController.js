const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Product = require("../models/productShema");
const ApiFeatures = require("../utils/ApiFeatures");
const ErrorHandler = require("../utils/ErrorHandler");

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const productsPerPage = 6;
  const apifeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(productsPerPage);
  const products = await apifeatures.query;
  const productsCount = await Product.countDocuments(); // Correct count calculation

  if (!products) {
    return next(new ErrorHandler("Products not found", 404));
  }

  res
    .status(200)
    .json({ success: true, products, productsPerPage, productsCount });
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
exports.createReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const { _id, name } = req.user;

  try {
    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, err: "Product not found" });
    }

    const review = {
      name: name,
      rating: Number(rating),
      comment: String(comment),
      user: _id,
    };

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === _id.toString()
    );

    if (isReviewed) {
      product.reviews.find((rev) => {
        if (rev.user.toString() === _id.toString()) {
          (rev.comment = comment), (rev.rating = rating);
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    // Calculate average rating
    let totalAvg = 0;
    product.reviews.forEach((rev) => {
      totalAvg += rev.rating;
    });

    product.ratings = (totalAvg / product.reviews.length).toFixed(1);

    await product.save();
    res
      .status(200)
      .json({ success: true, message: "Review added successfully!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, err: "Internal Server Error" });
  }
});

exports.singleProductReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("No reviews found", 404));
  }
  res
    .status(200)
    .json({ success: true, message: "Successful", reviews: product.reviews });
});

exports.deleteProductReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  // Calculate average rating
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = reviews.length > 0 ? avg / reviews.length : 0;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    ratings,
    numOfReviews,
  });

  res.status(200).json({
    success: true,
    message: "Review deleted successfully!",
  });
});
