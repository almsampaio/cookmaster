const Joi = require('joi');

module.exports = Joi.object().keys({
  name: Joi.string()
    .not().empty()
    .required(),
  ingredients: Joi.string()
    .not().empty()
    .required(),
  preparation: Joi.string()
    .not().empty()
    .required(),
});
