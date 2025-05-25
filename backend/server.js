const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config({ path: '../.env' });
const { errorHandler } = require('./middleware/error.middleware');
const { connectDB } = require('./config/db');
const cors = require('cors');
const port = process.env.PORT || 5678;

connectDB();
const app = express();

// app.use(
//     cors({
//         origin: 'http://localhost:5173',
//         credentials: true,
//     })
// );

const allowedOrigins = [
    'http://localhost:5173', // for local dev
    'https://msms-cnweb-t8rk4pnjp-viciousircles-projects.vercel.app', // your Vercel preview domain
    'https://msms-cnweb-v2.vercel.app', // your Vercel production domain
    'https://msms-cnweb-kwl2khm28-viciousircles-projects.vercel.app', // your new Vercel deployment
    'https://msms-cnweb-v2-2dj5iv695-viciousircles-projects.vercel.app/',
];

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (like mobile apps, curl, etc.)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) !== -1) {
                return callback(null, true);
            } else {
                return callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);

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
