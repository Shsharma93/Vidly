const router = require('express').Router();
const { Genres } = require('../model/Genre');
const validateGenre = require('../validation/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');

//Read

router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    const genres = await Genres.find()
      .limit(20)
      .sort({ name: 1 })
      .select({ name: 1 });
    res.send(genres);
  })
);

router.get(
  '/:id',
  asyncMiddleware(async (req, res) => {
    const genre = await Genres.findById({ _id: req.params.id });
    console.log(genre);
    if (!genre) throw new Error('ID genre could not be found');
    res.send(genre);
  })
);

//Write

router.post(
  '/',
  auth,
  asyncMiddleware(async (req, res) => {
    const result = validateGenre(req.body);
    if (result.error)
      return res.status(400).send(result.error.details[0].message);

    const genre = new Genres({
      name: req.body.name
    });

    await genre.save();
    res.send(genre);
  })
);

//Update

router.put(
  '/:id',
  auth,
  asyncMiddleware(async (req, res) => {
    const result = validateGenre(req.body);
    if (result.error)
      return res.status(400).send(result.error.details[0].message);

    const genre = await Genres.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name
        }
      },
      { new: true }
    );

    res.send(genre);
  })
);

//Delete

router.delete(
  '/:id',
  [auth, admin],
  asyncMiddleware(async (req, res) => {
    const genre = await Genres.findByIdAndRemove({ _id: req.params.id });
    res.send(genre);
  })
);

module.exports = router;
