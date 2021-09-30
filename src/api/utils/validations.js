const Joi = require('joi');

function emailField(email) {
  const emailSchema = Joi.string().email().required();
  return emailSchema.validate(email);
}

function loginFields(user) {
  const userSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string()
      .email().required(),
  });

  return userSchema.validate(user);
}

function recipeFields(recipe) {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  });
  return userSchema.validate(recipe);
}

function userFields(user) {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
    email: Joi.string()
      .email().required(),
  });

  return userSchema.validate(user);
}

module.exports = {
  emailField,
  loginFields,
  recipeFields,
  userFields,
};
