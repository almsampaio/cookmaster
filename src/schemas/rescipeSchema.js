const Joi = require('joi');

const recipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
}).messages({
  'any.required': 'Invalid entries. Try again.',
});

module.exports = recipeSchema;
