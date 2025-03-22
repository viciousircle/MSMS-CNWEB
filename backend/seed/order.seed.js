const mongoose = require("mongoose");
const Order = require("../models/order.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const connectDB = require("../config/db");

mongoose
    .connect(
        "mongodb+srv://quyvtm227257:PKDTp2thaWfsp2wg@cluster0.vcmr7.mongodb.net/msms?retryWrites=true&w=majority&appName=Cluster0",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

const seedOrders = async () => {
    try {
        await Order.deleteMany(); // Clear old data

        // Fetch users and products from DB
        const users = await User.find();
        const products = await Product.find();

        if (users.length === 0 || products.length < 2) {
            console.log("❌ Add users and products first!");
            process.exit(1);
        }

        const fakeOrders = [
            {
                user: users[0]._id, // Assign a random user
                orderItems: [
                    {
                        product: products[0]._id,
                        quantity: 2,
                        price: products[0].price,
                    },
                    {
                        product: products[1]._id,
                        quantity: 1,
                        price: products[1].price,
                    },
                ],
                shippingAddress: {
                    fullName: "John Doee",
                    address: "123 Main Street",
                    city: "New York",
                    postalCode: "10001",
                    country: "USA",
                },
                paymentMethod: "PayPal",
                paymentStatus: "Paid",
                orderStatus: "Shipped",
                totalPrice: products[0].price * 2 + products[1].price,
                isPaid: true,
                paidAt: new Date(),
                deliveredAt: new Date(),
                rating: 5,
                review: "Great service! Fast shipping.",
            },
            {
                user: users[1]._id,
                orderItems: [
                    {
                        product: products[1]._id,
                        quantity: 3,
                        price: products[1].price,
                    },
                ],
                shippingAddress: {
                    fullName: "Alice Smith",
                    address: "456 Elm Street",
                    city: "Los Angeles",
                    postalCode: "90001",
                    country: "USA",
                },
                paymentMethod: "Credit Card",
                paymentStatus: "Pending",
                orderStatus: "Processing",
                totalPrice: products[1].price * 3,
                isPaid: false,
                rating: null, // Not yet rated
                review: "",
            },
        ];

        await Order.insertMany(fakeOrders);
        console.log("Fake Orders Added!");
        process.exit();
    } catch (error) {
        console.error("Error seeding orders:", error);
        process.exit(1);
    }
};

// Run the function
seedOrders();
