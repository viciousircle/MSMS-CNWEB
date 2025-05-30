// - SET UP ----
jest.mock('../config/db', () => ({
    connectDB: jest.fn(),
}));

const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { app } = require('../server');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Product = require('../models/product.model');
const User = require('../models/user.model');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    await User.deleteMany({});
});

afterEach(async () => {
    await Product.deleteMany(); // Cleanup after each test
    await User.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

// --------

describe('GET /api/products (Get all products)', () => {
    it('should return an empty array when no products exist', async () => {
        const response = await request(app).get('/api/products').expect(200);
        expect(response.body).toEqual([]);
    });

    it('should return products when they exist', async () => {
        const sampleProducts = [
            {
                _id: new mongoose.Types.ObjectId(),
                name: 'Product 1',
                image: 'https://example.com/image1.jpg',
                price: 100.03,
                colors: [
                    {
                        color: 'red',
                        stock: 10,
                        _id: new mongoose.Types.ObjectId(),
                    },
                    {
                        color: 'blue',
                        stock: 5,
                        _id: new mongoose.Types.ObjectId(),
                    },
                ],
                rate: 4,
                _v: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                _id: new mongoose.Types.ObjectId(),
                name: 'Product 2',
                image: 'https://example.com/image2.jpg',
                price: 200.99,
                colors: [
                    {
                        color: 'green',
                        stock: 20,
                        _id: new mongoose.Types.ObjectId(),
                    },
                ],
                rate: 5,
                _v: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        await Product.insertMany(sampleProducts);

        const response = await request(app).get('/api/products').expect(200);

        expect(response.body.length).toBe(2);
        expect(response.body[0].name).toBe('Product 1');
        expect(response.body[1].name).toBe('Product 2');
    });

    it('should return 500 if there is a database error', async () => {
        jest.spyOn(Product, 'find').mockImplementationOnce(() => {
            throw new Error('Database error');
        });

        const response = await request(app).get('/api/products').expect(500);
        expect(response.body.message).toBe('Internal server error');
    });
});

//TODO: No need
// describe('GET /api/products/:id (Get a product by ID)', () => {
//     it('should return a product when ID valid', async () => {
//         const product = await Product.create({
//             name: 'Sample',
//             image: 'https://example.com/sample.jpg',
//             price: 100,
//             stock: 2000,
//             rate: 4.5,
//         });

//         const response = await request(app)
//             .get(`/api/products/${product._id}`)
//             .expect(200);

//         expect(response.body).toMatchObject({
//             _id: product._id.toString(),
//             name: 'Sample',
//             image: 'https://example.com/sample.jpg',
//             price: 100,
//             stock: 2000,
//             rate: 4.5,
//         });
//     });

//     it('should return 404 if product is not found', async () => {
//         const nonExistId = new mongoose.Types.ObjectId();

//         const response = await request(app)
//             .get(`/api/products/${nonExistId}`)
//             .expect(404);

//         expect(response.body.message).toBe(
//             `Product with id ${nonExistId} not found!`
//         );
//     });

//     it('should return 400 if the Id format is invalid', async () => {
//         const response = await request(app)
//             .get('/api/products/invalidID')
//             .expect(400);

//         expect(response.body.message).toBe('Invalid product ID');
//     });

//     it('should return 500 if there is a database error', async () => {
//         // Mock Product.findById to throw an error
//         jest.spyOn(Product, 'findById').mockImplementationOnce(() => {
//             throw new Error('Database error');
//         });

//         const validId = new mongoose.Types.ObjectId();

//         const response = await request(app)
//             .get(`/api/products/${validId}`)
//             .expect(500);

//         expect(response.body.message).toBe('Internal server error');
//     });
// });

// describe('PUT /api/products/:id', () => {
//     it('should return 200 if the product updated successfully', async () => {
//         const seller = await User.create({
//             name: 'Seller',
//             email: 'seller@example.com',
//             password: await bcrypt.hash('password', 10),
//             role: 'seller',
//         });

//         const loginResponse = await request(app).post('/api/users/login').send({
//             email: 'seller@example.com',
//             password: 'password',
//         });

//         const token = loginResponse.body.token;
//         expect(token).toBeDefined();

//         const product = await Product.create({
//             _id: new mongoose.Types.ObjectId(),
//             name: 'Sample',
//             image: 'https://example.com/sample.jpg',
//             price: 100,
//             stock: 2000,
//             rate: 4.5,
//         });

//         const response = await request(app)
//             .put(`/api/products/${product._id}`)
//             .set('Authorization', `Bearer ${token}`)
//             .send({
//                 name: 'Updated',
//                 price: 200,
//             })
//             .expect(200);

//         expect(response.body.name).toBe('Updated');
//         expect(response.body.price).toBe(200);
//     });
//     it('should return 401 if the user is not a seller', async () => {});
//     it('should return 400 if no changes are detected', async () => {
//         const seller = await User.create({
//             name: 'Seller',
//             email: 'seller@example.com',
//             password: await bcrypt.hash('password', 10),
//             role: 'seller',
//         });

//         const loginResponse = await request(app).post('/api/users/login').send({
//             email: 'seller@example.com',
//             password: 'password',
//         });

//         const token = loginResponse.body.token;
//         expect(token).toBeDefined();

//         const product = await Product.create({
//             _id: new mongoose.Types.ObjectId(),
//             name: 'Sample',
//             image: 'https://example.com/sample.jpg',
//             price: 100,
//             stock: 2000,
//             rate: 4.5,
//         });

//         const response = await request(app)
//             .put(`/api/products/${product._id}`)
//             .set('Authorization', `Bearer ${token}`)
//             .send({
//                 name: 'Sample',
//                 price: 100,
//             })
//             .expect(400);
//         expect(response.body.message).toBe(
//             'No changes detected. Product remains the same!'
//         );
//     });
//     it('should return 400 if the provided Id is invalid', async () => {
//         const seller = await User.create({
//             name: 'Seller',
//             email: 'seller@example.com',
//             password: await bcrypt.hash('password', 10),
//             role: 'seller',
//         });

//         const loginResponse = await request(app).post('/api/users/login').send({
//             email: 'seller@example.com',
//             password: 'password',
//         });

//         const token = loginResponse.body.token;
//         expect(token).toBeDefined();

//         // Using an obviously invalid ID format
//         const invalidId = 'invalid123';

//         const response = await request(app)
//             .put(`/api/products/${invalidId}`)
//             .set('Authorization', `Bearer ${token}`)
//             .send({
//                 name: 'Updated Name',
//                 price: 200,
//             })
//             .expect(400);

//         expect(response.body.message).toBe('Invalid product ID');
//     });
//     it('should return 400 if the provided values are invalid', async () => {
//         const seller = await User.create({
//             name: 'Seller',
//             email: 'seller@example.com',
//             password: await bcrypt.hash('password', 10),
//             role: 'seller',
//         });

//         const loginResponse = await request(app).post('/api/users/login').send({
//             email: 'seller@example.com',
//             password: 'password',
//         });

//         const token = loginResponse.body.token;
//         expect(token).toBeDefined();

//         const response = await request(app)
//             .put('/api/products/invalid123')
//             .set('Authorization', `Bearer ${token}`)
//             .send({ name: 'Updated Name' })
//             .expect(400);

//         expect(response.body.message).toBe('Invalid product ID');
//     });
//     it('should return 404 if the product not found', async () => {
//         const seller = await User.create({
//             name: 'Seller',
//             email: 'seller@example.com',
//             password: await bcrypt.hash('password', 10),
//             role: 'seller',
//         });

//         const loginResponse = await request(app).post('/api/users/login').send({
//             email: 'seller@example.com',
//             password: 'password',
//         });

//         const token = loginResponse.body.token;
//         expect(token).toBeDefined();

//         const nonExistId = new mongoose.Types.ObjectId();

//         const response = await request(app)
//             .put(`/api/products/${nonExistId}`)
//             .set('Authorization', `Bearer ${token}`)
//             .expect(404);

//         expect(response.body.message).toBe('Product not found!');
//     });
//     it('should return 500 if there is a database error', async () => {
//         const seller = await User.create({
//             name: 'Seller',
//             email: 'seller@example.com',
//             password: await bcrypt.hash('password', 10),
//             role: 'seller',
//         });

//         const loginResponse = await request(app).post('/api/users/login').send({
//             email: 'seller@example.com',
//             password: 'password',
//         });

//         const token = loginResponse.body.token;
//         expect(token).toBeDefined();

//         jest.spyOn(Product, 'findById').mockImplementationOnce(() => {
//             throw new Error('Database error');
//         });

//         const response = await request(app)
//             .put(`/api/products/${new mongoose.Types.ObjectId()}`)
//             .set('Authorization', `Bearer ${token}`)
//             .send({ name: 'Updated Name' })
//             .expect(500);

//         expect(response.body.message).toBe('Internal server error.');

//         jest.restoreAllMocks();
//     });
// });
