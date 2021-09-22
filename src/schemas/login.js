const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi
    .string()
    .email()
    .not()
    .empty()
    .required(),
  password: Joi
    .string()
    .not()
    .empty()
    .required(),
}).error(() => ({ message: 'All fields must be filled' }));

module.exports = loginSchema;