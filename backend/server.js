const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config({ path: '../.env' });
const { errorHandler } = require('./middleware/error.middleware');
const { connectDB } = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const { validationResult } = require('express-validator');
const port = process.env.PORT || 5678;

// Security middleware setup
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message:
        'Too many requests from this IP, please try again after 15 minutes',
});

// CSRF protection setup
const csrfProtection = csrf({
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    },
});

connectDB();
const app = express();

// Apply security middleware
app.use(helmet()); // Security headers
app.use(cookieParser()); // Parse cookies
app.use(limiter); // Rate limiting
app.use(express.json({ limit: '10kb' })); // Body limit is 10kb
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Apply CSRF protection to all routes except those that need to be public
app.use((req, res, next) => {
    // Skip CSRF for public routes and API routes that use token auth
    if (
        req.path.startsWith('/api/users/login') ||
        req.path.startsWith('/api/users/register') ||
        req.path.startsWith('/api/users/google') ||
        req.method === 'GET'
    ) {
        return next();
    }
    csrfProtection(req, res, next);
});

// Add CSRF token to all responses
app.use((req, res, next) => {
    if (req.csrfToken) {
        res.cookie('XSRF-TOKEN', req.csrfToken(), {
            httpOnly: false, // Allow JavaScript to read the token
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
    }
    next();
});

// Input validation middleware
app.use((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
});

// Debug middleware for CORS
app.use((req, res, next) => {
    console.log('Incoming request:', {
        method: req.method,
        path: req.path,
        origin: req.headers.origin,
        headers: req.headers,
    });
    next();
});

const allowedOrigins = [
    'https://msms-cnweb-v2.vercel.app',
    'http://localhost:5173',
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            // Check if the origin is in the allowed list
            if (allowedOrigins.includes(origin)) {
                return callback(null, origin); // Return the specific origin
            }

            const msg =
                'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204,
        maxAge: 86400, // 24 hours
    })
);

// Add headers middleware to ensure CORS headers are always present
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Accept'
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// Debug middleware for CORS response
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log('Response sent:', {
            statusCode: res.statusCode,
            headers: res.getHeaders(),
        });
    });
    next();
});

app.use('/api/products', require('./routes/product.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/cart', require('./routes/cart.routes'));
app.use('/api/seller/orders', require('./routes/orderSeller.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
}

module.exports = { app };
