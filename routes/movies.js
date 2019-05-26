const router = require('express').Router();
const Movies = require('../db/moviesdb');
const { Genres } = require('../db/genredb');
const validateMovie = require('../validation/movies');

router.get('/', async (req, res) => {
  const movies = await Movies.find();
  res.send(movies);
});

router.get('/:id', async (req, res) => {
  const movie = await Movies.findById({ _id: req.params.id });
  if (!movie) return res.status(400).send('Movie was not found');
  res.send(movie);
});

router.post('/', async (req, res) => {
  const result = validateMovie(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const genre = await Genres.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre');

  let movieInfo = {};

  for (let key in req.body) {
    if (key !== 'genreId') {
      movieInfo[key] = req.body[key];
    }
  }

  let movie = new Movies({
    ...movieInfo,
    genre: {
      ...genre
    }
  });
  movie = await movie.save();
  res.send(movie);
});

router.put('/:id', async (req, res) => {
  const result = validateMovie(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const movie = await Movies.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        ...req.body
      }
    },
    { new: true }
  );
  if (!movie) return res.status(400).send('Movie was not found');

  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  const movie = await Movies.findByIdAndRemove({ _id: req.params.id });
  if (!movie) return res.status(400).send('Movie was not found');

  res.send(movie);
});

module.exports = router;
