const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe,
    googleAuth,
} = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');
const validate = require('../middleware/validation.middleware');

// Public routes with validation
router.post('/', validate.register, registerUser);
router.post('/login', validate.login, loginUser);
router.post('/google', googleAuth);

// Protected routes
router.get('/me', protect, getMe);

module.exports = router;
