const Joi = require('@hapi/joi');

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = loginUserSchema;