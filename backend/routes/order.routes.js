const express = require('express');
const router = express.Router();
const {
    getOrdersForSeller,
    getOrderDetailsForSeller,
    updateOrderStage,
} = require('../controllers/order.controller');

const { protect, authorize } = require('../middleware/auth.middleware');

// //* Public Routes

// //* Private Routes (Only Seller)
router.route('/').get(protect, authorize('seller'), getOrdersForSeller);
router
    .route('/:id')
    .get(protect, authorize('seller'), getOrderDetailsForSeller)
    .put(protect, authorize('seller'), updateOrderStage);

module.exports = router;
