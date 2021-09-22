const Joi = require('joi');
const validEmail = require('./regex');

const isValidEmail = (email) => {
  const response = Joi.string().email().required().validate(email);
  const regex = validEmail(email);
  if (response.error || !regex) {
    return {
      status: 400,
      message: 'Invalid entries. Try again.',
    };
  }
};

module.exports = { isValidEmail, validEmail };