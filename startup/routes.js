const express = require('express');
const helmet = require('helmet');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const login = require('../routes/login');
const error = require('../middleware/error');
const home = require('../routes/home');
const genres = require('../routes/genres');
const customers = require('../routes/customers');

module.exports = app => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(helmet());
  app.use('/api/genres', genres);
  app.use('/api/customers', customers);
  app.use('/', home);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rentals);
  app.use('/api/users', users);
  app.use('/api/login', login);
  app.use(error);
};
