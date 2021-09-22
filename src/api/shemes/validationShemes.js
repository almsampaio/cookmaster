const usersModel = require('../models/usersModel');

const error = {
  invalidEntries: { code: 400, message: 'Invalid entries. Try again.' },
  emailAlreadyRegistered: { code: 409, message: 'Email already registered' },
};

const requiredFields = (name, email, password) => {
  const regexEmail = /\S+@\S+\.\S+/;
  if (!name || !email || !password || !email.match(regexEmail)) {
    return error.invalidEntries;
  }
  return {};
};

const emptyFields = (name, email, password) => {
  if (name === '' || email === '' || password === '') {
    return error.invalidEntries;
  }
  return {};
};

const emailAlreadyRegistered = async (email) => {
  const fetchEmail = await usersModel.getEmail(email);
  if (fetchEmail) {
    return error.emailAlreadyRegistered;
  }
  return {};
};

module.exports = { requiredFields, emptyFields, emailAlreadyRegistered };
