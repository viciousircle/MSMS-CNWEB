const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true, // Only logged-in users can place orders
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1, // At least 1 item per product
                },
                price: {
                    type: Number,
                    required: true,
                    min: 0, // Ensure no negative pricing
                },
            },
        ],
        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        paymentMethod: {
            type: String,
            enum: ["COD", "Credit Card", "PayPal"],
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed"],
            default: "Pending",
        },
        orderStatus: {
            type: String,
            enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Processing",
        },
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
            default: "", // Optional review text
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
