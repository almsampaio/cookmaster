const Joi = require('@hapi/joi');

const schemaCreateUser = Joi.object({
  name: Joi.string()
      .min(1)
      .required(),
  email: Joi.string()
      .min(1)
      .email()
      .required(),
  password: Joi.string()
      .min(8)
      .required(),
});

const schemaLoginUser = Joi.object({
  email: Joi.string()
      .required(),
  password: Joi.string()
      .required(),
});

const schemaCreateRecipe = Joi.object({
  name: Joi.string()
      .min(1)
      .required(),
  ingredients: Joi.string()
      .min(1)
      .required(),
  preparation: Joi.string()
      .min(1)
      .required(),
});

module.exports = {
  schemaCreateUser,
  schemaLoginUser,
  schemaCreateRecipe,
};
