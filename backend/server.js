const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config({ path: '../.env' });
const { errorHandler } = require('./middleware/error.middleware');
const { connectDB } = require('./config/db');
const cors = require('cors');
const port = process.env.PORT || 5678;

connectDB();
const app = express();

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
