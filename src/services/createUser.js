const Joi = require('joi');
const errorMessages = require('../utils/errorMessages');
const status = require('../utils/httpStatus');
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
    throw errorMessages.INVALID_ENTRIES;
  }

  const checkEmail = await models.getByEmail(email);
  
  if (checkEmail) throw errorMessages.EMAIL_ALREADY_EXISTS;

  const user = await models.createUser(newBody);

  return {
    status: status.CREATED_STATUS,
    user,
  };
};

module.exports = {
  createUser,
};