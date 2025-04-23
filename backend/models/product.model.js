const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
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
        colors: [
            {
                color: {
                    type: String,
                    required: [true, 'Color is required'],
                    trim: true,
                },
                stock: {
                    type: Number,
                    required: true,
                    default: 0,
                    min: 0,
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
