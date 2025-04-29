const asyncHandler = require('express-async-handler');
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');
const mongoose = require('mongoose');

/**
 * @desc: Helper function to transform cart items for response
 * @param {Object} cart - The cart object from the database
 * @returns {Array} - Transformed cart items
 */
const transformCartItems = (cart) => {
    return cart.cartItems.map((item) => {
        const product = item.product || {};
        const selectedColor =
            product.colors?.find((c) => c.color === item.color) || {};

        return {
            _id: item._id,
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            color: item.color,
            stock: selectedColor.stock || 0,
            quantity: item.quantity,
        };
    });
};

/**
 * @desc: Get all cart items
 * @route: GET /api/cart
 * @access: Private (only for customers)
 */
const getCartItems = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const uuid = req.query.uuid;

    try {
        const cart = await Cart.findOne({ user: userId }).populate({
            path: 'cartItems.product',
            select: 'name price image colors rate',
        });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const transformedItems = transformCartItems(cart);

        res.status(200).json({
            _id: cart._id,
            user: cart.user,
            uuid: cart.uuid,
            items: transformedItems,
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
    const userId = req.user?._id;
    const uuid = req.query.uuid;

    // Input validation
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }

    if (isNaN(quantity) || quantity < 1) {
        return res.status(400).json({ message: 'Invalid quantity' });
    }

    if (!color) {
        return res.status(400).json({ message: 'Color is required' });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find or create cart
        let cart = await Cart.findOne({ user: userId }).populate(
            'cartItems.product'
        );
        if (!cart) {
            cart = new Cart({ user: userId, uuid, cartItems: [] });
        }

        // Check if item exists
        const existingItemIndex = cart.cartItems.findIndex(
            (item) =>
                item.product?._id.toString() === productId &&
                item.color === color
        );

        if (existingItemIndex !== -1) {
            cart.cartItems[existingItemIndex].quantity += quantity;
        } else {
            cart.cartItems.push({
                product: productId,
                color,
                quantity,
                dateAdded: dateAdded || new Date(),
            });
        }

        await cart.save();
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
        const errorResponse = {
            success: false,
            message: 'Internal server error',
        };
        if (process.env.NODE_ENV === 'development') {
            errorResponse.error = error.message;
        }
        res.status(500).json(errorResponse);
    }
});

/**
 * @desc: Update cart item quantity
 * @route: PUT /api/cart/:id
 * @access: Private (only for customers)
 */
const updateCartItem = asyncHandler(async (req, res) => {
    const { quantity } = req.body;
    const itemId = req.params.id;
    const userId = req.user?._id;

    // Validate item ID
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
        return res.status(400).json({ message: 'Invalid cart item ID' });
    }

    let quantityNumber;
    try {
        quantityNumber = parseInt(quantity, 10);
        if (isNaN(quantityNumber) || quantityNumber < 1) {
            throw new Error('Invalid quantity');
        }
    } catch (err) {
        return res.status(400).json({
            message: 'Quantity must be a positive integer',
            received: quantity,
            type: typeof quantity,
        });
    }

    try {
        // Find user's cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the specific cart item
        const cartItem = cart.cartItems.find(
            (item) => item._id.toString() === itemId
        );
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        // Get product info
        const product = await Product.findById(cartItem.product);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check color availability
        const selectedColor = product.colors.find(
            (c) => c.color === cartItem.color
        );
        if (!selectedColor) {
            return res.status(400).json({
                message: 'Selected color not available',
                availableColors: product.colors.map((c) => c.color),
            });
        }

        // Check stock availability
        if (quantityNumber > selectedColor.stock) {
            return res.status(400).json({
                message: `Only ${selectedColor.stock} items available in stock for this color`,
                maxQuantity: selectedColor.stock,
                currentQuantity: cartItem.quantity,
            });
        }

        // Update quantity
        const oldQuantity = cartItem.quantity;
        cartItem.quantity = quantityNumber;
        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Cart item quantity updated',
            item: {
                _id: cartItem._id,
                product: cartItem.product,
                oldQuantity,
                newQuantity: quantityNumber,
                maxQuantity: selectedColor.stock,
            },
        });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            ...(process.env.NODE_ENV === 'development' && {
                error: error.message,
                stack: error.stack,
            }),
        });
    }
});

/**
 * @desc: Delete cart item
 * @route: DELETE /api/cart/:id
 * @access: Private
 */
const deleteCartItem = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
        return res.status(400).json({ message: 'Invalid cart item ID' });
    }

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const initialLength = cart.cartItems.length;
        cart.cartItems = cart.cartItems.filter(
            (item) => !item._id.equals(itemId)
        );

        if (cart.cartItems.length === initialLength) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

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
