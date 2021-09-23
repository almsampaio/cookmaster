const usersModel = require('../models/usersModel');
// const jwt = require('jsonwebtoken');

const validateFields = (email, password, name) => {
  const regex = /^\S+@\S+$/;
  if (!email || !password || !name || !regex.test(email)) {
    return ({ status: 400, message: 'Invalid entries. Try again.' });
  }
  return undefined;
};

const createUser = async (email, senha, nome, role = 'user') => {
  const response = validateFields(email, senha, nome);
  if (response) return response;
  const account = await usersModel.findUser(email);
  console.log(account);
  if (account) return ({ status: 409, message: 'Email already registered' });

  const { password, ...user } = await usersModel.createUser(email, senha, nome, role);
  return ({ status: 201, message: user });
};

module.exports = { createUser };
