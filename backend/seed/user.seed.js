const { faker } = require('@faker-js/faker');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const colors = require('colors');

const seedUsers = async () => {
    try {
        // Clear existing users
        await User.deleteMany();
        console.log('Existing users cleared'.yellow);

        const users = [];

        // Create admin user
        const adminPassword = await bcrypt.hash('1', 10);
        users.push({
            name: 'Admin',
            email: 'admin@gmail.com',
            password: adminPassword,
            role: 'admin',
        });

        // Create seller user
        const sellerPassword = await bcrypt.hash('1', 10);
        users.push({
            name: 'Seller',
            email: 'seller@gmail.com',
            password: sellerPassword,
            role: 'seller',
        });

        // Create specific customer account
        const customerPassword = await bcrypt.hash('1', 10);
        users.push({
            name: 'Customer',
            email: 'vuminhquy115@gmail.com',
            password: customerPassword,
            role: 'customer',
        });

        for (let i = 0; i < 200; i++) {
            const randomPassword = await bcrypt.hash('1', 10);
            users.push({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: randomPassword,
                role: 'customer',
            });
        }

        await User.insertMany(users);
        console.log(`${users.length} users seeded successfully`.green.bold);

        return users;
    } catch (error) {
        console.error('Error seeding users:'.red, error);
        throw error;
    }
};

module.exports = seedUsers;
