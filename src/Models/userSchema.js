const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().not().empty().required(),
  email: Joi.string().email().not().empty()
.required(),
  password: Joi.string().not().empty().required(),
  role: Joi.string(),
});