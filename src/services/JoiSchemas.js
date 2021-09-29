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

const recipe = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
  userId: Joi.string(),
});

module.exports = {
  user,
  login,
  recipe,
};
