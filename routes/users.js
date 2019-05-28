const _ = require('lodash');
const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('../db/usersdb');
const validateUser = require('../validation/user');

router.post('/', async (req, res) => {
  const result = validateUser(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let user = await Users.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered');

  user = new Users(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
