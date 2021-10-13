const usersModel = require('../models/usersModel');

const nameValidation = (name) => {
  if (!name) return null;
  return true;
};

const emailValidation = (email) => {
  const emailRegex = /\S+@\S+\.\S+/; // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript - resposta 1080
  if (emailRegex.test(email) === false) return null;
  return true;
};

const existingEmail = async (email) => {
  const foundEmail = await usersModel.getByEmail(email);
  if (foundEmail) return null;
  return true;
};

const create = async (name, email, password, role) => {
  const findEmail = await existingEmail(email);
  if (!findEmail) return { message: 'Email already registered' };
  
  const validateEmail = emailValidation(email);
  if (!validateEmail) return { message: 'Invalid entries. Try again.' };
  
  if (!nameValidation(name)) return { message: 'Invalid entries. Try again.' };

  const createdUser = await usersModel.create(name, email, password, role);

  return { createdUser };
};

const getUsers = async () => {
  const users = await usersModel.getUsers();
  return users;
};

module.exports = {
  create,
  getUsers,
};
