const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        image: {
            type: String,
            required: true,
            trim: true, // Prevents unnecessary spaces
        },
        price: {
            type: Number,
            required: true,
            default: 0,
            min: 0, // Ensure non-negative prices
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0, // Prevent negative stock
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
