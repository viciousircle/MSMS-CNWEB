const asyncHandler = require("express-async-handler");

const Product = require("../models/product.model");

// @desc: Get all products
// @route: GET /api/products
// @access: Private
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();

    res.status(200).json(products);
});

// @desc: Set a product
// @route: POST /api/products
// @access: Private
const setProduct = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({ error: "Please provide a text" });
    }

    res.status(200).json({ message: "Set data successfully" });
});

// @desc: Update a product
// @route: PUT /api/products/:id
// @access: Private
const updateProduct = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: `Updated data with id ${req.params.id}`,
    });
});

// @desc: Delete a product
// @route: DELETE /api/products/:id
// @access: Private
const deleteProducts = asyncHandler(async (req, res) => {
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
