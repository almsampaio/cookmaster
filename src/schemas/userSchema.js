const Joi = require('joi');

const emailPattern = new RegExp('[^@]+@[^.]+.com$');

const userSchema = Joi.object({
  name: Joi.string().min(4).required(),
  password: Joi.string().min(4).required(),
  email: Joi.string().pattern(emailPattern).required(),
}).messages({
  'any.required': 'Invalid entries. Try again.',
  'string.min': 'Invalid entries. Try again.',
  'string.pattern.base': 'Invalid entries. Try again.',
});

module.exports = userSchema;
