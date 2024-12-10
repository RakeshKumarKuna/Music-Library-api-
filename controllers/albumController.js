const Album = require('../models/album');

// Create an album
exports.createAlbum = async (req, res) => {
  try {
    const { name, year, hidden,artist_id } = req.body;

    const newAlbum = await Album.create({
      name,
      year,
      hidden,
      artist_id
    });

    res.status(201).json({
      status: 201,
      data: newAlbum,
      message: 'Album created successfully',
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

// Get a specific album by ID
exports.getAlbumById = async (req, res) => {
  try {
    const albumId = req.params.id;
    const album = await Album.findOne({
      where: { album_id: albumId },
    });

    if (!album) {
      return res.status(404).json({
        status: 404,
        message: 'Album not found',
        data: null,
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: album,
      message: 'Album retrieved successfully',
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

// Get all albums
exports.getAllAlbums = async (req, res) => {
  try {
    const { limit = 5, offset = 0, hidden } = req.query;

    const whereCondition = {};
    if (hidden !== undefined) {
      whereCondition.hidden = hidden === 'true';
    }

    const albums = await Album.findAll({
      where: whereCondition,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    res.status(200).json({
      status: 200,
      data: albums,
      message: 'Albums retrieved successfully',
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

// Update an album by ID
exports.updateAlbum = async (req, res) => {
  try {
    const albumId = req.params.id;
    const { name, year, hidden } = req.body;

    const album = await Album.findOne({ where: { album_id: albumId } });

    if (!album) {
      return res.status(404).json({
        status: 404,
        message: 'Album not found',
        data: null,
        error: null,
      });
    }

    album.name = name || album.name;
    album.year = year || album.year;
    album.hidden = hidden !== undefined ? hidden : album.hidden;

    await album.save();

    res.status(200).json({
      status: 200,
      data: album,
      message: 'Album updated successfully',
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

// Delete an album by ID
exports.deleteAlbum = async (req, res) => {
  try {
    const albumId = req.params.id;
    const album = await Album.findOne({ where: { album_id: albumId } });

    if (!album) {
      return res.status(404).json({
        status: 404,
        message: 'Album not found',
        data: null,
        error: null,
      });
    }

    await album.destroy();

    res.status(200).json({
      status: 200,
      data: null,
      message: 'Album deleted successfully',
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
