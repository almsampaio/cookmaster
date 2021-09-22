const UserModel = require('../Model/UsersModel');

const emailIsOnly = async (email) => {
  const response = await UserModel.searchByEmail(email);
  if (response) {
    throw new Error('Email already registered');
  }
};

const userRegistration = async (data) => {
  await emailIsOnly(data.email);
  const newUser = await UserModel.registration(data);
  console.log(newUser);
  return newUser;
};

module.exports = {
  userRegistration,
};