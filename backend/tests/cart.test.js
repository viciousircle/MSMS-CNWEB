jest.mock('../config/db', () => ({
    connectDB: jest.fn(),
}));

const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../server');
const bcrypt = require('bcryptjs');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterEach(async () => {
    await Cart.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('GET /api/cart', () => {
    it('should return cart items when they exist', async () => {
        const customer = await User.create({
            name: 'Customer',
            email: 'customer@example.com',
            password: await bcrypt.hash('password', 10),
            role: 'customer',
        });

        const loginResponse = await request(app).post('/api/users/login').send({
            email: 'customer@example.com',
            password: 'password',
        });

        const token = loginResponse.body.token;
        expect(token).toBeDefined();

        const cart = await Cart.create({
            user: customer._id,
            uuid: 'test-uuid',
            cartItems: [
                {
                    product: new mongoose.Types.ObjectId(),
                    color: 'red',
                    quantity: 1,
                    dateAdded: new Date(),
                },
            ],
        });

        const response = await request(app)
            .get('/api/cart')
            .set('Authorization', `Bearer ${token}`)
            .query({ uuid: 'test-uuid' })
            .expect(200);

        expect(response.body).toHaveProperty('items');
        expect(Array.isArray(response.body.items)).toBe(true);
        expect(response.body.items.length).toBe(1);
    });

    it('should return 404 if cart not found', async () => {
        const customer = await User.create({
            name: 'Customer',
            email: 'customer@example.com',
            password: await bcrypt.hash('password', 10),
            role: 'customer',
        });

        const loginResponse = await request(app).post('/api/users/login').send({
            email: 'customer@example.com',
            password: 'password',
        });

        const token = loginResponse.body.token;
        expect(token).toBeDefined();

        const response = await request(app)
            .get('/api/cart')
            .set('Authorization', `Bearer ${token}`)
            .query({ uuid: 'non-existent-uuid' })
            .expect(404);

        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Cart not found');
    });

    it('should return an empty cart if no items exist', async () => {
        const customer = await User.create({
            name: 'Customer',
            email: 'customer@example.com',
            password: await bcrypt.hash('password', 10),
            role: 'customer',
        });

        const loginResponse = await request(app).post('/api/users/login').send({
            email: 'customer@example.com',
            password: 'password',
        });

        const token = loginResponse.body.token;
        expect(token).toBeDefined();

        await Cart.create({
            user: customer._id,
            uuid: 'test-uuid',
            cartItems: [], // Empty cart
        });

        const response = await request(app)
            .get('/api/cart')
            .set('Authorization', `Bearer ${token}`)
            .query({ uuid: 'test-uuid' })
            .expect(200);

        expect(response.body).toHaveProperty('items');
        expect(Array.isArray(response.body.items)).toBe(true);
        expect(response.body.items.length).toBe(0);
    });

    it('should return 500 if there is a database error', async () => {
        jest.spyOn(Cart, 'findOne').mockImplementation(() => {
            throw new Error('Database error');
        });

        const customer = await User.create({
            name: 'Customer',
            email: 'customer@example.com',
            password: await bcrypt.hash('password', 10),
            role: 'customer',
        });

        const loginResponse = await request(app).post('/api/users/login').send({
            email: 'customer@example.com',
            password: 'password',
        });

        const token = loginResponse.body.token;
        expect(token).toBeDefined();

        const response = await request(app)
            .get('/api/cart')
            .set('Authorization', `Bearer ${token}`)
            .query({ uuid: 'test-uuid' })
            .expect(500);

        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Internal server error');

        jest.restoreAllMocks(); // Restore mocked function
    });
});

describe('POST /api/cart', () => {
    it('should return 200 if item added to cart successfully', async () => {
        const customer = await User.create({
            name: 'Customer',
            email: 'customer@example.com',
            password: await bcrypt.hash('password', 10),
            role: 'customer',
        });

        const product = await Product.create({
            name: 'Test Product',
            image: 'test-image.jpg',
            price: 100,
            colors: [
                {
                    color: 'red',
                    stock: 10,
                },
            ],
            rate: 4.5,
        });

        const loginResponse = await request(app).post('/api/users/login').send({
            email: 'customer@example.com',
            password: 'password',
        });

        const token = loginResponse.body.token;
        expect(token).toBeDefined();

        const response = await request(app)
            .post('/api/cart')
            .set('Authorization', `Bearer ${token}`)
            .send({
                productId: product._id,
                color: 'red',
                quantity: 2,
                dateAdded: new Date(),
            })
            .expect(200);

        expect(response.body).toEqual({
            success: true,
            message: 'Item added to cart',
            cart: expect.objectContaining({
                user: customer._id.toString(),
                cartItems: expect.arrayContaining([
                    expect.objectContaining({
                        product: expect.anything(),
                        color: 'red',
                        quantity: 2,
                    }),
                ]),
            }),
        });
    });
    it('should return 400 if missing productId', async () => {
        const customer = await User.create({
            name: 'Customer',
            email: 'customer2@example.com',
            password: await bcrypt.hash('password', 10),
            role: 'customer',
        });

        const loginResponse = await request(app).post('/api/users/login').send({
            email: 'customer2@example.com',
            password: 'password',
        });

        const token = loginResponse.body.token;

        const response = await request(app)
            .post('/api/cart')
            .set('Authorization', `Bearer ${token}`)
            .send({
                color: 'red',
                quantity: 1,
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Invalid product ID');
    });

    it('should return 400 if missing quantity', async () => {
        const customer = await User.create({
            name: 'Customer',
            email: 'customer3@example.com',
            password: await bcrypt.hash('password', 10),
            role: 'customer',
        });

        const product = await Product.create({
            name: 'Product Missing Quantity',
            image: 'image.jpg',
            price: 50,
            colors: [{ color: 'blue', stock: 5 }],
            rate: 4,
        });

        const loginResponse = await request(app).post('/api/users/login').send({
            email: 'customer3@example.com',
            password: 'password',
        });

        const token = loginResponse.body.token;

        const response = await request(app)
            .post('/api/cart')
            .set('Authorization', `Bearer ${token}`)
            .send({
                productId: product._id,
                color: 'blue',
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Invalid quantity');
    });

    it('should return 404 if product not found', async () => {
        const customer = await User.create({
            name: 'Customer',
            email: 'customer4@example.com',
            password: await bcrypt.hash('password', 10),
            role: 'customer',
        });

        const loginResponse = await request(app).post('/api/users/login').send({
            email: 'customer4@example.com',
            password: 'password',
        });

        const token = loginResponse.body.token;

        const fakeProductId = new mongoose.Types.ObjectId();

        const response = await request(app)
            .post('/api/cart')
            .set('Authorization', `Bearer ${token}`)
            .send({
                productId: fakeProductId,
                color: 'red',
                quantity: 1,
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Product not found');
    });

    it('should return 500 if there is a database error', async () => {
        const customer = await User.create({
            name: 'Customer',
            email: 'customer5@example.com',
            password: await bcrypt.hash('password', 10),
            role: 'customer',
        });

        const loginResponse = await request(app).post('/api/users/login').send({
            email: 'customer5@example.com',
            password: 'password',
        });

        const token = loginResponse.body.token;

        // Temporarily mock Product.findById to throw
        jest.spyOn(Product, 'findById').mockImplementation(() => {
            throw new Error('Database failure');
        });

        const response = await request(app)
            .post('/api/cart')
            .set('Authorization', `Bearer ${token}`)
            .send({
                productId: new mongoose.Types.ObjectId(),
                color: 'red',
                quantity: 1,
            });

        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Internal server error');

        // Restore original method
        Product.findById.mockRestore();
    });
});

describe('PUT /api/cart/:id', () => {
    it('should return 200 if item updated successfully', () => {});
    it('should return 400 if missing userId and uuid', () => {});
    it('should return 400 if missing productId', () => {});
    it('should return 400 if missing quantity', () => {});
    it('should return 404 if cart not found', () => {});
    it('should return 404 if product not found', () => {});
    it('should return 500 if there is a database error', () => {});
});

describe('DELETE /api/cart/:id', () => {
    it('should return 200 if item deleted successfully', () => {});
    it('should return 400 if missing userId and uuid', () => {});
    it('should return 404 if cart not found', () => {});
    it('should return 404 if product not found in cart', () => {});
    it('should return 500 if there is a database error', () => {});
});
