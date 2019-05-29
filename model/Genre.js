const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  }
});

const Genres = mongoose.model('Genres', genreSchema);

module.exports = { Genres, genreSchema };
