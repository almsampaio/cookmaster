const UserModel = require('../Model/UsersModel');

const emailIsOnly = async (email) => {
  const response = await UserModel.searchByEmail(email);
  if (response) {
    throw new Error('Email already registered');
  }
};

const isRequiredEmailPassword = (data) => {
  const { email, password } = data;
  if (!email || !password) {
    throw new Error('All fields must be filled');
  }
};

const userValid = async (data) => {
  const { email, password } = data;
  const user = await UserModel.searchByEmail(email);
  console.log('Usuário', user);
  if (!user || user.password !== password) {
    throw new Error('Incorrect username or password');
  }
};

const userRegistration = async (data) => {
  await emailIsOnly(data.email);
  const newUser = await UserModel.registration(data);
  return newUser;
};

const login = async (data) => {
  isRequiredEmailPassword(data);
  await userValid(data);
  const user = await UserModel.searchByEmail(data.email);
  return user;
};

module.exports = {
  userRegistration,
  login,
};