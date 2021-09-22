const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const SECRET = 'Xablau';

const create = async (user) => {
  const userCreated = await userModel.create(user);
  return { status: 201, data: userCreated };
};

const login = async (user) => {
  const { _id, email, role } = await userModel.findUserEmail(user.email);
  const userPayload = { _id, email, role };
  const token = jwt.sign(userPayload, SECRET, {
    algorithm: 'HS256',
    expiresIn: '15d',
  });
  return { status: 200, token };
};

module.exports = {
  create,
  login,
};
