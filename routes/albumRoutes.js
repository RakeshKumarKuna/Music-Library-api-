const express = require('express');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { createAlbum, getAlbumById, getAllAlbums, updateAlbum, deleteAlbum } = require('../controllers/albumController');

const router = express.Router();

// Create a new album (only admins can create albums)
router.post('/add-album', authenticate, authorize(['admin']), createAlbum);

// Get a specific album by ID
router.get('/albums/:id', authenticate, getAlbumById);

// Get all albums
router.get('/', authenticate, getAllAlbums);

// Update an album by ID
router.put('/:id', authenticate, authorize(['admin']), updateAlbum);

// Delete an album by ID
router.delete('/:id', authenticate, authorize(['admin']), deleteAlbum);

module.exports = router;
