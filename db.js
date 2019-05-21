const mongoose = require('mongoose');

const moviesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  }
});

const Movies = mongoose.model('Movies', moviesSchema);

// const movies = [
//   { id: 1, name: 'Nirja' },
//   { id: 2, name: 'Dangal' },
//   { id: 3, name: 'Pink' },
//   { id: 4, name: 'Drishyam' }
// ];

module.exports = Movies;
