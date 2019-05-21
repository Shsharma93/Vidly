const Joi = require('@hapi/joi');

validateMovie = movie => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(movie, schema);
};
module.exports = validateMovie;
