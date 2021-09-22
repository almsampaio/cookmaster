const Joi = require('joi');
const models = require('../models');
const { REQUEST_INVALID_ENTRIES, EMAIL_CONFLICT, CREATED_STATUS } = require('../helpers');

// REQUISITO 1
const validationJoi = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const createUsers = async (newUser, role = 'user') => {
  const { email } = newUser;

  const { error } = validationJoi.validate(newUser);
  if (error) return REQUEST_INVALID_ENTRIES;

  const emailExist = await models.usersModel.usersByEmail(email);
  if (emailExist) return EMAIL_CONFLICT;

  const user = newUser;
  user.role = role;

  const addNewUser = await models.usersModel.createUsers(user);
  delete addNewUser.password;

  return { status: CREATED_STATUS, addNewUser };
};

module.exports = {
  createUsers,
};
