const modelLogin = require('../models/login');

const err = {
  fieldRequired: 'All fields must be filled',
  fieldIvalid: 'Incorrect username or password',
};

const validateEmail = (email) => {
  if (!email) return { message: err.fieldRequired };
  return false;
};

const validatePassword = (password) => {
  if (!password) return { message: err.fieldRequired };
  return false;
};

const verifyEmail = async (email) => {
  const searchEmailUser = await modelLogin.searchEmailUser(email);
  if (!searchEmailUser) return { message: err.fieldIvalid };
};

module.exports = {
  validateEmail,
  validatePassword,
  verifyEmail,
};
