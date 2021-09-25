const { StatusCodes } = require('http-status-codes');
const Users = require('../models/Users');

const create = async (name, email, password) => {
  const checkEmail = await Users.getByEmail(email);

  if (checkEmail) {
    return { status: StatusCodes.CONFLICT, message: 'Email already registered' };
  }

  const newUser = await Users.create(name, email, password);
  return { status: StatusCodes.CREATED, data: newUser };
};

module.exports = {
  create,
};