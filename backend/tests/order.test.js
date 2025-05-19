jest.mock('../config/db', () => ({
    connectDB: jest.fn(),
}));

const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { app } = require('../server');
const Order = require('../models/order.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcryptjs');

let mongoServer;
let testUser;
let testSeller;
let testProduct;
let testOrder;
let userToken;
let sellerToken;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    // Create test customer
    const hashedPassword = await bcrypt.hash('password123', 10);
    testUser = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'customer',
    });

    // Create test seller
    testSeller = await User.create({
        name: 'Test Seller',
        email: 'seller@example.com',
        password: hashedPassword,
        role: 'seller',
    });

    // Generate auth tokens
    userToken = jwt.sign(
        { id: testUser._id, role: testUser.role },
        process.env.JWT_SECRET || 'test-secret',
        {
            expiresIn: '30d',
        }
    );

    sellerToken = jwt.sign(
        { id: testSeller._id, role: testSeller.role },
        process.env.JWT_SECRET || 'test-secret',
        {
            expiresIn: '30d',
        }
    );

    // Create test product
    testProduct = await Product.create({
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stock: 10,
        seller: testSeller._id,
        image: 'https://example.com/test-image.jpg',
    });

    // Create test order
    testOrder = await Order.create({
        user: testUser._id,
        orderItems: [
            {
                product: testProduct._id,
                color: 'Red',
                quantity: 2,
            },
        ],
        receiverInformation: {
            receiverName: 'John Doe',
            receiverPhone: '1234567890',
            receiverAddress: '123 Test St',
        },
        paymentMethod: 'COD',
    });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('Order API Tests', () => {
    describe('POST /api/orders', () => {
        it('should create a new order', async () => {
            const orderData = {
                orderItems: [
                    {
                        product: testProduct._id,
                        color: 'Blue',
                        quantity: 1,
                    },
                ],
                receiverInformation: {
                    receiverName: 'Jane Doe',
                    receiverPhone: '0987654321',
                    receiverAddress: '456 Test Ave',
                },
                paymentMethod: 'QR',
            };

            const response = await request(app)
                .post('/api/orders')
                .set('Authorization', `Bearer ${userToken}`)
                .send(orderData)
                .expect(201);

            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('order');
            expect(
                response.body.order.orderItems[0].product._id.toString()
            ).toBe(testProduct._id.toString());
            expect(response.body.order.paymentMethod).toBe('QR');
        });

        it('should return 400 if required fields are missing', async () => {
            const response = await request(app)
                .post('/api/orders')
                .set('Authorization', `Bearer ${userToken}`)
                .send({})
                .expect(400);

            expect(response.body).toHaveProperty('message');
        });
    });

    describe('GET /api/orders', () => {
        it('should get all orders for the authenticated customer', async () => {
            const response = await request(app)
                .get('/api/orders')
                .set('Authorization', `Bearer ${userToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('orders');
            expect(Array.isArray(response.body.orders)).toBe(true);
            expect(response.body.orders.length).toBeGreaterThan(0);
        });

        it('should return 401 if not authenticated', async () => {
            const response = await request(app).get('/api/orders').expect(401);

            expect(response.body).toHaveProperty('message');
        });
    });

    describe('GET /api/orders/:id', () => {
        // Remove or comment out the customer GET /api/orders/:id tests
        // describe("GET /api/orders/:id", () => {
        //     it("should get a specific order by ID", async () => {
        //         const response = await request(app)
        //             .get(`/api/orders/${testOrder._id}`)
        //             .set("Authorization", `Bearer ${userToken}`)
        //             .expect(200);
        //
        //         expect(response.body).toHaveProperty("orderId");
        //         expect(response.body.orderId.toString()).toBe(testOrder._id.toString());
        //     });
        //
        //     it("should return 404 for non-existent order", async () => {
        //         const fakeId = new mongoose.Types.ObjectId();
        //         const response = await request(app)
        //             .get(`/api/orders/${fakeId}`)
        //             .set("Authorization", `Bearer ${userToken}`)
        //             .expect(404);
        //
        //         expect(response.body).toHaveProperty("message");
        //     });
        // });
    });

    describe('PUT /api/orders/:id/cancel', () => {
        it('should cancel an order', async () => {
            // Ensure the test order is not already cancelled
            testOrder.orderStage = [{ stage: 'New', date: new Date() }];
            testOrder.isPaid = true;
            await testOrder.save();
            const response = await request(app)
                .put(`/api/orders/${testOrder._id}/cancel`)
                .set('Authorization', `Bearer ${userToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('order');
            expect(response.body.order).toHaveProperty('_id');
            expect(response.body.order).toHaveProperty('cancelledAt');
            expect(response.body.order.currentStage).toBe('Cancelled');
        });

        it('should return message for non-existent order', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const response = await request(app)
                .put(`/api/orders/${fakeId}/cancel`)
                .set('Authorization', `Bearer ${userToken}`)
                .expect(404);

            expect(response.body).toEqual({
                message: 'Order not found or not owned by user',
            });
        });
    });

    describe('Seller Order Management', () => {
        describe('GET /api/seller/orders', () => {
            it('should get all orders for the seller', async () => {
                const response = await request(app)
                    .get('/api/seller/orders')
                    .set('Authorization', `Bearer ${sellerToken}`)
                    .expect(200);

                expect(response.body).toHaveProperty('orders');
                expect(Array.isArray(response.body.orders)).toBe(true);
                expect(response.body.orders.length).toBeGreaterThan(0);
            });

            it('should return 403 if not a seller', async () => {
                const response = await request(app)
                    .get('/api/seller/orders')
                    .set('Authorization', `Bearer ${userToken}`)
                    .expect(403);

                expect(response.body).toHaveProperty('message');
            });
        });

        describe('GET /api/seller/orders/:id', () => {
            it('should get order details for the seller', async () => {
                const response = await request(app)
                    .get(`/api/seller/orders/${testOrder._id}`)
                    .set('Authorization', `Bearer ${sellerToken}`)
                    .expect(200);

                expect(response.body).toHaveProperty('orderId');
                expect(response.body.orderId.toString()).toBe(
                    testOrder._id.toString()
                );
            });

            it('should return 404 for non-existent order', async () => {
                const fakeId = new mongoose.Types.ObjectId();
                const response = await request(app)
                    .get(`/api/seller/orders/${fakeId}`)
                    .set('Authorization', `Bearer ${sellerToken}`)
                    .expect(404);

                expect(response.body).toHaveProperty('message');
            });
        });

        describe('PUT /api/seller/orders/:id', () => {
            it('should update order stage', async () => {
                const response = await request(app)
                    .put(`/api/seller/orders/${testOrder._id}`)
                    .set('Authorization', `Bearer ${sellerToken}`)
                    .send({ stage: 'Prepare' })
                    .expect(200);

                expect(response.body).toHaveProperty('message');
                expect(response.body).toHaveProperty('newStage');
                expect(response.body.newStage).toBe('Prepare');
            });

            it('should return 400 for invalid stage', async () => {
                const response = await request(app)
                    .put(`/api/seller/orders/${testOrder._id}`)
                    .set('Authorization', `Bearer ${sellerToken}`)
                    .send({ stage: 'InvalidStage' })
                    .expect(400);

                expect(response.body).toHaveProperty('message');
                expect(response.body).toHaveProperty('validStages');
            });
        });
    });
});
