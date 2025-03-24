jest.mock("../config/db", () => ({
    connectDB: jest.fn(),
}));

const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../server");
const Cart = require("../models/cart.model");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterEach(async () => {
    await Cart.deleteMany(); // Cleanup after each test
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe("GET /api/cart", () => {
    it("should return 200 if cart items are found", async () => {});
    it("should return an empty array when no item exist", async () => {});
    it("should return cart items when they exist", async () => {});
    it("should return 500 if there is a database error", async () => {});
    it("should return 400 if missing userId and uuid", async () => {});
    it("should return 404 if cart not found", async () => {});
});

describe("POST /api/cart", () => {
    it("shoul return 200 if item added to cart successfully", async () => {});
    it("shoul return 400 if missing userId and uuid", async () => {});
    it("shoul return 400 if missing productId", async () => {});
    it("shoul return 400 if missing quantity", async () => {});
    it("shoul return 404 if product not found", async () => {});
    it("shoul return 500 if there is a database error", async () => {});
});

describe("PUT /api/cart/:id", () => {
    it("should return 200 if item updated successfully", () => {});
    it("should return 400 if missing userId and uuid", () => {});
    it("should return 400 if missing productId", () => {});
    it("should return 400 if missing quantity", () => {});
    it("should return 404 if cart not found", () => {});
    it("should return 404 if product not found", () => {});
    it("should return 500 if there is a database error", () => {});
});

describe("DELETE /api/cart/:id", () => {
    it("should return 200 if item deleted successfully", () => {});
    it("should return 400 if missing userId and uuid", () => {});
    it("should return 404 if cart not found", () => {});
    it("should return 404 if product not found in cart", () => {});
    it("should return 500 if there is a database error", () => {});
});
