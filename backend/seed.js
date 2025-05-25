const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const seedUsers = require('./seed/user.seed');
const seedProducts = require('./seed/product.seed');
const seedOrders = require('./seed/order.seed');
const colors = require('colors');

dotenv.config({ path: '../.env' });
colors.enable();

connectDB()
    .then(() => {
        console.log('Database connected successfully'.bgGreen);
        return seedUsers(); // Seed users first
    })
    .then(() => {
        console.log('Users seeded successfully'.bgGreen);
        return seedProducts(); // Then seed products
    })
    .then(() => {
        console.log('Products seeded successfully'.bgGreen);
        return seedOrders(); // Finally seed orders
    })
    .then(() => {
        console.log('Orders seeded successfully'.bgGreen);
        process.exit(0);
    })
    .catch((err) => {
        console.error('Seeding error:', err);
        process.exit(1);
    });
