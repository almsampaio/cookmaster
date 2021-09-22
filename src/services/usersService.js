const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const SECRET = 'C3t$x7k4!YocfE$e';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const errInvalidEntries = { status: 400, message: 'Invalid entries. Try again.' };
const errEmailExists = { status: 409, message: 'Email already registered' };
const errIncorrectData = { status: 401, message: 'Incorrect username or password' };
const errEmptyField = { status: 401, message: 'All fields must be filled' };

const createUser = async (name, email, password, role) => {
  const createdUser = await usersModel.create(name, email, password, role);
  if (createdUser.err) return errEmailExists;
  return { status: 201, user: createdUser };
};

const create = (name, email, password, role) => {
  if (!name || !email || !password) return errInvalidEntries;
  if (!emailPattern.test(email)) return errInvalidEntries;
  return createUser(name, email, password, role);
};

const login = async (email, password) => {
  if (!email || !password) return errEmptyField;
  const signIn = await usersModel.login(email, password);
  if (signIn.err) return errIncorrectData;

  const { password: _, ...userPayload } = signIn;

  const token = jwt.sign(userPayload, SECRET, {
    algorithm: 'HS256',
    expiresIn: '10d',
  });

  return ({ status: 200, token });
};

module.exports = {
  create,
  login,
};
