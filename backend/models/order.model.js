const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
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
                    min: 1,
                },
            },
        ],
        receiverInfomation: {
            receiverName: { type: String, required: true },
            receiverPhone: { type: String, required: true },
            receiverAddress: { type: String, required: true },
        },
        paymentMethod: {
            type: String,
            enum: ['COD', 'QR'],
            required: true,
        },
        orderStage: [
            {
                stage: {
                    type: String,
                    enum: [
                        'New',
                        'Prepare',
                        'Shipping',
                        'Shipped',
                        'Cancelled',
                        'Reject',
                    ],
                    default: 'New',
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        isPaid: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
