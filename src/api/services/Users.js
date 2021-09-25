const jwt = require('jsonwebtoken');
const UsersModel = require('../models/Users');
const { userValidator, userLoginValidator } = require('../middlewares/UserValidator');

const secret = 'tokensecret';

const createNewUser = async (name, email, password) => {
  const checkUser = await userValidator(name, email, password);
  const checkEmailExists = await UsersModel.findUserByEmail(email);

  if (checkUser !== true) return checkUser;

  if (checkEmailExists) {
    return {
      error: true,
      message: 'Email already registered',
      status: 409,
    };
  }

  const newUser = await UsersModel.createNewUser(name, email, password);
  const { _id, role } = newUser.ops[0];
  return { name, email, role, _id };
};

const userLogin = async (email, password) => {
  const checkUser = await UsersModel.findUserByEmail(email);
  const checkLogin = await userLoginValidator(email, password);

  if (checkLogin !== true) return checkLogin;

  if (!checkUser || checkUser.password !== password) {
    return {
      error: true,
      message: 'Incorrect username or password',
      status: 401,
    };
  }
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: checkUser }, secret, jwtConfig);

  return { checkUser, token };
};

module.exports = {
  createNewUser,
  userLogin,
};