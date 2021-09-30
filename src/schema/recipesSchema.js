const joi = require('joi');

module.exports = joi.object({
  name: joi.string().required(),
  ingredients: joi.string().required(),
  preparation: joi.string().required(),
  userId: joi.object(),
});
