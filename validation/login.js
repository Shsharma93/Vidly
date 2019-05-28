const Joi = require('@hapi/joi');

validateUser = user => {
  const schema = {
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .min(8)
      .max(32)
      .required()
  };
  return Joi.validate(user, schema);
};

module.exports = validateUser;
