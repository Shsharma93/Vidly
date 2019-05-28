const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

validateRental = rental => {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };
  return Joi.validate(rental, schema);
};

module.exports = validateRental;
