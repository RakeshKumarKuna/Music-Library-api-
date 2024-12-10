const jwt = require('jsonwebtoken');
require('dotenv').config();

// Verify JWT token
exports.authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);  
        req.user = {
            user_id: decoded.user_id, // Assign user_id from token payload
            role: decoded.role,       // Assign role from token payload
        };
        console.log('User:', req.user); 
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Role-based authorization
exports.authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
