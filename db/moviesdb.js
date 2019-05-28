const mongoose = require('mongoose');
const { genreSchema } = require('./genredb');

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  }
});

const Movies = mongoose.model('movies', movieSchema);

module.exports = Movies;
