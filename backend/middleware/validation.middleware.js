const { body, param, query } = require('express-validator');

// Common validation rules
const commonRules = {
    email: body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),

    password: body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/\d/)
        .withMessage('Password must contain at least one number')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter'),

    name: body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]*$/)
        .withMessage('Name can only contain letters and spaces'),

    id: param('id').isMongoId().withMessage('Invalid ID format'),

    page: query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),

    limit: query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),
};

// Validation middleware for different routes
const validate = {
    // User validation
    register: [
        commonRules.name,
        commonRules.email,
        commonRules.password,
        body('role')
            .optional()
            .isIn(['customer', 'seller', 'admin'])
            .withMessage('Invalid role specified'),
    ],

    login: [
        commonRules.email,
        body('password').notEmpty().withMessage('Password is required'),
    ],

    // Product validation
    createProduct: [
        body('name')
            .trim()
            .isLength({ min: 3, max: 100 })
            .withMessage('Product name must be between 3 and 100 characters'),
        body('description')
            .trim()
            .isLength({ min: 10, max: 1000 })
            .withMessage('Description must be between 10 and 1000 characters'),
        body('price')
            .isFloat({ min: 0 })
            .withMessage('Price must be a positive number'),
        body('stock')
            .isInt({ min: 0 })
            .withMessage('Stock must be a non-negative integer'),
    ],

    // Order validation
    createOrder: [
        body('items')
            .isArray()
            .withMessage('Items must be an array')
            .notEmpty()
            .withMessage('Order must contain at least one item'),
        body('items.*.productId').isMongoId().withMessage('Invalid product ID'),
        body('items.*.quantity')
            .isInt({ min: 1 })
            .withMessage('Quantity must be at least 1'),
        body('shippingAddress')
            .isObject()
            .withMessage('Shipping address is required'),
        body('shippingAddress.street')
            .trim()
            .notEmpty()
            .withMessage('Street address is required'),
        body('shippingAddress.city')
            .trim()
            .notEmpty()
            .withMessage('City is required'),
        body('shippingAddress.postalCode')
            .trim()
            .notEmpty()
            .withMessage('Postal code is required'),
        body('shippingAddress.country')
            .trim()
            .notEmpty()
            .withMessage('Country is required'),
    ],

    // Cart validation
    updateCart: [
        body('quantity')
            .isInt({ min: 1 })
            .withMessage('Quantity must be at least 1'),
        commonRules.id,
    ],

    // Admin validation
    updateUser: [
        commonRules.id,
        body('status')
            .optional()
            .isIn(['active', 'inactive', 'suspended'])
            .withMessage('Invalid status'),
        body('role')
            .optional()
            .isIn(['customer', 'seller', 'admin'])
            .withMessage('Invalid role'),
    ],
};

module.exports = validate;
