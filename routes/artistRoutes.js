const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const { getArtistById,updateArtistById,deleteArtistById } = require('../controllers/artistController');
const { authenticate } = require('../middlewares/authMiddleware');

// Add a new artist
router.post('/add-artist', artistController.addArtist);

// Get all artists
router.get('/', artistController.getAllArtists);

// Update artist visibility (hidden or not)
router.put('/:id/visibility', artistController.updateArtistVisibility);
router.get('/:id', authenticate, getArtistById);
router.put('/:id', authenticate, updateArtistById);
router.delete('/:id', authenticate, deleteArtistById);


module.exports = router;
