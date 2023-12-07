const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please provide product name"] },
  description: {
    type: String,
    required: [false, "Please provide product description"],
  },
  price: {
    type: Number,
    required: [true, "Please provide product price"],
    maxLength: [8, "Price cannot exceed 8 figures"],
  },
  category: {
    type: String,
    required: [true, "Please provide product category"],
  },
  imageURLs: [
    {
      public_id: {
        type: String,
        required: [true, "Please provide a valid cloudinary url for the image"],
      },
    },
    {
      url: { type: String, required: [true, "Please provide image url"] },
    },
  ],
  ratings: {
    type: Number,
    default: 0,
    required: [true, "Please provide rating"],
  },
  stock: {
    type: Number,
    required: [true, "Please provide stock count"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    deafult: Date.now,
  },
});

module.exports = mongoose.model("Products", productSchema);
