const Joi = require('joi');

module.exports = {
  userCreation: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).messages({ 
    'any.required': 'Invalid entries. Try again.',
    'string.email': 'Invalid entries. Try again.',
  }),

  userLogin: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).messages({ 'any.required': 'All fields must be filled' }),
};
