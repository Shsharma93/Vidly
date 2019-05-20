const router = require('express').Router();
const uuid = require('uuid/v4');
const movies = require('../db');
const Joi = require('@hapi/joi');

validateMovie = movie => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(movie, schema);
};

movieExists = movie => movies.find(m => m.id === movie);

router.get('/', (req, res) => {
  // console.log(req.query.name); ?name="Shashank"&age=25
  res.send(movies);
});

router.get('/:id', (req, res) => {
  const movie = movieExists(+req.params.id);
  if (!movie) return res.status(400).send('Movie was not found');
  res.send(movie);
});

router.post('/', (req, res) => {
  const result = validateMovie(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  const movie = {
    id: uuid(),
    name: req.body.name
  };
  movies.push(movie);
  res.send(movie);
});

router.put('/:id', (req, res) => {
  const movie = movieExists(+req.params.id);
  if (!movie) return res.status(400).send('Movie was not found');

  const result = validateMovie(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const movieIndex = movies.indexOf(movie);

  const updatedMovie = {
    ...movie,
    name: req.body.name
  };
  movies[movieIndex] = updatedMovie;

  res.send(updatedMovie);
});

router.delete('/:id', (req, res) => {
  const movie = movieExists(+req.params.id);
  if (!movie) return res.status(400).send('Movie was not found');

  const movieIndex = movies.indexOf(movie);
  movies.splice(movieIndex, 1);
  res.send(movie);
});

module.exports = router;
