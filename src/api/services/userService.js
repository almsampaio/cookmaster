const usersModel = require('../models/userModel');

const STATUS_CONFLICT = 409;
const STATUS_CREATED = 201;

const EMAIL_ALREADY_REGISTERED = 'Email already registered';

const createUser = async (name, email, password, role) => {
  const findEmail = await usersModel.findByEmail(email);
  const createNewUser = await usersModel.createUser(name, email, password, role);

  if (findEmail) return { status: STATUS_CONFLICT, message: EMAIL_ALREADY_REGISTERED };
  return { status: STATUS_CREATED, data: { user: createNewUser } };
};

module.exports = {
  createUser,
};
