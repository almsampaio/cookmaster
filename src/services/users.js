const jwt = require('jsonwebtoken');
const validations = require('../schemas/validations');
const validateLogin = require('../schemas/loginValidations');
const usersModel = require('../models/users');

const SECRET = 'tryber';

const createUser = async (name, email, password) => {
  const validateEmail = await validations.validateUserEmail(email);
  const validateName = validations.validateUserName(name);
  const validatePassword = validations.validateUserPassword(password);
  if (validateEmail.code) return validateEmail;
  if (validateName.code) return validateName;
  if (validatePassword.code) return validatePassword;

  const role = 'user';
  const user = await usersModel.createUser(name, email, password, role);

  return { user: {
    name,
    email,
    role,
    _id: user.insertedId,
  },  
  };
};

const loginUser = async (email, password) => {
  const validateInputs = await validateLogin.validateLoginInputs(email, password);
  const validateCredentials = await validateLogin.validateLoginCredentials(email, password);
  if (validateInputs.errorCode) return validateInputs;
  if (validateCredentials.errorCode) return validateCredentials;

  const searchUser = await usersModel.getUserByEmail(email);
  const credentials = {
    _id: searchUser.insertedId,
    email: searchUser.email,
    role: searchUser.role,
  }; 
  const token = jwt.sign(credentials, SECRET);

  return {
    code: 200,
    tokenInfo: { token },
  };
};

module.exports = {
  createUser,
  loginUser,
};