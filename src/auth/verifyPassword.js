const Joi = require('joi');
const { badRequest } = require('../utils/messages');

const verifyPassword = (password) => {
  const schema = Joi.string().not().empty().required();

  const { error } = schema.validate(password);

  if (error) throw badRequest;

  return password;
};

module.exports = verifyPassword;
