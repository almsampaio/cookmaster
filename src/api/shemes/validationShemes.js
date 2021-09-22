const usersModel = require('../models/usersModel');

const errorMensages = {
  invalidEntries: 'Invalid entries. Try again.',
  emailRegistered: 'Email already registered',
};

const invalidEntriesJson = { code: 400, message: errorMensages.invalidEntries };

const requiredFields = (name, email, password) => {
  const regexEmail = /\S+@\S+\.\S+/;
  if (!name || !email || !password || !email.match(regexEmail)) {
    return invalidEntriesJson;
  }
  return {};
};

const emptyFields = (name, email, password) => {
  if (name === '' || email === '' || password === '') {
    return invalidEntriesJson;
  }
  return {};
};

const emailAlreadyRegistered = async (email) => {
  const fetchEmail = await usersModel.getEmail(email);
  if (fetchEmail) {
    return { code: 409, message: errorMensages.emailRegistered };
  }
  return {};
};

module.exports = { requiredFields, emptyFields, emailAlreadyRegistered };
