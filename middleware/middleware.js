const auth = (req, res, next) => {
  console.log('Authnticating...');
  next();
};

const logger = (req, res, next) => {
  console.log('Logging...');
  next();
};

module.exports = { auth, logger };
