const jwt = require('jsonwebtoken');
const userModel = require('../Model/userModel');

const SECRET = 'C3t$x7k4!YocfE$e';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const invalidEntries = { status: 400, message: 'Invalid entries. Try again.' };
const emailExists = { status: 409, message: 'Email already registered' };
const incorrectData = { status: 401, message: 'Incorrect username or password' };
const emptyField = { status: 401, message: 'All fields must be filled' };

const createUser = async (name, email, password, role) => {
  const createdUser = await userModel.create(name, email, password, role);
  if (createdUser.statusCode === 409) return emailExists;
  return { status: 201, user: createdUser };
};

const create = (name, email, password, role) => {
  if (!name || !email || !password) return invalidEntries;
  if (!emailPattern.test(email)) return invalidEntries;
  return createUser(name, email, password, role);
};

const login = async (email, password) => {
  if (!email || !password) return emptyField;
  const signIn = await userModel.login(email, password);
  if (signIn.err) return incorrectData;

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

// Ref requisito 2 - https://github.com/tryber/sd-010-a-cookmaster/pull/25/files