const Joi = require('joi');
const invalidData = require('../utils/invalidData');

const BAD_REQUEST = 400;

const validRecipe = (req, _res, next) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required()
    .messages({
      'any.required': 'Invalid entries. Try again.',
    }),
    preparation: Joi.string().not().empty().required()
    .messages({
      'string.pattern.base': 'Invalid entries. Try again.',
      'any.required': 'Invalid entries. Try again.',
    }),
    ingredients: Joi.string().not().empty().required()
    .messages({
      'any.required': 'Invalid entries. Try again.',
    }),
  }).validate(req.body);

  if (error) return next(invalidData(error.message, BAD_REQUEST));

  next();
};

module.exports = validRecipe;
