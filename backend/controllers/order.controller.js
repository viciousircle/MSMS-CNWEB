const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
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
        if (!req.user || req.user.role !== 'seller') {
            return res.status(401).json({
                message: 'Unauthorized: Only sellers can view orders',
            });
        }

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
            receiverName: order.receiverInformation.receiverName,
            receiverPhone: order.receiverInformation.receiverPhone,
            receiverAddress: order.receiverInformation.receiverAddress,
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

/**
 * @desc: Update order stage for seller
 * @route: PUT /api/seller/orders/:id
 * @access: Private (seller only)
 */
const updateOrderStage = asyncHandler(async (req, res) => {
    try {
        // Verify user is seller
        if (!req.user || req.user.role !== 'seller') {
            return res.status(401).json({
                message: 'Unauthorized: Only sellers can update order stages',
            });
        }

        const orderId = req.params.id;
        const { stage } = req.body;

        // Validate order ID format
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({
                message: 'Invalid order ID format',
            });
        }

        // Validate stage input
        const validStages = [
            'New',
            'Prepare',
            'Shipping',
            'Shipped',
            'Cancelled',
            'Reject',
        ];
        if (!stage || !validStages.includes(stage)) {
            return res.status(400).json({
                message: 'Invalid stage value',
                validStages: validStages,
            });
        }

        // Find the order
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                message: 'Order not found',
            });
        }

        // Get current stage
        const currentStage = order.orderStage.slice(-1)[0]?.stage;

        // Check if the stage is being changed
        if (currentStage === stage) {
            return res.status(400).json({
                message: `Order is already in ${stage} stage`,
            });
        }

        // Add new stage to the orderStage array
        order.orderStage.push({
            stage: stage,
            date: new Date(),
        });

        // Special case: if stage is Cancelled or Reject, mark as not paid
        if (stage === 'Cancelled' || stage === 'Reject') {
            order.isPaid = false;
        }

        // Save the updated order
        const updatedOrder = await order.save();

        res.status(200).json({
            message: 'Order stage updated successfully',
            orderId: updatedOrder._id,
            previousStage: currentStage,
            newStage: stage,
            updatedAt: updatedOrder.updatedAt,
        });
    } catch (error) {
        console.error('Error updating order stage:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
});

/**
 * @desc: Get all orders for customer
 * @route: GET /api/orders/
 * @access: Private (customer only)
 */
const getOrdersForCustomer = asyncHandler(async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'customer') {
            return res.status(401).json({
                message: 'Unauthorized: Only customers can view their orders',
            });
        }

        const orders = await Order.find({ user: req.user._id })
            .populate({
                path: 'orderItems.product',
                select: 'name price images',
            })
            .sort({ createdAt: -1 });

        const formattedOrders = orders.map((order) => {
            const totalPayment = order.orderItems.reduce((total, item) => {
                const itemPrice = item.product?.price || 0;
                return total + item.quantity * itemPrice;
            }, 0);

            return {
                _id: order._id,
                orderItems: order.orderItems.map((item) => ({
                    productId: item.product?._id,
                    name: item.product?.name,
                    price: item.product?.price,
                    image: item.product?.images?.[0] || null, // Safe access to images array
                    color: item.color,
                    quantity: item.quantity,
                })),
                totalPayment: totalPayment.toFixed(2),
                createdAt: order.createdAt,
                currentStage: order.orderStage.slice(-1)[0]?.stage || 'New',
                isPaid: order.isPaid,
            };
        });

        res.status(200).json({ orders: formattedOrders });
    } catch (error) {
        console.error('Error fetching customer orders:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
});

/**
 * @desc: Create a new order
 * @route: POST /api/orders/
 * @access: Private (customer only)
 */
