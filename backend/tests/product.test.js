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
    await mongoose.disconnect();
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
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Product API Tests', () => {
    describe('GET /api/products', () => {
        it('should get all products', () => {});
        it('should filter products by category', () => {});
        it('should filter products by price range', () => {});
        it('should filter products by color', () => {});
        it('should sort products by price', () => {});
        it('should sort products by rating', () => {});
        it('should paginate products list', () => {});
    });

    describe('GET /api/products/:id', () => {
        it('should get product by ID', () => {});
        it('should return 404 for non-existent product', () => {});
        it('should return 400 for invalid product ID', () => {});
    });

    describe('POST /api/products', () => {
        it('should create a new product', () => {});
        it('should return 401 if not authenticated', () => {});
        it('should return 403 if not a seller', () => {});
        it('should validate product data', () => {});
        it('should validate product colors', () => {});
    });

    describe('PUT /api/products/:id', () => {
        it('should update product details', () => {});
        it('should return 401 if not authenticated', () => {});
        it('should return 403 if not the product seller', () => {});
        it('should return 404 for non-existent product', () => {});
        it('should validate update data', () => {});
    });

    describe('DELETE /api/products/:id', () => {
        it('should delete product', () => {});
        it('should return 401 if not authenticated', () => {});
        it('should return 403 if not the product seller', () => {});
        it('should return 404 for non-existent product', () => {});
    });

    describe('GET /api/products/seller', () => {
        it('should get seller products', () => {});
        it('should return 401 if not authenticated', () => {});
        it('should return 403 if not a seller', () => {});
        it('should filter products by status', () => {});
        it('should paginate products list', () => {});
    });
});
