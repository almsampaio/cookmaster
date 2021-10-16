const Joi = require('joi');
const { badRequest } = require('../utils/messages');

const verifyName = (name) => {
  const schema = Joi.string().not().empty().required();

  const { error } = schema.validate(name);

  if (error) throw badRequest;

  return name;
};

module.exports = verifyName;
