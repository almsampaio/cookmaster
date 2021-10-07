const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const secret = 'senhaSecretaDoProjeto';
const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '15m',
};

const checkEmail = async (email) => {
  if (!email) return { status: 400, message: { message: 'Invalid entries. Try again.' } };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(email)) return { status: 400, message: { message: 'Invalid entries. Try again.' } };
  if (await usersModel.getByEmail(email)) {
      return { status: 409, message: { message: 'Email already registered' } };
  }
  return false;
};

const checkData = (data) => {
  if (!data) return true;
  return false;
};

const create = async (name, email, password) => {
  const returnObject = { status: 400, message: { message: 'Invalid entries. Try again.' } };
  if (checkData(name) || checkData(password) || checkData(email)) return returnObject;
  const emailCheck = await checkEmail(email);
  if (emailCheck) return emailCheck;
  const message = await usersModel.create(name, email, password);
  return { status: 201, message };
};

const createAdmin = async (name, email, password) => {
  const returnObject = { status: 400, message: { message: 'Invalid entries. Try again.' } };
  if (checkData(name) || checkData(password) || checkData(email)) return returnObject;
  const emailCheck = await checkEmail(email);
  if (emailCheck) return emailCheck;
  const message = await usersModel.createAdmin(name, email, password);
  return { status: 201, message };
};

const login = async (email, pwd) => {
  const returnObject = { status: 401, message: { message: 'All fields must be filled' } };
  if (checkData(pwd)) return returnObject;
  if ((checkData(email))) return returnObject;
  const user = await usersModel.login(email, pwd);
  if ((!user)) {
    return { status: 401, message: { message: 'Incorrect username or password' } };
  }
  const { password, name, ...userWithoutPasswordAndName } = user;
  const token = jwt.sign({ data: userWithoutPasswordAndName }, secret, jwtConfig);
  return { status: 200, message: { token } };
};

module.exports = {
  create,
  login,
  createAdmin,
};
