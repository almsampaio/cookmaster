/* const Joi = require('joi'); */
const errorMessages = require('../utils/errorMessages');
/* const status = require('../utils/httpStatus'); */
const models = require('../models');

module.exports = async (body) => {
  const { email, password } = body;

  if (!email || !password) {
    throw errorMessages.ALL_FIELDS_MUST_BE_FILLED;
  }

  const user = await models.getByEmail(email);

  if (!user) throw errorMessages.INCORRECT_EMAIL_OR_PASSWORD;

  console.log(user);

  return 'ola';
};