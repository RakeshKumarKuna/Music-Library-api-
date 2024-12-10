const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const artistRoutes=require('./routes/artistRoutes');
const albumRoutes=require('./routes/albumRoutes');
const trackRoutes = require('./routes/trackRoutes');
const Artist = require('./models/artist');
const Album = require('./models/album');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use('/api/v1', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/artists', artistRoutes);
app.use('/api/v1/albums',albumRoutes)
app.use('/api/v1/tracks', trackRoutes);

// Database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully!');
        return sequelize.sync();
    })
    .then(() => {
        console.log('Tables synced successfully!');
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });
  

// Define associations
Artist.hasMany(Album, { foreignKey: 'artist_id', onDelete: 'CASCADE' });
Album.belongsTo(Artist, { foreignKey: 'artist_id' });

module.exports = { Artist, Album };


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
