const express = require("express");
const router = express.Router();
const {
    getProducts,
    setProduct,
    updateProduct,
    deleteProducts,
} = require("../controllers/product.controller");

router.route("/").get(getProducts).post(setProduct);
router.route("/:id").put(updateProduct).delete(deleteProducts);

module.exports = router;
