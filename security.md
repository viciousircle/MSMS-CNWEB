# Security Implementation Documentation

## Overview

This document outlines the security measures implemented in our application, with direct links to the relevant code files and explanations of each security feature.

## 1. CORS (Cross-Origin Resource Sharing) Protection

**Implementation**: [backend/server.js](backend/server.js)

### Current Implementation

```javascript
const allowedOrigins = [
    'https://msms-cnweb-v2.vercel.app',
    'http://localhost:5173',
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                return callback(null, origin);
            }
            return callback(new Error('CORS policy violation'), false);
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true,
        // ... other CORS settings
    })
);
```

### Security Features

-   Strict origin validation
-   Specific allowed methods
-   Controlled header exposure
-   Credentials handling
-   Preflight request handling

## 2. Authentication & Authorization

**Implementation**:

-   [backend/middleware/auth.middleware.js](backend/middleware/auth.middleware.js)
-   [backend/controllers/user.controller.js](backend/controllers/user.controller.js)

### JWT Implementation

```javascript
// Token Generation
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// Token Verification
const protect = asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization?.startsWith('Bearer')
        ? req.headers.authorization.split(' ')[1]
        : null;
    // ... token verification logic
});
```

### Role-Based Access Control

```javascript
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403);
            throw new Error('Not authorized for this action');
        }
        next();
    };
};
```

## 3. Data Validation & Sanitization

**Implementation**:

-   [backend/models/user.model.js](backend/models/user.model.js)
-   [backend/models/product.model.js](backend/models/product.model.js)
-   [backend/models/order.model.js](backend/models/order.model.js)

### Mongoose Schema Validation

```javascript
// User Model Example
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    role: {
        type: String,
        enum: ['admin', 'seller', 'customer'],
        default: 'customer',
    },
});
```

## 4. Password Security

**Implementation**: [backend/controllers/user.controller.js](backend/controllers/user.controller.js)

### Password Hashing

```javascript
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
```

### Password Verification

```javascript
if (user && (await bcrypt.compare(password, user.password))) {
    // Authentication successful
}
```

## 5. Error Handling

**Implementation**: [backend/middleware/error.middleware.js](backend/middleware/error.middleware.js)

### Global Error Handler

-   Centralized error handling
-   Secure error responses
-   No sensitive data exposure

## 6. Database Security

**Implementation**: [backend/config/db.js](backend/config/db.js)

### Connection Security

```javascript
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in .env file');
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // ... connection logging
    } catch (error) {
        // ... error handling
    }
};
```

## 7. Route Protection

**Implementation**:

-   [backend/routes/user.routes.js](backend/routes/user.routes.js)
-   [backend/routes/admin.routes.js](backend/routes/admin.routes.js)

### Protected Routes Example

```javascript
// Public routes
router.post('/', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', protect, getMe);
router.put('/:id', protect, authorize('admin'), updateUser);
```
