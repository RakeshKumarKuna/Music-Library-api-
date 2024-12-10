const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config();

// Register a new user
exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password) {
            const missingField = !email ? 'email' : !password ? 'password' : 'role';
            return res.status(400).json({
                status: 400,
                data: null,
                message: `Bad Request, Reason: Missing Field: ${missingField}`,
                error: null
            });
        }
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                status: 409,
                data: null,
                message: 'Email already exists.',
                error: null,
            });
        }
        else {
            const user = await User.create({ email, password, role });
            console.log(JSON.stringify(user));
            res.status(201).json({
                "status": 201,
                "data": null,
                "message": "User created successfully.",
                "error": null
            });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// User login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            const missingField = !email ? 'email' : !password ? 'password' : 'role';
            return res.status(400).json({
                status: 400,
                data: null,
                message: `Bad Request, Reason: Missing Field: ${missingField}`,
                error: null
            });
        }
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({  
            "status": 404, 
            "data": null, 
            "message": "User not found.", 
            "error": null  });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            "status": 200,
            "data": {
                "token": token,
            },
            "message": "Login successful.",
            "error": null
        });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const blacklist = new Set(); // Temporary in-memory blacklist for demonstration purposes.

exports.logout = (req, res) => {
    try {
        // Clear the token (depends on implementation, e.g., clearing client-side storage)
        res.status(200).json({
            status: 200,
            data: null,
            message: 'Logout successful',
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

// Middleware to check if the token is blacklisted (used in protected routes).
const isTokenBlacklisted = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (blacklist.has(token)) {
        return res.status(401).json({ message: 'Token is blacklisted' });
    }

    next();
};


