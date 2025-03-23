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
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
        rate: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
            max: 5,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
