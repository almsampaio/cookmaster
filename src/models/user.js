const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

exports.userModel = mongoose.model('users', userSchema);

exports.isValidID = mongoose.Types.ObjectId.isValid;
