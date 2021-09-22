const Joi = require('joi');

const recipeSchema = Joi.object({
  name: Joi
    .string()
    .not()
    .empty()
    .required(),
  ingredients: Joi
    .string()
    .not()
    .empty()
    .required(),
  preparation: Joi
    .string()
    .not()
    .empty()
    .required(),
}).error(() => ({ message: 'Invalid entries. Try again.' }));

module.exports = recipeSchema;