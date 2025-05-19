const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    updateUserStatus,
    updateUserRole,
    deleteUser,
} = require('../controllers/admin.controller');

const { protect, authorize } = require('../middleware/auth.middleware');

// All routes are protected and require admin role
router.use(protect, authorize('admin'));

// User management routes
router.get('/users', getAllUsers);
router.put('/users/:id/status', updateUserStatus);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

module.exports = router;
