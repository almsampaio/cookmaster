const usersModels = require('../../models/usersModels');

const errorValidateRequire = {
  status: 400,
    error: {
      message: 'Invalid entries. Try again.',
    },
};

const errorValidEmailExist = {
  status: 409,
    error: {
      message: 'Email already registered',
    },
};

const validateRequire = (name, email, password) => {
  if (!name || name === undefined || !email || !password) throw errorValidateRequire;
};

const validateEmail = (email) => {
  const regexEmail = /\S+@\S+\.\S+/;
  if (!regexEmail.test(email)) throw errorValidateRequire;
};

const validateEmailExist = async (email) => {
  const result = await usersModels.getUsersByEmail(email);
  if (result) throw errorValidEmailExist;
};

module.exports = {
  validateRequire,
  validateEmail,
  validateEmailExist,
};
