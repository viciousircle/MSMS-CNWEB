const express = require("express");
const router = express.Router();

const { getCartItems } = require("../controllers/cart.controller");

const { protect, authorize } = require("../middleware/auth.middleware");

router.route("/").get(getCartItems);

module.exports = router;
