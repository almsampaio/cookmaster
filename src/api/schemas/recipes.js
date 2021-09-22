const Joi = require('joi');

module.exports = {
  recipeCreation: Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).messages({ 
    'any.required': 'Invalid entries. Try again.',
  }),
};
