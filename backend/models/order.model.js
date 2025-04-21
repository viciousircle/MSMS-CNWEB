const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true, // Only logged-in users can place orders
        },
        orderItems: [
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
                    required: true,
                    min: 1, // At least 1 item per product
                },
            },
        ],
        shippingAddress: {
            receiverName: { type: String, required: true },
            receiverPhone: { type: String, required: true },
            receiverAddress: { type: String, required: true },
        },
        paymentMethod: {
            type: String,
            enum: ['COD', 'Credit Card', 'QR'],
            required: true,
        },
        orderStatus: {
            type: String,
            enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'Processing',
        },
        // TODO: NO need
        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        deliveredAt: {
            type: Date,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: null, // Users can rate after delivery
        },
        review: {
            type: String,
            trim: true,
            default: '', // Optional review text
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
