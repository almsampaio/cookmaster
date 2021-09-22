const Joi = require('joi');

const isValidName = (name) => {
  const response = Joi.string().required().validate(name);
  if (response.error) {
    return {
      status: 400,
      message: 'Invalid entries. Try again.',
    };
  }
};

module.exports = isValidName;