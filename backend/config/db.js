const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config();
colors.enable();

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in .env file");
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(
            `MongoDB Connected: ${conn.connection.host}`.cyan.underline
        );
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
};

module.exports = connectDB;
