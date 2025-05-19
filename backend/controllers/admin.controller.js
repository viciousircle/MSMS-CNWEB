const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const mongoose = require('mongoose');

/**
 * @desc: Get all users
 * @route: GET /api/admin/users
 * @access: Private (admin only)
 */
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * @desc: Update user status
 * @route: PUT /api/admin/users/:id/status
 * @access: Private (admin only)
 */
const updateUserStatus = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const validStatuses = ['active', 'inactive'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Invalid status',
                validStatuses,
            });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.status = status;
        await user.save();

        res.status(200).json({
            message: 'User status updated successfully',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                status: user.status,
            },
        });
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * @desc: Update user role
 * @route: PUT /api/admin/users/:id/role
 * @access: Private (admin only)
 */
const updateUserRole = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const validRoles = ['customer', 'seller', 'admin'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({
                message: 'Invalid role',
                validRoles,
            });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save();

        res.status(200).json({
            message: 'User role updated successfully',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                status: user.status,
            },
        });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * @desc: Delete user
 * @route: DELETE /api/admin/users/:id
 * @access: Private (admin only)
 */
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.deleteOne();

        res.status(200).json({
            message: 'User deleted successfully',
            deletedUser: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = {
    getAllUsers,
    updateUserStatus,
    updateUserRole,
    deleteUser,
};
