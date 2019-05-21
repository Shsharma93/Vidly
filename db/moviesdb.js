const mongoose = require('mongoose');

const moviesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  }
});

const Movies = mongoose.model('Movies', moviesSchema);

module.exports = Movies;
