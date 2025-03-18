const express = require("express");
const router = express.Router();
const {
    getProducts,
    setProduct,
    updateProduct,
    deleteProducts,
} = require("../controllers/product.controller");

const { protect } = require("../middleware/auth.middleware");

router.route("/").get(protect, getProducts).post(protect, setProduct);
router
    .route("/:id")
    .put(protect, updateProduct)
    .delete(protect, deleteProducts);

module.exports = router;
