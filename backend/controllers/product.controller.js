const asyncHandler = require('express-async-handler');
const Product = require('../models/product.model');
const mongoose = require('mongoose');

/**
 * @desc: Get all products
 * @route: GET /api/products
 * @access: Public
 */
const getProducts = asyncHandler(async (req, res, next) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log('Database error');
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * @desc: Get a product by ID
 * @route: GET /api/products/:id
 * @access: Public
 */
const getProductById = asyncHandler(async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: `Product with id ${req.params.id} not found!`,
            });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Database error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * @desc: Update product details
 * @route: PUT /api/products/:id
 * @access: Private (Only Seller)
 */
const updateProduct = asyncHandler(async (req, res) => {
    try {
        // if (!req.user || req.user.role !== "seller") {
        //     return res.status(401).json({
        //         message: "Unauthorized: Only sellers can update products",
        //     });
        // }

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found!' });
        }

        const { name, image, price, colors, rate } = req.body;
        let updated = false;

        // Update basic fields
        if (name && name !== product.name) {
            product.name = name;
            updated = true;
        }
        if (image && image !== product.image) {
            product.image = image;
            updated = true;
        }
        if (
            typeof price === 'number' &&
            price >= 0 &&
            price !== product.price
        ) {
            product.price = price;
            updated = true;
        }
        if (
            typeof rate === 'number' &&
            rate >= 0 &&
            rate <= 5 &&
            rate !== product.rate
        ) {
            product.rate = rate;
            updated = true;
        }

        // Update colors array if provided
        if (colors && Array.isArray(colors)) {
            // Validate each color object
            for (const colorObj of colors) {
                if (
                    !colorObj.color ||
                    typeof colorObj.stock !== 'number' ||
                    colorObj.stock < 0
                ) {
                    return res
                        .status(400)
                        .json({ message: 'Invalid color data structure' });
                }
            }

            product.colors = colors;
            updated = true;
        }

        if (!updated) {
            return res.status(400).json({
                message: 'No changes detected. Product remains the same!',
            });
        }

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Database error:', error.message);
        res.status(500).json({
            message: 'Internal server error.',
        });
    }
});

/**
 * @desc: Delete a product
 * @route: DELETE /api/products/:id
 * @access: Private (Only Seller)
 */
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found!' });
        }

        await product.deleteOne();

        res.status(200).json({
            message: `Product with id ${req.params.id} deleted successfully!`,
            deletedProduct: product,
        });
    } catch (error) {
        console.error('Database error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = {
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
