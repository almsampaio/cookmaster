const jwt = require('jsonwebtoken');
const Users = require('../models/UsersModel');

const secret = 'meusecret';

const createUser = async (name, email, password) => {
  const findUser = await Users.findUserByEmail(email);
  if (findUser) return { status: 409, message: 'Email already registered' };
  const newUser = await Users.createUser(name, email, password);
  return { status: 201, data: { user: newUser } };
};

const createAdmin = async (name, email, password, user) => {
  const newAdmin = await Users.createAdmin(name, email, password);
  if (user.role !== 'admin') return { status: 403, message: 'Only admins can register new admins' };
  return { status: 201, data: { user: newAdmin } };
};

const userLogin = async (email, password) => {
  if (!email || !password) return { status: 401, message: 'All fields must be filled' };
  const myUser = await Users.findUserByEmail(email);
  if (!myUser || myUser.password !== password) {
    return { status: 401, message: 'Incorrect username or password' };
  }
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const { _id, role } = myUser;
  const userPayload = { _id, email, role };
  const token = jwt.sign(userPayload, secret, jwtConfig);
  return { status: 200, token };
};

module.exports = {
  createUser,
  createAdmin,
  userLogin,
};
