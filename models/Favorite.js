const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const Favorite = sequelize.define('Favorite', {
  favorite_id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  category: {
    type: DataTypes.ENUM('artist', 'album', 'track'),
    allowNull: false,
  },
  item_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false, // Assume the user is authenticated
  },
}, 
);

module.exports = Favorite;
