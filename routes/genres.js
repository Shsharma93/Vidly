const router = require('express').Router();
const { Genres } = require('../model/Genre');
const validateGenre = require('../validation/genre');
const auth = require('../middleware/auth');

//Read

router.get('/', async (req, res) => {
  const genres = await Genres.find()
    .limit(20)
    .sort({ name: 1 })
    .select({ name: 1 });
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  const genre = await Genres.findById({ _id: req.params.id });
  if (!genre) return res.status(400).send('Genre was not found');
  res.send(genre);
});

//Write

router.post('/', auth, async (req, res) => {
  const result = validateGenre(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const genre = new Genres({
    name: req.body.name
  });

  await genre.save();
  res.send(genre);
});

//Update

router.put('/:id', async (req, res) => {
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
  if (!genre) return res.status(400).send('Genre was not found');

  res.send(genre);
});

//Delete

router.delete('/:id', async (req, res) => {
  const genre = await Genres.findByIdAndRemove({ _id: req.params.id });
  if (!genre) return res.status(400).send('Genre was not found');

  res.send(genre);
});

module.exports = router;
