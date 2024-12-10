const Artist = require('../models/artist');

// Add a new artist
exports.addArtist = async (req, res) => {
    try {
        const { name, grammy, hidden } = req.body;

        // Create new artist
        const artist = await Artist.create({
            name,
            grammy,
            hidden,
        });

        res.status(201).json({
            "status": 201,
            "data": null,
            "message": "Artist created successfully.",
            "error": null
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

// Fetch all artists
exports.getAllArtists = async (req, res) => {
    try {
        const artists = await Artist.findAll({
            where: {
                hidden: false,
            },
        });

        res.status(200).json({
            status: 200,
            data: artists,
            message: 'Artists retrieved successfully',
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

// Update artist visibility
exports.updateArtistVisibility = async (req, res) => {
    try {
        const artistId = req.params.id;
        const { hidden } = req.body;

        const artist = await Artist.findByPk(artistId);
        if (!artist) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: 'Artist not found',
                error: null,
            });
        }

        artist.hidden = hidden;
        await artist.save();

        res.status(200).json({
            status: 200,
            data: artist,
            message: 'Artist visibility updated successfully',
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
exports.getArtistById = async (req, res) => {
    try {
      const artistId = req.params.id;
  
      // Fetch the artist by ID from the database
      const artist = await Artist.findOne({
        where: { artist_id: artistId },
      });
  
      if (!artist) {
        return res.status(404).json({
          status: 404,
          message: 'Artist not found',
          data: null,
          error: null,
        });
      }
  
      res.status(200).json({
        status: 200,
        message: 'Artist retrieved successfully',
        data: artist,
        error: null,
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
        data: null,
        error: err.message,
      });
    }
  };


  exports.updateArtistById = async (req, res) => {
    try {
      const artistId = req.params.id;
      const { name, grammy, hidden } = req.body;
  
      // Find the artist by ID
      const artist = await Artist.findOne({
        where: { artist_id: artistId },
      });
  
      if (!artist) {
        return res.status(404).json({
          status: 404,
          message: 'Artist not found',
          data: null,
          error: null,
        });
      }
  
      // Update artist details
      artist.name = name || artist.name;
      artist.grammy = grammy !== undefined ? grammy : artist.grammy;
      artist.hidden = hidden !== undefined ? hidden : artist.hidden;
  
      // Save the updated artist
      await artist.save();
  
      res.status(200).json({
        status: 200,
        message: 'Artist updated successfully',
        data: artist,
        error: null,
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
        data: null,
        error: err.message,
      });
    }
  };


  exports.deleteArtistById = async (req, res) => {
    try {
      const artistId = req.params.id;
  
      // Find the artist by ID
      const artist = await Artist.findOne({
        where: { artist_id: artistId },
      });
  
      if (!artist) {
        return res.status(404).json({
          status: 404,
          message: 'Artist not found',
          data: null,
          error: null,
        });
      }
  
      // Delete the artist
      await artist.destroy();
  
      res.status(200).json({
        status: 200,
        message: 'Artist deleted successfully',
        data: null,
        error: null,
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
        data: null,
        error: err.message,
      });
    }
  };