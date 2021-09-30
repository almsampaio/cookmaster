const Joi = require('joi');
const { BAD_REQUEST } = require('../utils/statusCodes');

const userSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const validateRecipe = (req, _res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { error } = userSchema.validate({ name, ingredients, preparation });
  if (error) {
    return next({
      status: BAD_REQUEST,
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

module.exports = validateRecipe;