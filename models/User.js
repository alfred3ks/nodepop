const mongoose = require('mongoose');
// Cargamos bcrypt:
const bcrypt = require('bcrypt');

// we create scheme:
const userSchema = mongoose.Schema({
  email: String,
  password: String,
});

// static method for password hash:
userSchema.statics.hashPassword = function (passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 7);
};

// we create the model:
const User = mongoose.model('User', userSchema);

module.exports = User;
