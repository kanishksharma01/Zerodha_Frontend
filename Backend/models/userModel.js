const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
});

// Create User model from schema
const User = mongoose.model('User', userSchema);

module.exports = { User };
