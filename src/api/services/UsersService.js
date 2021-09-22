const jwt = require('jsonwebtoken');
const usersModel = require('../models/UsersModel');

const SECRET = 'meusupersegredo';

const createUser = async (name, email, password, role) => {
  const findEmail = await usersModel.findByEmail(email);
  const createNewUser = await usersModel.createUser(name, email, password, role);

  if (findEmail) return { status: 409, message: 'Email already registered' };

  return { status: 201, data: { user: createNewUser } };
};

const findByCredentials = async (email, password) => {
  if (!email || !password) {
    return { status: 401, message: 'All fields must be filled' };
  }

  const findEmail = await usersModel.findByEmail(email);

  if (!findEmail || findEmail.password !== password) {
    return { status: 401, message: 'Incorrect username or password' };
  }

  const { password: _, ...userPayload } = findEmail;

  const token = jwt.sign(userPayload, SECRET, {
    algorithm: 'HS256',
    expiresIn: '15d',
  });

  return ({ status: 200, token });
};

module.exports = {
  createUser,
  findByCredentials,
};