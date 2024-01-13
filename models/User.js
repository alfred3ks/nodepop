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

// instance method that checks a user's password:
userSchema.methods.comparePassword = function (passwordInClear) {
  return bcrypt.compare(passwordInClear, this.password);
};

// we create the model:
const User = mongoose.model('User', userSchema);

module.exports = User;
