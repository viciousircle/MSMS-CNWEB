// @desc: Register new user
// @route: POST /api/users
// @access: Public
const registerUser = async (req, res) => {
    res.json({ message: "Register User" });
};

// @desc: Authenticate user
// @route: POST /api/users/login
// @access: Public
const loginUser = async (req, res) => {
    res.json({ message: "login User" });
};

// @desc: Get user data
// @route: GET /api/users/me
// @access: Public
const getMe = async (req, res) => {
    res.json({ message: "Get User Data" });
};

module.exports = { registerUser, loginUser, getMe };
