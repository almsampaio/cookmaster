const userModel = require('../models/user');
const { getToken } = require('./token');

const MSG_ERROR = 'Invalid entries. Try again.';
const MSG_LOGIN_ERROR = 'All fields must be filled';

const checkLoginUser = (email, password) => {
  const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  if (!email || validEmail.test(email) === false) {
   return { message: MSG_LOGIN_ERROR, error: 401 };
  }
  if (!password) {
   return { message: MSG_LOGIN_ERROR, error: 401 };
  }
 
  return false;
};

const checkUser = (email, password, name) => {
  const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!name) {
   return { message: MSG_ERROR, error: 400 };
  }
  if (!email || validEmail.test(email) === false) {
   return { message: MSG_ERROR, error: 400 };
  }
  if (!password) {
   return { message: MSG_ERROR, error: 400 };
  }
 
  return false;
};

const addUser = async (user) => {
  const { email, password, name } = user;
  const check = checkUser(email, password, name);
  if (check) return check;
  const newUser = { ...user, role: 'user' };
  const insertedUser = await userModel.create(newUser);

  if (insertedUser === false) {
    return { message: 'Email already registered', error: 409 };
}
  return insertedUser;
};

const login = async (email, password) => {
  const checkLogin = checkLoginUser(email, password);
  if (checkLogin) return checkLogin;

  const userLogin = await userModel.login(email);
  if (userLogin === false || userLogin.password !== password) {
    return { message: 'Incorrect username or password', error: 401 };
  }

  const { _id, role } = userLogin;

  const payload = {
    _id,
    email,
    role,
  };

  const token = getToken(payload);
  return token;
};

module.exports = {
  addUser,
  login,
};
