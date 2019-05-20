const debug = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const home = require('./routes/home');
const movies = require('./routes/movies');
const { auth, logger } = require('./middleware/middleware');
const express = require('express');
const app = express();

app.use(express.json());

//Configuration
debug(`Application Name: ${config.get('name')}`);
debug(`Mail Server: ${config.get('mail.host')}`);

//export DEBUG=app:startup
dbDebugger('Connected to Database');

//middleware
app.use(auth);
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/movies', movies);
app.use('/', home);

//process.env.NODE_ENV
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
}

const port = process.env.PORT || 3000;
app.listen(port, debug(`Listening to port ${port}`));
