const userModels = require('../models/user');

const validateEmail = (email) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!email.match(regex)) return false;
  return true;
};

const registerUser = async (name, email, password) => {
  const isValid = validateEmail(email);
  if (!isValid) {
    return {
      error: {
        code: 'invalid',
        message: 'Invalid entries. Try again.',
      },
    };
  }

  const result = await userModels.registerUser(name, email, password);
  return result;
};

module.exports = {
  registerUser,
};
