const Joi = require('joi');

const postLoginValidate = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
});

module.exports = {
  postLoginValidate,
}
