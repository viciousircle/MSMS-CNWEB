const express = require('express');
const router = express.Router();
const { getOrdersForSeller } = require('../controllers/order.controller');

const { protect, authorize } = require('../middleware/auth.middleware');
const { ro } = require('@faker-js/faker');

// //* Public Routes

// //* Private Routes (Only Seller)
router.route('/').get(protect, authorize('seller'), getOrdersForSeller);

module.exports = router;
