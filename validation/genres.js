const Joi = require('@hapi/joi');

validateGenre = genre => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(genre, schema);
};

module.exports = validateGenre;
