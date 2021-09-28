const ModelUsers = require('../models/ModelUsers');
const invalidData = require('../utils/invalidData');
const { createToken } = require('../middlewares');

const UNAUTHORIZED = 401;
const CONFLICT = 409;

const create = async ({ name, email, password }) => {
  const findEmail = await ModelUsers.getByEmail({ email });
  
  if (findEmail) throw invalidData('Email already registered', CONFLICT);

  const createdUser = await ModelUsers.create({ name, email, password });

  return createdUser;
};

const login = async ({ email, password }) => {
  const findUserByEmail = await ModelUsers.getByEmail({ email });

  if (!findUserByEmail || findUserByEmail.password !== password) {
    throw invalidData('Incorrect username or password', UNAUTHORIZED);
  }

  const { password: passBD, ...userWithoutPassword } = findUserByEmail;

  const token = await createToken(userWithoutPassword);

  return { token };
};

module.exports = {
  create,
  login,
};
