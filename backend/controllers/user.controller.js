const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * @description Generate JWT token
 * @param {string} id - User ID
 * @param {string} role - User role
 * @returns {string} JWT
 */
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

/**
 * @desc: Authenticate with Google
 * @route: POST /api/users/google
 * @access: Public
 */
const googleAuth = asyncHandler(async (req, res) => {
    const { credential } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { name, email } = payload;

        // Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
            // Create new user if doesn't exist
            user = await User.create({
                name,
                email,
                password: 'google-auth', // You might want to handle this differently
                role: 'customer',
                isGoogleAuth: true,
            });
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role),
        });
    } catch (error) {
        console.error('Google auth error:', error);
        res.status(401);
        throw new Error('Invalid Google token');
    }
});

/**
 * @desc: Register new user
 * @route: POST /api/users
 * @access: Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please fill all the fields');
    }

    // - Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // - Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // - Create new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'customer',
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

/**
 * @desc: Authenticate user
 * @route: POST /api/users/login
 * @access: Public
 */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // - Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

/**
 * @desc: Get user data
 * @route: GET /api/users
 * @access: Private
 */
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email, role } = await User.findById(req.user._id);

    res.status(200).json({
        id: _id,
        name,
        email,
        role,
    });
});

module.exports = { registerUser, loginUser, getMe, googleAuth };
