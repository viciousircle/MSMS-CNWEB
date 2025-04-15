const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null, // Null if it's a guest
        },
        uuid: {
            type: String,
            default: null, // Used for guest carts
        },
        cartItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                color: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                    min: 1, // Prevent negative or zero quantities
                },
                dateAdded: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
