const express = require('express');
const { getUsers,addUser,deleteUser,updatePassword } = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Define routes
router.get('/', authenticate, getUsers);
router.post('/add-user', authenticate, authorize(['admin']), addUser);
router.delete('/:id', authenticate, authorize(['admin']), deleteUser);
router.put('/update-password', authenticate, updatePassword);
module.exports = router;
