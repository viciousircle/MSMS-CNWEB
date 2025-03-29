jest.mock("../config/db", () => ({
    connectDB: jest.fn(),
}));

const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../server");
const bcrypt = require("bcryptjs");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const { MongoMemoryServer } = require("mongodb-memory-server");

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

describe("GET /api/cart", () => {
    it("should return cart items when they exist", async () => {
        const customer = await User.create({
            name: "Customer",
            email: "customer@example.com",
            password: await bcrypt.hash("password", 10),
            role: "customer",
        });

        const loginResponse = await request(app).post("/api/users/login").send({
            email: "customer@example.com",
            password: "password",
        });

        const token = loginResponse.body.token;
        expect(token).toBeDefined();

        const cart = await Cart.create({
            user: customer._id,
            uuid: "test-uuid",
            cartItems: [
                { product: new mongoose.Types.ObjectId(), quantity: 2 },
            ],
        });

        const response = await request(app)
            .get("/api/cart")
            .set("Authorization", `Bearer ${token}`)
            .query({ uuid: "test-uuid" })
            .expect(200);

        expect(response.body).toHaveProperty("cartItems");
        expect(response.body.cartItems.length).toBe(1);
    });

    // TODO: fix this test
    // it("should return 400 if missing userId and uuid", async () => {
    //     const customer = await User.create({
    //         name: "Customer",
    //         email: "customer@example.com",
    //         password: await bcrypt.hash("password", 10),
    //         role: "customer",
    //     });

    //     const loginResponse = await request(app).post("/api/users/login").send({
    //         email: "customer@example.com",
    //         password: "password",
    //     });

    //     const token = loginResponse.body.token;
    //     expect(token).toBeDefined();

    //     const response = await request(app)
    //         .get("/api/cart")
    //         .set("Authorization", `Bearer ${token}`) // Include token
    //         .expect(400);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.body.message).toBe("User ID or UUID is required");
    // });

    it("should return 404 if cart not found", async () => {
        const customer = await User.create({
            name: "Customer",
            email: "customer@example.com",
            password: await bcrypt.hash("password", 10),
            role: "customer",
        });

        const loginResponse = await request(app).post("/api/users/login").send({
            email: "customer@example.com",
            password: "password",
        });

        const token = loginResponse.body.token;
        expect(token).toBeDefined();

        const response = await request(app)
            .get("/api/cart")
            .set("Authorization", `Bearer ${token}`)
            .query({ uuid: "non-existent-uuid" })
            .expect(404);

        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Cart not found");
    });

    it("should return an empty cart if no items exist", async () => {
        const customer = await User.create({
            name: "Customer",
            email: "customer@example.com",
            password: await bcrypt.hash("password", 10),
            role: "customer",
        });

        const loginResponse = await request(app).post("/api/users/login").send({
            email: "customer@example.com",
            password: "password",
        });

        const token = loginResponse.body.token;
        expect(token).toBeDefined();

        await Cart.create({
            user: customer._id,
            uuid: "test-uuid",
            cartItems: [], // Empty cart
        });

        const response = await request(app)
            .get("/api/cart")
            .set("Authorization", `Bearer ${token}`)
            .query({ uuid: "test-uuid" })
            .expect(200);

        expect(response.body).toHaveProperty("cartItems");
        expect(response.body.cartItems.length).toBe(0);
    });

    it("should return 500 if there is a database error", async () => {
        jest.spyOn(Cart, "findOne").mockImplementation(() => {
            throw new Error("Database error");
        });

        const customer = await User.create({
            name: "Customer",
            email: "customer@example.com",
            password: await bcrypt.hash("password", 10),
            role: "customer",
        });

        const loginResponse = await request(app).post("/api/users/login").send({
            email: "customer@example.com",
            password: "password",
        });

        const token = loginResponse.body.token;
        expect(token).toBeDefined();

        const response = await request(app)
            .get("/api/cart")
            .set("Authorization", `Bearer ${token}`)
            .query({ uuid: "test-uuid" })
            .expect(500);

        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Internal server error");

        jest.restoreAllMocks(); // Restore mocked function
    });
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
