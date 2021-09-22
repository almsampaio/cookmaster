const Joi = require('joi');

const RecipeCreateValidate = (recipe) => Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
}).validate(recipe);

module.exports = {
  RecipeCreateValidate,
};