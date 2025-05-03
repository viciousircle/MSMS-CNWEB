const mongoose = require('mongoose');
const Order = require('../models/order.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const { faker } = require('@faker-js/faker');

const seedOrders = async () => {
    try {
        // Clear existing orders
        await Order.deleteMany({});

        // Get all customers (users with role 'customer')
        const customers = await User.find({ role: 'customer' });
        if (customers.length === 0) {
            throw new Error(
                'No customers found in database. Seed users first.'
            );
        }

        // Get all products
        const products = await Product.find({});
        if (products.length === 0) {
            throw new Error(
                'No products found in database. Seed products first.'
            );
        }

        // Generate fake orders
        const orders = [];
        const orderCount = 50; // Number of orders to generate

        for (let i = 0; i < orderCount; i++) {
            // Random customer
            const customer = faker.helpers.arrayElement(customers);

            // Random products (1-5 items per order)
            const itemCount = faker.number.int({ min: 1, max: 5 });
            const orderItems = [];

            for (let j = 0; j < itemCount; j++) {
                const product = faker.helpers.arrayElement(products);
                const color = faker.helpers.arrayElement(product.colors).color;
                const quantity = faker.number.int({ min: 1, max: 5 });

                orderItems.push({
                    product: product._id,
                    color: color,
                    quantity: quantity,
                });
            }

            // Receiver information
            const receiverName = faker.person.fullName();
            const receiverPhone = faker.phone.number();
            const receiverAddress = faker.location.streetAddress();

            // Payment method
            const paymentMethod = faker.helpers.arrayElement(['COD', 'QR']);

            // Order stage
            const stages = [
                'New',
                'Prepare',
                'Shipping',
                'Shipped',
                'Cancelled',
                'Reject',
            ];
            const orderStage = [];

            // Randomly determine current stage (most orders should be completed)
            const currentStage = faker.helpers.weightedArrayElement([
                { weight: 10, value: 'New' },
                { weight: 5, value: 'Prepare' },
                { weight: 5, value: 'Shipping' },
                { weight: 60, value: 'Shipped' },
                { weight: 10, value: 'Cancelled' },
                { weight: 10, value: 'Reject' },
            ]);

            // Add all stages up to current stage
            if (currentStage === 'New') {
                orderStage.push({
                    stage: 'New',
                    date: faker.date.recent({ days: 1 }),
                });
            } else {
                orderStage.push({
                    stage: 'New',
                    date: faker.date.recent({ days: 30 }),
                });

                if (currentStage !== 'New') {
                    orderStage.push({
                        stage: 'Prepare',
                        date: faker.date.between({
                            from: orderStage[0].date,
                            to: new Date(),
                        }),
                    });

                    if (
                        ['Shipping', 'Shipped', 'Cancelled', 'Reject'].includes(
                            currentStage
                        )
                    ) {
                        orderStage.push({
                            stage: 'Shipping',
                            date: faker.date.between({
                                from: orderStage[1].date,
                                to: new Date(),
                            }),
                        });

                        if (
                            ['Shipped', 'Cancelled', 'Reject'].includes(
                                currentStage
                            )
                        ) {
                            orderStage.push({
                                stage: currentStage,
                                date: faker.date.between({
                                    from: orderStage[2].date,
                                    to: new Date(),
                                }),
                            });
                        }
                    }
                }
            }

            // Payment status (more likely to be paid if shipped)
            const isPaid =
                currentStage === 'Shipped'
                    ? faker.datatype.boolean({ probability: 0.9 })
                    : faker.datatype.boolean({ probability: 0.3 });

            orders.push({
                user: customer._id,
                orderItems: orderItems,
                receiverInformation: {
                    receiverName: receiverName,
                    receiverPhone: receiverPhone,
                    receiverAddress: receiverAddress,
                },
                paymentMethod: paymentMethod,
                orderStage: orderStage,
                isPaid: isPaid,
                createdAt: orderStage[0].date,
            });
        }

        // Insert orders into database
        await Order.insertMany(orders);

        console.log(
            `Successfully seeded ${orders.length} orders for customers.`
        );
    } catch (error) {
        console.error('Error seeding orders:', error.message);
    }
};

module.exports = seedOrders;
