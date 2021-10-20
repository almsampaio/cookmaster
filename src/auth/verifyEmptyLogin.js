const Joi = require('joi');
const { filledFields } = require('../utils/messages');

const verifyEmptyLogin = (email, password) => {
  const schema = Joi.object({
    email: Joi.string().not().empty().email()
      .required(),
    password: Joi.string().not().empty().required(),
  });

  const { error } = schema.validate({ email, password });

  if (error) throw filledFields;

  return { email, password };
};

module.exports = verifyEmptyLogin;
