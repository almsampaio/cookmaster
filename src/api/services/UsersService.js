const usersModel = require('../models/UsersModel');

const createUser = async (name, email, password, role) => {
  const findEmail = await usersModel.findByEmail(email);
  const createNewUser = await usersModel.createUser(name, email, password, role);

  if (findEmail) return { status: 409, message: 'Email already registered' };

  return { status: 201, data: { user: createNewUser } };
};

module.exports = {
  createUser,
};