const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin' // Default role is set to 'admin'
  }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
