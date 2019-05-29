const mongoose = require('mongoose');

const customersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 10
  }
});

const Customers = mongoose.model('Customers', customersSchema);

module.exports = Customers;
