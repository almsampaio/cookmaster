const AppError = require('../helpers/appError');
const { addUser, findEmail } = require('../models/users');

const addUserService = async (data) => {
  const emailExists = await findEmail(data.email);
  if (emailExists) throw new AppError('Email already registered', 409);

  const user = await addUser(Object.assign(data, { role: 'user' }));
  return user;
};

module.exports = { addUserService };