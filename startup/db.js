const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

module.exports = () => {
  mongoose
    .connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
    .then(() => console.log('connected to mongoDB'));
};
