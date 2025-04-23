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
            user: userId,
        }).populate({
            path: 'cartItems.product',
            select: 'name price image colors rate',
        });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Transform the cart items to match the expected format
        const transformedCartItems = cart.cartItems.map((item) => {
            const product = item.product || {};
            const selectedColor =
                product.colors?.find((c) => c.color === item.color) || {};

            return {
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                color: item.color,
                stock: selectedColor.stock || 0,
                quantity: item.quantity,
            };
        });

        res.status(200).json({
            _id: cart._id,
            user: cart.user,
            uuid: cart.uuid,
            items: transformedCartItems,
            createdAt: cart.createdAt,
            updatedAt: cart.updatedAt,
        });
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
            user: userId,
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
                item.product &&
                item.product._id.toString() === productId.toString() &&
                item.color === color
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
 * @route:
 * @access: Private
 */
const updateCartItem = asyncHandler(async (req, res) => {});

/**
 * @desc: Delete cart item
 * @route: DELETE /api/cart/:id
 * @access: Private
 */
const deleteCartItem = asyncHandler(async (req, res) => {
    try {
        const userId = req.user ? req.user._id : null;
        const itemIdToDelete = req.params.id;

        console.log('Looking for item ID:', itemIdToDelete); // Add this line

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        console.log(
            'Cart items:',
            cart.cartItems.map((item) => item._id.toString())
        ); // Add this line

        const cartItemIndex = cart.cartItems.findIndex((item) => {
            console.log(
                `Comparing ${item._id.toString()} with ${itemIdToDelete}`
            ); // Add this line
            return item._id.equals(itemIdToDelete);
        });

        if (cartItemIndex === -1) {
            console.log('Item not found in cart'); // Add this line
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
