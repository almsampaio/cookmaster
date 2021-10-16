const Joi = require('joi');
const { findEmail } = require('../models/usersModel');
const { filledFields, incorrectLogin } = require('../utils/messages');

const verifyEmailLogin = async (email) => {
  const schema = Joi.string().not().empty().email()
    .required();

  const { error } = schema.validate(email);

  if (error) throw filledFields;

  const existsEmail = await findEmail(email);

  if (!existsEmail) throw incorrectLogin;

  return existsEmail;
};

module.exports = verifyEmailLogin;
