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
                select: 'name price image',
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
                itemImage: item.product?.image,
                itemColor: item.color,
                itemQuantity: item.quantity,
                itemPrice: itemPrice.toFixed(2),
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
            orderId: order._id,
            customerInfo: {
                name: order.user.name,
                email: order.user.email,
            },
            receiverInfo: {
                name: order.receiverInformation.receiverName,
                phone: order.receiverInformation.receiverPhone,
                address: order.receiverInformation.receiverAddress,
            },
            orderItems: formattedOrderItems,
            orderSummary: {
                shippingSubtotal: shippingSubtotal.toFixed(2),
                paymentMethod: order.paymentMethod,
                isPaid: order.isPaid,
                currentStage: order.orderStage.slice(-1)[0]?.stage || 'New',
                orderDate: order.createdAt,
                lastUpdated: order.updatedAt,
            },
            orderHistory: order.orderStage.map((stage) => ({
                stage: stage.stage,
                date: stage.date,
            })),
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

        // Check if order is cancelled or rejected
        if (currentStage === 'Cancelled' || currentStage === 'Reject') {
            return res.status(400).json({
                message: 'Cannot change stage for cancelled or rejected orders',
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

        await order.save();

        res.status(200).json({
            message: 'Order stage updated successfully',
            order: {
                _id: order._id,
                currentStage: stage,
                updatedAt: order.orderStage.slice(-1)[0].date,
            },
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
                select: 'name price image',
            })
            .sort({ createdAt: -1 });

        const formattedOrders = orders.map((order) => {
            const totalPayment = order.orderItems.reduce((total, item) => {
                const itemPrice = item.product?.price || 0;
                return total + item.quantity * itemPrice;
            }, 0);

            return {
                _id: order._id,
                orderItems: order.orderItems.map((item) => {
                    const product = item.product || {};
                    return {
                        _id: item._id,
                        productId: product._id,
                        name: product.name || null,
                        price: product.price || 0,
                        image: product.image || null,
                        color: item.color,
                        quantity: item.quantity,
                    };
                }),
                receiverName: order.receiverInformation.receiverName,
                receiverPhone: order.receiverInformation.receiverPhone,
                receiverAddress: order.receiverInformation.receiverAddress,
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

        // Validate required fields
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

        // Validate receiver information
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

        // Validate orderItems
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

        // Transform orderItems to match schema
        const transformedOrderItems = orderItems.map((item) => ({
            product: item.product,
            color: item.color,
            quantity: item.quantity,
        }));

        // Validate transformed items
        const invalidItems = [];
        transformedOrderItems.forEach((item, index) => {
            const itemErrors = [];
            if (!item.product) itemErrors.push('missing product ID');
            if (!item.color) itemErrors.push('missing color');
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

        // Check and update product stock
        for (const item of transformedOrderItems) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(400).json({
                    message: `Product not found: ${item.product}`,
                });
            }

            // Find the color variant
            const colorVariant = product.colors.find(
                (c) => c.color === item.color
            );
            if (!colorVariant) {
                return res.status(400).json({
                    message: `Color variant not found for product ${product.name}: ${item.color}`,
                });
            }

            // Check if enough stock is available
            if (colorVariant.stock < item.quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for product ${product.name} in color ${item.color}. Available: ${colorVariant.stock}, Requested: ${item.quantity}`,
                });
            }

            // Update stock
            colorVariant.stock -= item.quantity;
            await product.save();
        }

        const validPaymentMethods = ['COD', 'QR'];
        if (!validPaymentMethods.includes(paymentMethod)) {
            return res.status(400).json({
                message: 'Invalid payment method',
                receivedMethod: paymentMethod,
                validMethods: validPaymentMethods,
            });
        }

        // Create Order Document with transformed orderItems
        const order = new Order({
            user: req.user._id,
            orderItems: transformedOrderItems,
            receiverInformation,
            paymentMethod,
            orderStage: [{ stage: 'New', date: new Date() }],
            isPaid: paymentMethod !== 'COD',
        });

        // Save and Populate Order
        const createdOrder = await order.save();
        const populatedOrder = await Order.populate(createdOrder, {
            path: 'orderItems.product',
            select: 'name price image',
            model: 'Product',
        });

        // Calculate Total Payment
        const totalPayment = populatedOrder.orderItems.reduce((total, item) => {
            const itemPrice = item.product?.price || 0;
            return total + item.quantity * itemPrice;
        }, 0);

        // Send Response
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

/**
 * @desc: Update order payment status for seller
 * @route: PUT /api/seller/orders/:id/payment
 * @access: Private (seller only)
 */
const updateOrderPaymentStatus = asyncHandler(async (req, res) => {
    try {
        // Verify user is seller
        if (!req.user || req.user.role !== 'seller') {
            return res.status(401).json({
                message: 'Unauthorized: Only sellers can update payment status',
            });
        }

        const orderId = req.params.id;
        const { isPaid } = req.body;

        // Validate order ID format
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({
                message: 'Invalid order ID format',
            });
        }

        // Validate isPaid input
        if (typeof isPaid !== 'boolean') {
            return res.status(400).json({
                message: 'Invalid payment status value',
            });
        }

        // Find the order
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                message: 'Order not found',
            });
        }

        // Check if order is cancelled or rejected
        const currentStage = order.orderStage.slice(-1)[0]?.stage;
        if (currentStage === 'Cancelled' || currentStage === 'Reject') {
            return res.status(400).json({
                message:
                    'Cannot update payment status for cancelled or rejected orders',
            });
        }

        // Update payment status
        order.isPaid = isPaid;
        await order.save();

        res.status(200).json({
            message: 'Payment status updated successfully',
            order: {
                _id: order._id,
                isPaid: order.isPaid,
                updatedAt: order.updatedAt,
            },
        });
    } catch (error) {
        console.error('Error updating payment status:', error);
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
    updateOrderPaymentStatus,
    getOrdersForCustomer,
    createOrder,
    cancelOrder,
};
