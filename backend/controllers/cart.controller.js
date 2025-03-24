const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");
const Cart = require("../models/cart.model");
const mongoose = require("mongoose");

/**
 * @desc: Get all cart items
 * @route: GET /api/cart
 * @access: Private (only authenticated users can access)
 */
const getCartItems = asyncHandler(async (req, res) => {
    try {
        const userId = req.user ? req.user._id : null;
        const uuid = req.query.uuid || null;

        if (!userId && !uuid) {
            return res.status(400).json({
                message: "User ID or UUID is required",
            });
        }

        const cart = await Cart.findOne({
            $or: [{ user: userId }, { uuid: uuid }],
        }).populate("cartItems.product");

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.log("Database error");
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * @desc: Add item to cart
 * @route: POST /api/cart
 * @access: Private (only authenticated users can access)
 */
const addItemToCart = asyncHandler(async (req, res) => {
    try {
    } catch (error) {}
});

/**
 * @desc: Update cart item
 * @route: PUT /api/cart/:id
 * @access: Private (only authenticated users can access)
 */

/**
 * @desc: Delete cart item
 * @route: DELETE /api/cart/:id
 * @access: Private (only authenticated users can access)
 */

module.exports = { getCartItems };
