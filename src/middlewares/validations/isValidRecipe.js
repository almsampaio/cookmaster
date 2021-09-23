const Joi = require('joi');

const isValidRecipe = (data) => {
  const response = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.required(),
    preparation: Joi.required(),
  }).validate(data);
  if (response.error) {
    return {
      status: 400,
      message: 'Invalid entries. Try again.',
    };
  }
};

module.exports = isValidRecipe; 