const User = require('../models/user'); 
const bcrypt = require('bcryptjs'); 

// Get all users created by the admin
exports.getUsers = async (req, res) => {
    try {
        const adminId = req.user.user_id;  
        const adminRole = req.user.role;

        // Verify if the logged-in user is an Admin
        if (adminRole !== 'admin') {
            return res.status(401).json({
                status: 401,
                data: null,
                message: "Unauthorized Access",
                error: null,
            });
        }

        // Query Parameters
        const limit = parseInt(req.query.limit, 10) || 5;  // Default limit is 5
        const offset = parseInt(req.query.offset, 10) || 0;  // Default offset is 0
        const roleFilter = req.query.role;

        // Query conditions
        const whereCondition = {}; 

        if (roleFilter) {
            whereCondition.role = roleFilter;  
        }

        // Fetch users with pagination and filtering
        const users = await User.findAll({
            where: whereCondition,
            limit,
            offset,
            attributes: { exclude: ['password'] },  
        });

        res.status(200).json({
            status: 200,
            data: users,
            message: 'Users retrieved successfully',
            error: null,
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            data: null,
            message: 'Internal Server Error',
            error: err.message,
        });
    }
};

// Add a new user (only accessible by admin)
exports.addUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

       
        if (role === 'admin') {
            return res.status(401).json({
                "status": 401,
                "data": null,
                "message": "Unauthorized Access",
                "error": null
            });
        }

        // Check if user already exists with the given email
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                status: 409,
                data: null,
                message: 'Email already exists.',
                error: null,
            });
        }

        // Create the new user
        const newUser = await User.create({
            email,
            password,  
            role,
        });

        res.status(201).json({
            "status": 201,
            "data": null,
            "message": "User created successfully.",
            "error": null
        });
    } catch (err) {
        res.status(400).json({
            "status": 400,
            "data": null,
            "message": "Bad Request",
            "error": null
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;  // Get the user ID from the URL parameter

        // Check if the user exists
        const userToDelete = await User.findByPk(userId);

        if (!userToDelete) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: "User not found",
                error: null,
            });
        }

        // Delete the user
        await userToDelete.destroy();

        res.status(200).json({
            status: 200,
            data: null,
            message: 'User deleted successfully',
            error: null,
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            data: null,
            message: 'Internal Server Error',
            error: err.message,
        });
    }
};
exports.updatePassword = async (req, res) => {
    try {
        const { old_password, new_password } = req.body;
        const userId = req.user.user_id; // Get the user ID from the authenticated request
        
        // Check if the old password and new password are provided
        if (!old_password || !new_password) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: "Old password and new password are required",
                error: null
            });
        }

        // Fetch the user from the database
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: "User not found",
                error: null
            });
        }

        // Check if the old password matches the stored password
        const isMatch = await bcrypt.compare(old_password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: 401,
                data: null,
                message: "Old password is incorrect",
                error: null
            });
        }
          // Hash the new password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(new_password, salt);
  
          // Update the password in the database
          user.password = hashedPassword;
          await user.save();

        res.status(200).json({
            status: 200,
            data: null,
            message: 'Password updated successfully',
            error: null
        });

    } catch (err) {
        res.status(500).json({
            status: 500,
            data: null,
            message: 'Internal Server Error',
            error: err.message,
        });
    }
};