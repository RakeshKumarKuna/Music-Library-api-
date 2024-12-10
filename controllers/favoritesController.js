const Favorite = require('../models/Favorite');

// Add a favorite item
const addFavorite = async (req, res) => {
  try {
    const { category, item_id } = req.body;
    const user_id = req.user.id; // Assuming `req.user` contains the authenticated user info

    if (!['artist', 'album', 'track'].includes(category)) {
      return res.status(400).json({ message: 'Invalid category. Choose from artist, album, or track.' });
    }

    // Check if the favorite already exists
    const existingFavorite = await Favorite.findOne({
      where: { category, item_id, user_id },
    });

    if (existingFavorite) {
      return res.status(409).json({ message: 'Favorite already exists.' });
    }

    // Create a new favorite
    const newFavorite = await Favorite.create({ category, item_id, user_id });

    res.status(201).json({
      message: 'Favorite added successfully.',
      favorite: newFavorite,
    });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { addFavorite };
