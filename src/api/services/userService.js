const jwt = require('jsonwebtoken');
const usersModel = require('../models/userModel');

const STATUS_CONFLICT = 409;
const STATUS_CREATED = 201;
const STATUS_OK = 200;
const STATUS_UNAUTHORIZED = 401;

const EMAIL_ALREADY_REGISTERED = 'Email already registered';
const FIELDS_MUST_BE_FILLED = 'All fields must be filled';
const INCORRECT_EMAIL_PASSWORD = 'Incorrect username or password';
const KEY = 'privateKey';

const createUser = async (name, email, password, role) => {
  const findEmail = await usersModel.findByEmail(email);
  const createNewUser = await usersModel.createUser(name, email, password, role);

  if (findEmail) return { status: STATUS_CONFLICT, message: EMAIL_ALREADY_REGISTERED };
  return { status: STATUS_CREATED, data: { user: createNewUser } };
};

const findByPersonalData = async (email, password) => {
  if (!email || !password) {
    return { status: STATUS_UNAUTHORIZED, message: FIELDS_MUST_BE_FILLED };
  }

  const findEmail = await usersModel.findByEmail(email);

  if (!findEmail || findEmail.password !== password) {
    return { status: STATUS_UNAUTHORIZED, message: INCORRECT_EMAIL_PASSWORD };
  }

  const { password: _, ...userPayload } = findEmail;

  const token = jwt.sign(userPayload, KEY, {
    algorithm: 'HS256',
    expiresIn: '15d',
  });

  return ({ status: STATUS_OK, token });
};

module.exports = {
  createUser,
  findByPersonalData,
};
