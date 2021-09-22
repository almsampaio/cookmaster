const Joi = require('joi');

module.exports = {
  userCreation: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
