const Joi = require('joi');

const isValidPassword = (password) => {
  const response = Joi.required().validate(password);
  if (response.error) {
    return {
      status: 400,
      message: 'Invalid entries. Try again.',
    };
  }
};

module.exports = isValidPassword;