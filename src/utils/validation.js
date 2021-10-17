const UserModel = require('../models/users');

const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const validateEntries = (name, email, password) => {
  const errObj = { code: 400, message: 'Invalid entries. Try again.' };

  if (!name || !email || !password || !regex.test(email)) return errObj;
};

const verifyEmail = async (email) => {
  const errObj = { code: 409, message: 'Email already registered' };
  const allUsers = await UserModel.getAll();
  if (allUsers.find((user) => user.email === email)) return errObj;
};

const validateLoginFields = (email, password) => {
  const errObj = { code: 401, message: 'All fields must be filled' };
  if (!email || !password) return errObj;
};

const verifyLogin = async (email, password) => {
  const errObj = { code: 401, message: 'Incorrect username or password' };
  const user = await UserModel.getByEmail(email);

  if (!regex.test(email) || password.length < 8) return errObj;
  if (!user || user.password !== password) return errObj;
};

const validateEntriesRecipes = (name, ingredients, preparation) => {
  const errObj = { code: 400, message: 'Invalid entries. Try again.' };

  if (!name || !ingredients || !preparation) return errObj;
};

module.exports = {
  validateEntries,
  validateEntriesRecipes,
  verifyEmail,
  validateLoginFields,
  verifyLogin,
};
