const usersModel = require('../models/usersModel');
const { createError, 
  emailError } = require('../utils/errors');

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

module.exports = {
  createUser,
};