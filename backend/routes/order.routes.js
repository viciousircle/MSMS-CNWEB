const express = require('express');
const router = express.Router();
const {
    getOrdersForCustomer,
    createOrder,
    cancelOrder,
} = require('../controllers/order.controller');

const { protect, authorize } = require('../middleware/auth.middleware');

router
    .route('/')
    .get(protect, authorize('customer'), getOrdersForCustomer)
    .post(protect, authorize('customer'), createOrder);
router.route('/:id/cancel').put(protect, authorize('customer'), cancelOrder);

module.exports = router;
