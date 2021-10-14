const Joi = require('joi');

const newUserValidation = (name, email, password) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ name, email, password });

  if (error) throw error;
};

module.exports = {
  newUserValidation,
};
