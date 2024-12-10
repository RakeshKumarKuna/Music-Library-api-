const express = require('express');
const router = express.Router();
const { createTrack, getTrack, deleteTrack,updateTrack } = require('../controllers/trackController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

// Route to create a track
router.post('/add-track', authenticate, authorize(['admin']), createTrack);

// Route to get a track by ID
router.get('/:id', authenticate, getTrack);

// Route to delete a track by ID
router.delete('/:id', authenticate, authorize(['admin']), deleteTrack);
router.put('/:id', authenticate, updateTrack);
module.exports = router;
