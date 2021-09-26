const userModel = require('../model/userModel');

const addUser = async (name, email, password) => {
  const user = await userModel.findByEmail(email);

  if (!name || !password) return { status: 400, message: 'Invalid entries. Try again.' };
  if (user) return { status: 409, message: 'Email already registered' };

  const { password: _, ...addedUser } = await userModel.addUser(name, email, password);

  return addedUser;
};

const findAll = async () => {
  const users = await userModel.findAll();

  return users;
};

module.exports = {
  addUser,
  findAll,
};