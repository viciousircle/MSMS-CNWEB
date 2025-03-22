const mongoose = require("mongoose");

/**
 * @module models/User
 * @description Mongoose schema for the User model with roles.
 *
 * @typedef {Object} User
 * @property {string} name - Full name of the user.
 * @property {string} email - Unique email address.
 * @property {string} password - Hashed password.
 * @property {string} role - User role (admin, seller, customer).
 * @property {Date} createdAt - Timestamp when the user was created.
 * @property {Date} updatedAt - Timestamp when the user was last updated.
 */
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        role: {
            type: String,
            enum: ["admin", "seller", "customer"],
            default: "customer",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
