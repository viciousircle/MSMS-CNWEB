const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe,
} = require("../controllers/user.controller");

const { protect } = require("../middleware/auth.middleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
