const Joi = require('joi');

const validateUser = (body) => (
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).validate(body)
);

const validateLogin = (body) => (
  Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }).validate(body)
);

module.exports = {
  validateUser,
  validateLogin,
};
