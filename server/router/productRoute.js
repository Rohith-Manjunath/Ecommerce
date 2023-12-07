const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  getSingleProduct,
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

module.exports = router;
