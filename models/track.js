const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const Album = require('./album');
const Artist = require('./artist');

// Define the Track model
const Track = sequelize.define('track', {
    track_id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4, // Automatically generates a UUID
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER, // Duration in seconds
        allowNull: false,
    },
    hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

// Associations
Track.belongsTo(Album, {
    foreignKey: 'album_id',
    as: 'album',
});

Track.belongsTo(Artist, {
    foreignKey: 'artist_id',
    as: 'artist',
});


// Sync the model with the database
sequelize.sync({ force: true }).then(() => {
    console.log('Track model synced with the database');
});

module.exports = Track;
