const { conflict } = require('../helpers/http');
const { addUser, findEmail } = require('../models/users');

const addUserService = async (data) => {
  const emailExists = await findEmail(data.email);
  if (emailExists) return conflict('Email already registered');

  const user = await addUser(Object.assign(data, { role: 'user' }));
  return user;
};

module.exports = { addUserService };