const createOrder = asyncHandler(async (req, res) => {
    try {
        console.log('DEBUG req.body:', req.body);
        if (!req.user || req.user.role !== 'customer') {
            return res.status(401).json({
                message: 'Unauthorized: Only customers can create orders',
            });
        }

        const { orderItems, receiverInformation, paymentMethod } = req.body;

        console.log('Received order creation request:', {
            user: req.user._id,
            body: req.body,
        });

        const missingFields = [];
        if (!orderItems) missingFields.push('orderItems');
        if (!receiverInformation) missingFields.push('receiverInformation');
        if (!paymentMethod) missingFields.push('paymentMethod');

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`,
                receivedFields: Object.keys(req.body),
                requiredFields: [
                    'orderItems',
                    'receiverInformation',
                    'paymentMethod',
                ],
            });
        }

        const missingReceiverFields = [];
        if (!receiverInformation.receiverName)
            missingReceiverFields.push('receiverName');
        if (!receiverInformation.receiverPhone)
            missingReceiverFields.push('receiverPhone');
        if (!receiverInformation.receiverAddress)
            missingReceiverFields.push('receiverAddress');

        if (missingReceiverFields.length > 0) {
            return res.status(400).json({
                message: `Missing receiver information: ${missingReceiverFields.join(
                    ', '
                )}`,
                receivedReceiverFields: Object.keys(receiverInformation),
            });
        }

        if (!Array.isArray(orderItems)) {
            return res.status(400).json({
                message: 'orderItems must be an array',
                receivedType: typeof orderItems,
            });
        }

        if (orderItems.length === 0) {
            return res.status(400).json({
                message: 'Order must contain at least one item',
            });
        }

        const invalidItems = [];
        orderItems.forEach((item, index) => {
            const itemErrors = [];
            if (!item.product) itemErrors.push('missing product ID');
            if (!item.quantity) itemErrors.push('missing quantity');
            if (item.quantity && item.quantity <= 0)
                itemErrors.push('quantity must be greater than 0');
            if (itemErrors.length > 0) {
                invalidItems.push({
                    index,
                    errors: itemErrors,
                });
            }
        });

        if (invalidItems.length > 0) {
            return res.status(400).json({
                message: 'Invalid order items',
                invalidItems,
            });
        }

        const validPaymentMethods = ['COD', 'QR'];
        if (!validPaymentMethods.includes(paymentMethod)) {
            return res.status(400).json({
                message: 'Invalid payment method',
                receivedMethod: paymentMethod,
                validMethods: validPaymentMethods,
            });
        }

        // 8. Create Order Document
        const order = new Order({
            user: req.user._id,
            orderItems,
            receiverInformation, // Fixed spelling to match validation
            paymentMethod,
            orderStage: [{ stage: 'New', date: new Date() }],
            isPaid: paymentMethod !== 'COD', // Set to true for non-COD payments
        });

        // 9. Save and Populate Order
        const createdOrder = await order.save();
        const populatedOrder = await Order.populate(createdOrder, {
            path: 'orderItems.product',
            select: 'name price images stockCount',
            model: 'Product', // Explicitly specify the model
        });

        // 10. Calculate Total Payment
        const totalPayment = orderItems.reduce((total, item) => {
            const product = populatedOrder.orderItems.find(
                (i) => i._id.toString() === item._id?.toString()
            )?.product;
            return total + (product?.price || 0) * item.quantity;
        }, 0);

        // 11. Send Response
        res.status(201).json({
            message: 'Order created successfully',
            order: {
                ...populatedOrder.toObject(),
                totalPayment: totalPayment.toFixed(2),
            },
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            message: 'Failed to create order',
            error:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : undefined,
            stack:
                process.env.NODE_ENV === 'development'
                    ? error.stack
                    : undefined,
        });
    }
});

/**
 * @desc: Cancel order
 * @route: PUT /api/orders/:id/cancel
 * @access: Private (customer only)
 */
const cancelOrder = asyncHandler(async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'customer') {
            return res.status(401).json({
                message: 'Unauthorized: Only customers can cancel orders',
            });
        }

        const orderId = req.params.id;

        // Validate order ID format
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({
                message: 'Invalid order ID format',
            });
        }

        // Find the order and ensure it belongs to the user
        const order = await Order.findOne({
            _id: orderId,
            user: req.user._id,
        });

        if (!order) {
            return res.status(404).json({
                message: 'Order not found or not owned by user',
            });
        }

        // Check if order is already cancelled
        const currentStage = order.orderStage.slice(-1)[0]?.stage;
        if (currentStage === 'Cancelled') {
            return res.status(400).json({
                message: 'Order is already cancelled',
            });
        }

        // Check if order can be cancelled (only in New or Prepare stages)
        const cancellableStages = ['New', 'Prepare'];
        if (!cancellableStages.includes(currentStage)) {
            return res.status(400).json({
                message: `Order cannot be cancelled in ${currentStage} stage`,
                cancellableStages,
            });
        }

        // Update order stage to Cancelled
        order.orderStage.push({
            stage: 'Cancelled',
            date: new Date(),
        });

        // If payment was made, should initiate refund process here
        order.isPaid = false;

        const updatedOrder = await order.save();

        res.status(200).json({
            message: 'Order cancelled successfully',
            order: {
                _id: updatedOrder._id,
                currentStage: 'Cancelled',
                cancelledAt: updatedOrder.orderStage.slice(-1)[0].date,
            },
        });
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
});

// Update module.exports at the bottom to include the new functions
module.exports = {
    getOrdersForSeller,
    getOrderDetailsForSeller,
    updateOrderStage,
    getOrdersForCustomer,
    createOrder,
    cancelOrder,
};
