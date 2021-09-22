const usersModel = require('../models/usersModel');
const { createError, 
  emailError,
  loginError,
  credentialsError } = require('../utils/errors');
const { createToken } = require('../auth/tokenCreation');

const validate = (name, email, password) => {
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  if (!name || !email || !password || emailPattern.test(email) === false) return true;
  return false;
};

const createUser = async (name, email, password) => {
  if (validate(name, email, password)) return createError;
  
  const findByEmail = await usersModel.findByEmail(email);
  if (findByEmail) return emailError;

  const user = await usersModel.createUser(name, email, password);
  return user;
};

const loginUser = async (email, password) => {
  if (!email || !password) return loginError;

  const findByEmail = await usersModel.findByEmail(email);
  if (!findByEmail || password !== findByEmail.password) return credentialsError;

  const token = createToken(findByEmail);
  return token;
};

const addAdmin = async (name, email, password) => {
  const user = await usersModel.addAdmin(name, email, password);
  return user;
};

module.exports = {
  createUser,
  loginUser,
  addAdmin,
};