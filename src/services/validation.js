const UserModel = require('../models/users');

const validateEntries = (name, email, password) => {
  const errObj = { code: 400, message: 'Invalid entries. Try again.' };
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!name || !email || !password || !regex.test(email)) return errObj;
};

const verifyEmail = async (email) => {
  const errObj = { code: 409, message: 'Email already registered' };
  const allUsers = await UserModel.getAll();
  if (allUsers.find((user) => user.email === email)) return errObj;
};

module.exports = {
  validateEntries,
  verifyEmail,
};
