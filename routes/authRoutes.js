const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

// Auth routes
router.post('/signup', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Protected routes
router.get('/admin', authenticate, authorize(['admin']), (req, res) => {
    res.status(200).json({ message: 'Welcome, admin!' });
});

router.get('/user', authenticate, authorize(['user', 'admin']), (req, res) => {
    res.status(200).json({ message: 'Welcome, user!' });
});

module.exports = router;

