const router = require('express').Router();
const Movies = require('../db');
const Joi = require('@hapi/joi');

validateMovie = movie => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(movie, schema);
};

//Read

router.get('/', async (req, res) => {
  const movies = await Movies.find()
    .limit(5)
    .sort({ name: 1 })
    .select({ name: 1 });
  res.send(movies);
});

router.get('/:id', async (req, res) => {
  const movie = await Movies.findById({ _id: req.params.id });
  if (!movie) return res.status(400).send('Movie was not found');
  res.send(movie);
});

//Write

router.post('/', async (req, res) => {
  const result = validateMovie(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let movie = new Movies({
    name: req.body.name
  });
  movie = await movie.save();
  res.send(movie);
});

//Update

router.put('/:id', async (req, res) => {
  const result = validateMovie(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const movie = await Movies.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name
      }
    },
    { new: true }
  );
  if (!movie) return res.status(400).send('Movie was not found');

  res.send(movie);
});

//Delete

router.delete('/:id', async (req, res) => {
  const movie = await Movies.findByIdAndRemove({ _id: req.params.id });
  if (!movie) return res.status(400).send('Movie was not found');

  res.send(movie);
});

module.exports = router;
