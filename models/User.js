const mongoose = require('mongoose');

// we create scheme:
const userSchema = mongoose.Schema({
  email: String,
  password: String,
});

// we create the model:
const User = mongoose.model('User', userSchema);

module.exports = User;
