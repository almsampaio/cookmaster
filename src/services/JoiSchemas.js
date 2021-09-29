const Joi = require('joi');

const user = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
  role: Joi.string(),
});

module.exports = {
  user,
};
