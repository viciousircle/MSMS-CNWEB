const express = require("express");
const router = express.Router();
const {
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../controllers/product.controller");

const { protect, authorize } = require("../middleware/auth.middleware");

//* Public Routes
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

//* Private Routes (Only Seller)
router
    .route("/:id")
    .put(protect, authorize("seller"), updateProduct)
    .delete(protect, authorize("seller"), deleteProduct);

module.exports = router;
