const debug = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const login = require('./routes/login');
const error = require('./middleware/error');

require('dotenv').config();

if (!process.env.TOKEN_SECRET) {
  console.error('FATAL ERROR: TOKEN_SECRET is not deifned');
  process.exit(1);
}

mongoose.set('useCreateIndex', true);

mongoose
  .connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
  .then(() => dbDebugger('connected to mongoDB'))
  .catch(err => dbDebugger('Could not connect to mongodb', err));

app.use(express.json());

//Configuration
debug(`Application Name: ${config.get('name')}`);
debug(`Mail Server: ${config.get('mail.host')}`);

//export DEBUG=app:startup
dbDebugger('Connected to Database');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/', home);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/login', login);
app.use(error);

//process.env.NODE_ENV
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
}

const port = process.env.PORT || 3000;
app.listen(port, debug(`Listening to port ${port}`));

//_id: "5cec0b278a5596143bd9ca59"

// 12 bytes - Total
// 4 bytes: timestamp
// 3 bytes: machine identifier
// 2 bytes: process identifier
// 3 bytes: counter

//const id = new mongoose.Types.ObjectId();
//console.log(id.getTimestamp());
//console.log(mongoose.Types.ObjectId.isValid('1234'));
