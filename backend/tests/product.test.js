jest.mock("../config/db", () => ({
    connectDB: jest.fn(),
}));

const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../server");
const Product = require("../models/product.model");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterEach(async () => {
    await Product.deleteMany(); // Cleanup after each test
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe("GET /api/products (Get all products)", () => {
    it("should return an empty array when no products exist", async () => {
        const response = await request(app).get("/api/products").expect(200);
        expect(response.body).toEqual([]);
    });

    it("should return products when they exist", async () => {
        const sampleProducts = [
            {
                name: "Product 1",
                image: "https://example.com/image1.jpg",
                price: 100,
                stock: 10,
                rate: 4,
            },
            {
                name: "Product 2",
                image: "https://example.com/image2.jpg",
                price: 200,
                stock: 5,
                rate: 5,
            },
        ];
        await Product.insertMany(sampleProducts);

        const response = await request(app).get("/api/products").expect(200);

        expect(response.body.length).toBe(2);
        expect(response.body[0].name).toBe("Product 1");
        expect(response.body[1].name).toBe("Product 2");
    });

    it("should return 500 if there is a database error", async () => {
        jest.spyOn(Product, "find").mockImplementationOnce(() => {
            throw new Error("Database error");
        });

        const response = await request(app).get("/api/products").expect(500);
        expect(response.body.message).toBe("Internal server error");
    });
});
