const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProductDetails,
} = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();
router.route("/").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, createProduct);
  router.route("/product/:id").get(getProductDetails);

module.exports = router;
