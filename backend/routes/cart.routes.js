const express = require("express");
const router = express.Router();

const {
    getCartItems,
    addItemToCart,
    updateCartItem,
    deleteCartItem,
} = require("../controllers/cart.controller");

const { protect, authorize } = require("../middleware/auth.middleware");

router.route("/").get(protect, authorize("customer"), getCartItems);
router.route("/").post(protect, authorize("customer"), addItemToCart);
router.route("/:id").put(protect, authorize("customer"), updateCartItem);
router.route("/:id").delete(protect, authorize("customer"), deleteCartItem);

module.exports = router;
