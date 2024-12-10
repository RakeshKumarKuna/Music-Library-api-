const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

// Define the Artist model
const Artist = sequelize.define('Artist', {
    artist_id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4, // Automatically generates a UUID
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    grammy: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
},
);


// Sync the model with the database
sequelize.sync({ force: true }).then(() => {
    console.log('Artist model synced with the database');
  });
  
 
module.exports = Artist;
