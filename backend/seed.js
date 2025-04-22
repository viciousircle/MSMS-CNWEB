const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const seedProducts = require('./seed/product.seed'); // Add this line
const seedOrders = require('./seed/order.seed');
const colors = require('colors');

dotenv.config({ path: '../.env' });
colors.enable();

connectDB()
    .then(() => {
        console.log('Database connected successfully'.bgGreen);
        return seedProducts(); // Seed products first
    })
    .then(() => {
        console.log('Products seeded successfully'.bgGreen);
        return seedOrders(); // Then seed orders
    })
    .then(() => {
        console.log('Orders seeded successfully'.bgGreen);
        process.exit(0);
    })

    .catch((err) => {
        console.error('Seeding error:', err);
        process.exit(1);
    });
