const express = require('express');
const uuid = require('uuid/v4');
const Joi = require('@hapi/joi');

const app = express();
app.use(express.json()); //app.use(express.urlencoded())

const movies = [
  { id: 1, name: 'Nirja' },
  { id: 2, name: 'Dangal' },
  { id: 3, name: 'Pink' },
  { id: 4, name: 'Drishyam' }
];

validateMovie = movie => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(movie, schema);
};

movieExists = movie => movies.find(m => m.id === movie);

app.get('/api/movies', (req, res) => {
  // console.log(req.query.name); ?name="Shashank"&age=25
  res.send(movies);
});

app.get('/api/movies/:id', (req, res) => {
  const movie = movieExists(+req.params.id);
  if (!movie) return res.status(400).send('Movie was not found');
  res.send(movie);
});

app.post('/api/movies', (req, res) => {
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

app.put('/api/movies/:id', (req, res) => {
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

app.delete('/api/movies/:id', (req, res) => {
  const movie = movieExists(+req.params.id);
  if (!movie) return res.status(400).send('Movie was not found');

  const movieIndex = movies.indexOf(movie);
  movies.splice(movieIndex, 1);
  res.send(movie);
});

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening to port ${port}`));
