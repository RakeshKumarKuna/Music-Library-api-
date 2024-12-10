const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const Artist = require('./artist');
const bcrypt = require('bcryptjs');

// Define the Album model
const Album = sequelize.define('albumtwo', {
    album_id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4, // Automatically generates a UUID
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    artist_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Artist, // Reference the Artist model
            key: 'artist_id',
        },
        onDelete: 'CASCADE', // Optional: Automatically delete albums if the artist is deleted
    },
});

// Sync the model with the database
sequelize.sync({ force: true }).then(() => {
    console.log('Album model synced with the database');
});

module.exports = Album;
