const Joi = require('joi');

function loginFields(user) {
  const userSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
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
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  });

  return userSchema.validate(user);
}

module.exports = {
  loginFields,
  recipeFields,
  userFields,
};
