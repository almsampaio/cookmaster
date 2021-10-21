const Joi = require('joi');
const { badRequest } = require('../utils/messages');

const verifyRecipe = (name, ingredients, preparation) => {
  const schema = Joi.object({
    name: Joi.string().not().empty().required(),
    ingredients: Joi.string().not().empty().required(),
    preparation: Joi.string().not().empty().required(),
  });

  const { error } = schema.validate({ name, ingredients, preparation });

  if (error) throw badRequest;

  return { name, ingredients, preparation };
};

module.exports = verifyRecipe;
