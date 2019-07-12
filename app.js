const debug = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const config = require('config');
const express = require('express');
const app = express();
require('./startup/routes')(app);
require('dotenv').config();
require('./startup/db')();

if (!process.env.TOKEN_SECRET) {
  console.error('FATAL ERROR: TOKEN_SECRET is not deifned');
  process.exit(1);
}

//Configuration
debug(`Application Name: ${config.get('name')}`);
debug(`Mail Server: ${config.get('mail.host')}`);

//export DEBUG=app:startup
dbDebugger('Connected to Database');

//process.env.NODE_ENV
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
}

const port = process.env.PORT || 3000;
app.listen(port, debug(`Listening to port ${port}`));
