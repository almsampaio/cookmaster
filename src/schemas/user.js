const Joi = require('joi');

module.exports = Joi.object().keys({
  name: Joi.string()
    .not().empty()
    .required(),
  email: Joi.string()
    .not().empty()
    .email()
    .required(),
  password: Joi.string()
    .not().empty()
    .required(),
});
