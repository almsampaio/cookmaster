const usersModel = require('../models/usersModel');
const { createToken } = require('../auth/createToken');
const {
  requiredFields,
  emptyFields,
  emailAlreadyRegistered } = require('../shemes/validationShemes');

const getAll = async () => {
  const users = await usersModel.getAll();

  return users;
};

const create = async (name, email, password, role) => {
  const validateEmailAlreadyRegistered = await emailAlreadyRegistered(email);
  if (validateEmailAlreadyRegistered.message) {
    const { code, message } = validateEmailAlreadyRegistered;
    return { code, message };
  }

  const validationArray = [
    requiredFields(name, email, password),
    emptyFields(name, email, password),
  ];
  const validation = validationArray.some((validate) => validate.message);
  
  if (validation) {
    const { code, message } = validationArray[0];
    return { code, message };
  }

  const user = await usersModel.create(name, email, password, role);
  return { user };
};

const loginUser = async (email, password) => {
  if (!email || !password) { 
  return { code: 401, message: 'All fields must be filled' };
  }

  const user = await usersModel.getEmail(email);
  if (!user || user.password !== password) {
    return { code: 401, message: 'Incorrect username or password' };
  }

  const token = createToken(user);
  console.log(token);
  return { token };
};

module.exports = { getAll, create, loginUser };
