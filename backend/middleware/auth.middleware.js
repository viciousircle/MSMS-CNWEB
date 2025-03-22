const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");

/**
 * @description Middleware to protect private routes
 */
const protect = asyncHandler(async (req, res, next) => {
    let token =
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
            ? req.headers.authorization.split(" ")[1]
            : null;

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }

    try {
        // - Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // - Get user from token
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            res.status(401);
            throw new Error("User not found");
        }

        next();
    } catch (error) {
        console.error("JWT Error:", error);
        res.status(401);
        throw new Error("Not authorized, invalid token");
    }
});

/**
 * @description Middleware for role-based access
 * @param {...string} roles - Allowed roles
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403);
            throw new Error("Not authorized for this action");
        }
        next();
    };
};

module.exports = { protect, authorize };
