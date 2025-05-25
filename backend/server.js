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

// Handle preflight requests explicitly
app.options('*', cors());

// CORS configuration
app.use(
    cors({
        origin: 'https://msms-cnweb-v2.vercel.app',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
        maxAge: 86400, // 24 hours
    })
);

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

// Add CORS headers to all responses
app.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Origin',
        'https://msms-cnweb-v2.vercel.app'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
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
