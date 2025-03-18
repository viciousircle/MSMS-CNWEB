const asyncHandler = require("express-async-handler");

const Product = require("../models/product.model");
const User = require("../models/user.model");

// @desc: Get all products
// @route: GET /api/products
// @access: Private
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({
        user: req.user.id,
    });

    res.status(200).json(products);
});

// @desc: Set a product
// @route: POST /api/products
// @access: Private
const setProduct = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ error: "Please provide a name" });
    }

    const product = await Product.create({
        name: req.body.name,
        user: req.user.id,
    });

    res.status(200).json(product);
});

// @desc: Update a product
// @route: PUT /api/products/:id
// @access: Private
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    const user = await User.findById(req.user.id);

    // - Check for user
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    // - Make sure user is product owner
    if (product.user.toString() !== req.user.id) {
        return res.status(401).json({ error: "User not authorized" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedProduct);
});

// @desc: Delete a product
// @route: DELETE /api/products/:id
// @access: Private
const deleteProducts = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    const user = await User.findById(req.user.id);

    // - Check for user
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    // - Make sure user is product owner
    if (product.user.toString() !== req.user.id) {
        return res.status(401).json({ error: "User not authorized" });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: `Deleted data with id ${req.params.id}`,
    });
});

module.exports = {
    getProducts,
    setProduct,
    updateProduct,
    deleteProducts,
};
