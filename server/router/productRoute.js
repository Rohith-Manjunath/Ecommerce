const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createReview,
  singleProductReview,
  deleteProductReview,
  getAllProductsAdmin,
  updateReview,
} = require("../controllers/productController");
const {
  authorizedRoles,
  isAuthenticatedUser,
} = require("../middlewares/isAuthenticated");
const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);
router
  .route("/product/:id")
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
  .get(isAuthenticatedUser, getSingleProduct);

router.route("/review").put(isAuthenticatedUser, createReview);

router
  .route("/reviews")
  .get(isAuthenticatedUser, singleProductReview)
  .delete(isAuthenticatedUser, deleteProductReview)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateReview);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllProductsAdmin);
module.exports = router;
