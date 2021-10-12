const { addUser, findEmail } = require('../models/users');

const addUserService = async (data) => {
  const emailExists = await findEmail(data.email);
  if (emailExists) throw new Error('Email already registered');

  const user = await addUser(Object.assign(data, { role: 'user' }));
  return user;
};

module.exports = { addUserService };