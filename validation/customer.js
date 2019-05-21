const Joi = require('@hapi/joi');

validatePostCustomer = customer => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    phone: Joi.string()
      .min(8)
      .max(10)
      .required(),
    isGold: Joi.boolean()
  };
  return Joi.validate(customer, schema);
};

validatePutCustomer = customer => {
  const schema = {
    name: Joi.string().min(3),
    phone: Joi.string()
      .min(8)
      .max(10),
    isGold: Joi.boolean()
  };
  return Joi.validate(customer, schema);
};

module.exports = { validatePostCustomer, validatePutCustomer };
