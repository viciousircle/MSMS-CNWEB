jest.mock("../config/db", () => ({
    connectDB: jest.fn(), // - Mock the DB connection to avoid conflicts
}));

const request = require("supertest");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { app } = require("../server");
const User = require("../models/user.model");
const { generateToken } = require("../controllers/user.controller");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

// --- Test cases POST /api/users ----------------------------------------------

describe("POST /api/users (Register User)", () => {
    it("should register a new user and return user details with token", async () => {
        const userData = {
            name: "John Doe",
            email: "johndoe@example.com",
            password: "password123",
            role: "seller",
        };

        const response = await request(app)
            .post("/api/users")
            .send(userData)
            .expect(201);

        expect(response.body).toHaveProperty("_id");
        expect(response.body.name).toBe(userData.name);
        expect(response.body.email).toBe(userData.email);
        expect(response.body.role).toBe(userData.role);
        expect(response.body).toHaveProperty("token");
    });

    it("should return 400 if required fields are missing", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({ email: "missing@example.com" }) // - Missing name & password
            .expect(400);

        expect(response.body.message).toBe("Please fill all the fields");
    });

    it("should return 400 if user already exists", async () => {
        const userData = {
            name: "Jane Doe",
            email: "janedoe@example.com",
            password: "password123",
            role: "customer",
        };

        // - Create user first
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await User.create({ ...userData, password: hashedPassword });

        // - Attempt to register again
        const response = await request(app)
            .post("/api/users")
            .send(userData)
            .expect(400);

        expect(response.body.message).toBe("User already exists");
    });
});
