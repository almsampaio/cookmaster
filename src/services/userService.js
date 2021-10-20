const jwt = require('jsonwebtoken');
const model = require('../models/userModel');

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};
const secret = 'supersegredosecreto';

const checkInfo = (name, password, email) => {
  const regex = /\S+@\S+\.\S+/;

  if (!name || !password || !regex.test(email) || !email) {
    return ({ err: true, status: 400, message: 'Invalid entries. Try again.' });
  }
};

const createUser = async ({ name, password, email, role }) => {
  const infoCheck = checkInfo(name, password, email);

  if (infoCheck) return infoCheck;

  const existingEmail = await model.existingEmail(email);

  if (existingEmail) {
    return ({ err: true, status: 409, message: 'Email already registered' });
  }

  let createRole = 'admin';

  if (!role) {
    createRole = 'user';
  }

  const newUser = await model.createUser(name, password, email, createRole);

  return newUser;
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    return ({ err: true, status: 401, message: 'All fields must be filled' });
  }

  const loginCheck = await model.checkLogin(email, password);

  if (!loginCheck) {
    return ({ err: true, status: 401, message: 'Incorrect username or password' });
  }

  const token = jwt.sign(loginCheck, secret, jwtConfig);

  return token;
};

const createAdmin = async ({ name, password, email }, { role }) => {
  if (role !== 'admin') {
    return ({ err: true, status: 403, message: 'Only admins can register new admins' });
  }

  const newAdmin = await model.createUser(name, password, email, role);

  return newAdmin;
};

module.exports = {
  createUser,
  login,
  createAdmin,
};
