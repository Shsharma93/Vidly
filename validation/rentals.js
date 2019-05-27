const Joi = require('@hapi/joi');

validateRental = rental => {
  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
  };
  return Joi.validate(rental, schema);
};

module.exports = validateRental;
