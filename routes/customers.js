const router = require('express').Router();
const Customers = require('../db/customersdb');
const {
  validatePutCustomer,
  validatePostCustomer
} = require('../validation/customer');

router.post('/', async (req, res) => {
  const result = validatePostCustomer(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const customer = new Customers({ ...req.body });

  res.send(await customer.save());
});

router.get('/', async (req, res) => {
  const customer = await Customers.find();
  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customers.findById({ _id: req.params.id });
  if (!customer) return res.status(400).send('Customer was not found');
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const result = validatePutCustomer(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const customer = await Customers.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        ...req.body
      }
    },
    { new: true }
  );

  if (!customer) return res.status(400).send('Customer was not found');

  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customers.findByIdAndRemove({ _id: req.params.id });
  if (!customer) return res.status(400).send('Customer was not found');
  res.send(customer);
});

module.exports = router;
