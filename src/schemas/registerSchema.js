const Joi = require('joi');

const emailPattern = new RegExp('[^@]+@[^.]+.com$');

const userSchema = Joi.object({
  password: Joi.string().min(4).required(),
  email: Joi.string().pattern(emailPattern).required(),
}).messages({
  'any.required': 'All fields must be filled',
  'string.min': 'Incorrect username or password',
  'string.pattern.base': 'Incorrect username or password',
});

module.exports = userSchema;
