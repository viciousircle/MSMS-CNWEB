const asyncHandler = require('express-async-handler');
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');
const mongoose = require('mongoose');

/**
 * @desc: Get all cart items
 * @route: GET /api/cart
 * @access: Private (only for customers)
 */
const getCartItems = asyncHandler(async (req, res) => {
    try {
        const userId = req.user ? req.user._id : null;
        const uuid = req.query.uuid || null;

        const cart = await Cart.findOne({
            $or: [{ user: userId }, { uuid: uuid }],
        }).populate('cartItems.product');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * @desc: Add item to cart
 * @route: POST /api/cart
 * @access: Private (only for customers)
 */
const addItemToCart = asyncHandler(async (req, res) => {
    const { productId, color, quantity: quantityString, dateAdded } = req.body;
    const quantity = Number(quantityString);
    const userId = req.user?._id || null;
    const uuid = req.query.uuid || null;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }

    // if (typeof quantity !== 'number' || quantity < 1) {
    //     return res.status(400).json({ message: 'Invalid quantity' });
    // }

    if (!quantityString || isNaN(quantity) || quantity < 1) {
        return res.status(400).json({ message: 'Invalid quantity' });
    }

    if (!color) {
        return res.status(400).json({ message: 'Color is required' });
    }

    try {
        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find or create cart
        let cart = await Cart.findOne({
            $or: [{ user: userId }, { uuid: uuid }],
        }).populate('cartItems.product');

        if (!cart) {
            cart = new Cart({
                user: userId,
                uuid: uuid,
                cartItems: [],
            });
        }

        // Check if item already exists in cart with same color
        const existingItemIndex = cart.cartItems.findIndex(
            (item) =>
                item.product.toString() === productId && item.color === color
        );

        if (existingItemIndex !== -1) {
            // Update quantity if item exists
            cart.cartItems[existingItemIndex].quantity += quantity;
        } else {
            // Add new item if it doesn't exist
            cart.cartItems.push({
                product: productId,
                color,
                quantity,
                dateAdded: dateAdded || new Date(),
            });
        }

        // Save and return updated cart
        await cart.save();

        // Populate product details in response
        const populatedCart = await Cart.findById(cart._id).populate(
            'cartItems.product'
        );

        res.status(200).json({
            success: true,
            message: 'Item added to cart',
            cart: populatedCart,
        });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : undefined,
        });
    }
});

/**
 * @desc: Update cart item quantity
 * @route: PUT /api/cart/:id
 * @access: Private
 */
const updateCartItem = asyncHandler(async (req, res) => {
    try {
        const { quantity } = req.body;
        const userId = req.user ? req.user._id : null;
        const uuid = req.body.uuid || null;

        if (typeof quantity !== 'number' || quantity < 1) {
            return res.status(400).json({ message: 'Invalid quantity' });
        }

        let cart = await Cart.findOne({ $or: [{ user: userId }, { uuid }] });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartItem = cart.cartItems.find(
            (item) => item._id.equals(req.params.id) // FIXED: Changed `req.params.itemId` to `req.params.id`
        );

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        cartItem.quantity = quantity;
        await cart.save();

        res.status(200).json({ message: 'Cart item updated', cart });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * @desc: Delete cart item
 * @route: DELETE /api/cart/:id
 * @access: Private
 */
const deleteCartItem = asyncHandler(async (req, res) => {
    try {
        const userId = req.user ? req.user._id : null;
        const uuid = req.query.uuid || null;

        let cart = await Cart.findOne({ $or: [{ user: userId }, { uuid }] });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartItemIndex = cart.cartItems.findIndex((item) =>
            item._id.equals(req.params.id)
        );

        if (cartItemIndex === -1) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        cart.cartItems.splice(cartItemIndex, 1);
        await cart.save();

        res.status(200).json({ message: 'Cart item removed', cart });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = {
    getCartItems,
    addItemToCart,
    updateCartItem,
    deleteCartItem,
};
