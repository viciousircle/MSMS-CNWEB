const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe,
    googleAuth,
} = require('../controllers/user.controller');

const { protect } = require('../middleware/auth.middleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/google', googleAuth);
router.get('/me', protect, getMe);

module.exports = router;
