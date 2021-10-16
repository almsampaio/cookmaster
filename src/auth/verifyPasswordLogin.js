const Joi = require('joi');
const { filledFields, incorrectLogin } = require('../utils/messages');

const verifyPasswordLogin = (obj, password) => {
  const schema = Joi.string().not().empty().required();

  const { error } = schema.validate(password);

  if (error) throw filledFields;

  if (obj.password !== password) throw incorrectLogin;
};

module.exports = verifyPasswordLogin;
