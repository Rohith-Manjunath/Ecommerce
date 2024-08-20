const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Product = require("../models/productShema");
const ApiFeatures = require("../utils/ApiFeatures");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require("cloudinary");

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

  for (let i = 0; i < product.imageURLs.length; i++) {
    let public_id = product.imageURLs[i].public_id;
    cloudinary.v2.uploader.destroy(public_id);
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.imageURLs = imagesLinks;

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

  for (let i = 0; i < product.imageURLs.length; i++) {
    let public_id = product.imageURLs[i].public_id;
    cloudinary.v2.uploader.destroy(public_id);
  }

  await Product.findByIdAndDelete(id);
  res.status(200).json({ success: true, message: "Product deleted" });
});

exports.getAllProductsAdmin = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();
  const productsCount = await Product.countDocuments(); // Correct count calculation

  if (!products) {
    return next(new ErrorHandler("Products not found", 404));
  }

  res.status(200).json({ success: true, products, productsCount });
});

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
      width: 700,
      height: 700,
      crop: "scale",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.imageURLs = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  if (!product) {
    return next(new ErrorHandler("Failed to create new product", 404));
  }
  res.status(200).json({ success: true, message: "Product created", product });
});

exports.createReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const { _id, name, avatar } = req.user;

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
      image: avatar.url,
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

exports.updateReview = catchAsyncErrors(async (req, res, next) => {
  const { productId, reviewId } = req.query;
  const { comment, rating } = req.body;
  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("The product is not available", 404));
  }

  const review = product.reviews.find((rev) => {
    return rev._id.toString() === reviewId.toString();
  });
  if (!review) {
    return next(
      new ErrorHandler(`This review does not belong to the product`, 404)
    );
  }

  review.comment = comment;
  review.rating = parseFloat(rating);

  await product.save();

  // Recalculate the overall product rating
  const totalRatings = product.reviews.reduce(
    (sum, rev) => sum + rev.rating,
    0
  );
  const overallRating = totalRatings / product.reviews.length;

  // Update the product's overall rating
  product.ratings = overallRating;

  await product.save();

  res.status(201).json({
    success: true,
    message: "Review upadted successfully",
  });
});
