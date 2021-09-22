const Joi = require('joi');

const MIN_LENGTH_NAME = 3;

const userSchema = Joi.object({
  name: Joi
    .string()
    .not()
    .empty()
    .min(MIN_LENGTH_NAME)
    .required(),
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
  role: Joi
    .valid('user'),
}).error(() => ({ message: 'Invalid entries. Try again.' }));

module.exports = userSchema;