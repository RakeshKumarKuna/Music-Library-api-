const Track = require('../models/track');

// Create a new track
exports.createTrack = async (req, res) => {
    try {
        const { name, duration, album_id, artist_id } = req.body;

        // Create new track
        const track = await Track.create({
            name,
            duration,
            album_id,
            artist_id,
        });

        res.status(201).json({
            status: 201,
            data: track,
            message: 'Track created successfully',
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

// Retrieve a track by ID
exports.getTrack = async (req, res) => {
    try {
        const { id } = req.params;
       
        const track =await Track.findOne({
            where: { track_id:id},
          });
      

        if (!track) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: 'Track not found',
                error: null,
            });
        }

        res.status(200).json({
            status: 200,
            data: track,
            message: 'Track retrieved successfully',
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

// Delete a track by ID
exports.deleteTrack = async (req, res) => {
    try {
        const { id } = req.params;

        const track = await Track.findByPk(id);
        if (!track) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: 'Track not found',
                error: null,
            });
        }

        await track.destroy();

        res.status(200).json({
            status: 200,
            data: null,
            message: 'Track deleted successfully',
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
exports.updateTrack = async (req, res) => {
    const { id } = req.params; // Track ID from the URL
    const { name, duration, hidden } = req.body; // Updated fields

    try {
        // Find the track by its ID
        const track = await Track.findByPk(id);

        if (!track) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: 'Track not found',
                error: null,
            });
        }

        // Update the track's details
        track.name = name ?? track.name;
        track.duration = duration ?? track.duration;
        track.hidden = hidden ?? track.hidden;

        await track.save();

        res.status(200).json({
            status: 200,
            data: track,
            message: 'Track updated successfully',
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
