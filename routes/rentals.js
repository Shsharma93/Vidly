const router = require('express').Router();
const validateRental = require('../validation/rental');
const Rentals = require('../model/Rentals');
const Movies = require('../model/Movies');
const Customer = require('../model/Customers');
const mongoose = require('mongoose');
const Fawn = require('fawn');

Fawn.init(mongoose);

router.get('/', async (req, res) => {
  const rentals = await Rentals.find().sort('-dateOut');
  res.send(rentals);
});

router.get('/:id', async (req, res) => {
  const rental = await Rentals.findById({ _id: req.params.id });
  if (!rental) return res.status(400).send('Rental was not found');
  res.send(rental);
});

router.post('/', async (req, res) => {
  const result = validateRental(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid Customer.');

  const movie = await Movies.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Movie was not found');

  const rental = new Rentals({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  try {
    new Fawn.Task()
      .save('rentals', rental)
      .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
      .run();
  } catch (ex) {
    res.status(500).send('Something failed');
  }

  res.send(rental);
});

module.exports = router;
