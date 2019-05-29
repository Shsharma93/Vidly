const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('../model/Users');
const validateUser = require('../validation/login');

router.post('/', async (req, res) => {
  const result = validateUser(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let user = await Users.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or Password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or Password');

  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
