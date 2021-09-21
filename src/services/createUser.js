const Joi = require('joi');
const errorMessages = require('../utils/errorMessages');
const models = require('../models');

const verifyEmail = (email) => {
  const emailSchema = Joi.string().email().required();
  const { error } = Joi.validate(email, emailSchema);
  return error;
};

const createUser = async (body, role = 'user') => {
  const newBody = { ...body, role };

  const { name, email, password } = body;

  if (!name || verifyEmail(email) || !password) {
    return errorMessages.INVALID_ENTRIES;
  }

  const checkEmail = await models.getByEmail(email);
  
  if (checkEmail) return errorMessages.EMAIL_ALREADY_EXISTS;

  await models.createUser(newBody);

  return ('ok');
};

module.exports = {
  createUser,
};