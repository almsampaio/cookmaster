const Joi = require('joi');
const { ObjectId } = require('mongodb');

const userValidation = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginValidation = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const recipeValidation = Joi.object().keys({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const validateId = (id) => (ObjectId.isValid(id));

module.exports = {
  userValidation,
  loginValidation,
  recipeValidation,
  validateId,
};
