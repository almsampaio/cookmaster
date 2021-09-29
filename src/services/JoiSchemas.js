const Joi = require('joi');

const user = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
  role: Joi.string(),
});

const login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  user,
  login,
};
