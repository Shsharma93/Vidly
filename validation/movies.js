const Joi = require('@hapi/joi');

validateMovie = movie => {
  const schema = {
    title: Joi.string()
      .min(3)
      .required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number()
      .integer()
      .required()
      .min(0),
    dailyRentalRate: Joi.number()
      .integer()
      .min(1)
      .required()
      .max(20)
  };
  return Joi.validate(movie, schema);
};
module.exports = validateMovie;
