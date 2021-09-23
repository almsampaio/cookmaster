const Joi = require('joi');

// Ref: https://www.youtube.com/watch?v=u9kxYilQ9l8

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  userSchema,
  loginSchema,
};