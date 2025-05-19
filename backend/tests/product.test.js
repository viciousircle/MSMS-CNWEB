// - SET UP ----
jest.mock('../config/db', () => ({
    connectDB: jest.fn(),
}));

const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { app } = require('../server');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcryptjs');

let mongoServer;
let testUser;
let testSeller;
let testProduct;
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
        colors: [
            {
                color: 'Red',
                stock: 5,
            },
            {
                color: 'Blue',
                stock: 5,
            },
        ],
    });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('Product API Tests', () => {
    describe('GET /api/products', () => {
        it('should get all products', async () => {
            const response = await request(app)
                .get('/api/products')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('name');
            expect(response.body[0]).toHaveProperty('price');
        });
    });

    describe('GET /api/products/:id', () => {
        it('should get a product by ID', async () => {
            const response = await request(app)
                .get(`/api/products/${testProduct._id}`)
                .expect(200);

            expect(response.body).toHaveProperty('_id');
            expect(response.body._id.toString()).toBe(
                testProduct._id.toString()
            );
            expect(response.body.name).toBe('Test Product');
        });

        it('should return 400 for invalid product ID', async () => {
            const response = await request(app)
                .get('/api/products/invalid-id')
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Invalid product ID');
        });

        it('should return 404 for non-existent product', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const response = await request(app)
                .get(`/api/products/${fakeId}`)
                .expect(404);

            expect(response.body).toHaveProperty('message');
        });
    });

    describe('PUT /api/products/:id', () => {
        it('should update product details (seller only)', async () => {
            const updateData = {
                name: 'Updated Product',
                price: 149.99,
                colors: [
                    {
                        color: 'Green',
                        stock: 10,
                    },
                ],
            };

            const response = await request(app)
                .put(`/api/products/${testProduct._id}`)
                .set('Authorization', `Bearer ${sellerToken}`)
                .send(updateData)
                .expect(200);

            expect(response.body.name).toBe('Updated Product');
            expect(response.body.price).toBe(149.99);
            expect(response.body.colors[0].color).toBe('Green');
        });

        it('should return 403 if not a seller', async () => {
            const response = await request(app)
                .put(`/api/products/${testProduct._id}`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({ name: 'Updated Product' })
                .expect(403);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe(
                'Not authorized for this action'
            );
        });

        it('should return 400 for invalid color data', async () => {
            const invalidData = {
                colors: [
                    {
                        color: 'Red',
                        stock: -1, // Invalid stock
                    },
                ],
            };

            const response = await request(app)
                .put(`/api/products/${testProduct._id}`)
                .set('Authorization', `Bearer ${sellerToken}`)
                .send(invalidData)
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Invalid color data structure');
        });

        it('should return 200 even if no changes detected', async () => {
            const sameData = {
                name: testProduct.name,
                price: testProduct.price,
            };

            const response = await request(app)
                .put(`/api/products/${testProduct._id}`)
                .set('Authorization', `Bearer ${sellerToken}`)
                .send(sameData)
                .expect(200);

            expect(response.body).toHaveProperty('name');
            expect(response.body.name).toBe(testProduct.name);
        });
    });

    describe('DELETE /api/products/:id', () => {
        it('should delete a product (seller only)', async () => {
            const response = await request(app)
                .delete(`/api/products/${testProduct._id}`)
                .set('Authorization', `Bearer ${sellerToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('deletedProduct');
            expect(response.body.deletedProduct._id.toString()).toBe(
                testProduct._id.toString()
            );
        });

        it('should return 404 for non-existent product', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const response = await request(app)
                .delete(`/api/products/${fakeId}`)
                .set('Authorization', `Bearer ${sellerToken}`)
                .expect(404);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Product not found!');
        });

        it('should return 400 for invalid product ID', async () => {
            const response = await request(app)
                .delete('/api/products/invalid-id')
                .set('Authorization', `Bearer ${sellerToken}`)
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Invalid product ID');
        });
    });
});
