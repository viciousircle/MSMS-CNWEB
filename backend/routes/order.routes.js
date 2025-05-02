const express = require('express');
const router = express.Router();
const {
    getOrdersForCustomer,
    createOrder,
} = require('../controllers/order.controller');

const { protect, authorize } = require('../middleware/auth.middleware');

// //* Private Routes (Only Seller)
router
    .route('/')
    .get(protect, authorize('customer'), getOrdersForCustomer)
    .post(protect, authorize('customer'), createOrder);

module.exports = router;
