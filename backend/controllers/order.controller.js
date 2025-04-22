const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose'); // Add this line
const Order = require('../models/order.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');

/**
 * @desc: Get all orders for seller
 * @route: GET /api/seller/orders
 * @access: Private (seller only)
 */
const getOrdersForSeller = asyncHandler(async (req, res) => {
    try {
        // Verify user is seller
        if (!req.user || req.user.role !== 'seller') {
            return res.status(401).json({
                message: 'Unauthorized: Only sellers can view orders',
            });
        }

        // Get orders with populated user and product information
        const orders = await Order.find()
            .populate({
                path: 'user',
                select: 'name email',
            })
            .populate({
                path: 'orderItems.product',
                select: 'price',
            })
            .sort({ createdAt: -1 });

        const formattedOrders = orders.map((order) => {
            const totalPayment = order.orderItems.reduce((total, item) => {
                const itemPrice = item.product?.price || 0;
                return total + item.quantity * itemPrice;
            }, 0);

            const dateOrder = order.createdAt
                .toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                })
                .replace(/\//g, '-');

            return {
                _id: order._id,
                customerName: order.user.name,
                customerEmail: order.user.email,
                totalPayment: totalPayment.toFixed(2),
                dateOrder,
                paymentMethod: order.paymentMethod,
                orderStage: order.orderStage.slice(-1)[0]?.stage || 'New',
                isPaid: order.isPaid,
            };
        });

        res.status(200).json({ orders: formattedOrders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
});

/**
 * @desc: Get order details for seller by order id
 * @route: GET /api/seller/orders/:id
 * @access: Private (seller only)
 */
const getOrderDetailsForSeller = asyncHandler(async (req, res) => {
    try {
        // Verify user is seller
        if (!req.user || req.user.role !== 'seller') {
            return res.status(401).json({
                message: 'Unauthorized: Only sellers can view order details',
            });
        }

        const orderId = req.params.id;

        // Validate order ID format
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({
                message: 'Invalid order ID format',
            });
        }

        // Get order with populated user and product information
        const order = await Order.findById(orderId)
            .populate({
                path: 'user',
                select: 'name email',
            })
            .populate({
                path: 'orderItems.product',
                select: 'name price',
            });

        if (!order) {
            return res.status(404).json({
                message: 'Order not found',
            });
        }

        // Format order items
        const formattedOrderItems = order.orderItems.map((item) => {
            const itemPrice = item.product?.price || 0;
            return {
                itemId: item.product?._id,
                itemName: item.product?.name,
                itemColor: item.color,
                itemQuantity: item.quantity,
                itemAmount: (item.quantity * itemPrice).toFixed(2),
            };
        });

        // Calculate shipping subtotal (sum of all item amounts)
        const shippingSubtotal = order.orderItems.reduce((total, item) => {
            const itemPrice = item.product?.price || 0;
            return total + item.quantity * itemPrice;
        }, 0);

        // Format the response
        const response = {
            receiverName: order.receiverInfomation.receiverName,
            receiverPhone: order.receiverInfomation.receiverPhone,
            receiverAddress: order.receiverInfomation.receiverAddress,
            orderItems: formattedOrderItems,
            shippingSubtotal: shippingSubtotal.toFixed(2),
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
});

module.exports = {
    getOrdersForSeller,
    getOrderDetailsForSeller,
};
