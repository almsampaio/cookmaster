const Joi = require('joi');

const validateRecipes = (body) => (
  Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate(body)
);

module.exports = {
  validateRecipes,
};
