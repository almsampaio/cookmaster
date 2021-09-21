const Users = require('../models/UsersModel');

const createUser = async (name, email, password) => {
  const findUser = await Users.findUserByEmail(email);
  if (findUser) return { status: 409, message: 'Email already registered' };
  const newUser = await Users.createUser(name, email, password);
  return { status: 201, data: { user: newUser } };
};

module.exports = {
  createUser,
};
