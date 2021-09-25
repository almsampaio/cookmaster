const Joi = require('joi');

const postLoginValidate = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
});

const recipeValidate = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

module.exports = {
  postLoginValidate,
  recipeValidate
};
