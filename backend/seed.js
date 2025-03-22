const dotenv = require("dotenv");
const connectDB = require("./config/db");
const seedOrders = require("./seed/order.seed");
const colors = require("colors");

dotenv.config({ path: "../.env" });
colors.enable();

connectDB()
    .then(() => {
        console.log("Database connected successfully".bgGreen);
        return seedOrders();
    })
    .catch((err) => {
        console.error("Seeding error:", err);
        process.exit(1);
    });
