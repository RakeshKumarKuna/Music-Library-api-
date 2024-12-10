const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

// User model definition
const User = sequelize.define('usertbl',{
  user_id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4, // Automatically generate UUID
    primaryKey: true,               // Set as primary key
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,                    // Ensure unique email
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,                // Password cannot be null
  },
  role: {
    type: DataTypes.ENUM('admin', 'editor', 'viewer'),
    allowNull: false,                // Role must be provided
    defaultValue: 'viewer',          
  },
},
);


// Sync the model with the database
sequelize.sync({ force: true }).then(() => {
  console.log('User model synced with the database');
});

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User;
